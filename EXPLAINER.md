# EXPLAINER.md — Playto Payout Engine

> This document explains every critical design decision in the payout engine. Each section includes the actual code, the database primitive it relies on, and the reasoning behind the choice. Written for engineers who need to understand what happens when money moves.

---

## Architecture overview

```
┌──────────────────┐                                   ┌─────────────────────┐
│                  │      POST /api/v1/payouts/        │                     │
│   React UI       │ ─────────────────────────────▶   │   Django + DRF      │
│   (3s polling)   │ ◀─────────────────────────────   │   (views.py)        │
│                  │      JSON responses               │         │           │
└──────────────────┘                                   │         ▼           │
                                                       │   services.py       │
                                                       │   (ALL business     │
                                                       │    logic lives      │
                                                       │    here)            │
                                                       │         │           │
                                                       │    SELECT FOR       │
                                                       │    UPDATE +         │
                                                       │    transaction      │
                                                       │    .atomic()        │
                                                       └────────┬────────────┘
                                                                │
┌──────────────────┐    on_commit dispatch             ┌────────▼────────────┐
│                  │ ◀─────────────────────────────    │                     │
│   Celery Worker  │                                   │   PostgreSQL 16     │
│   (4 threads)    │                                   │                     │
│                  │ ──── settle / fail ────────────▶  │   Tables:           │
│   Celery Beat    │    (SELECT FOR UPDATE)            │   - merchants       │
│   (every 10s)    │                                   │   - ledger_entries  │
└──────┬───────────┘                                   │   - payouts         │
       │                                               │   - idempotency_keys│
       ▼                                               └─────────────────────┘
  Simulated bank
  settlement
  (70% success, 20% fail, 10% hang)
```

### Why this shape

**The API layer (`views.py`) is intentionally thin.** It validates input (is the JSON correct? is the UUID valid? is the idempotency key present?) and then hands off to `services.py`. The view never touches balances, never creates ledger entries, never transitions payout states. This means there's exactly one file to audit for money-moving correctness.

**`services.py` owns every balance mutation.** There is one function that debits a merchant (`create_payout`), one that credits back on failure (`settle_payout` / `fail_payout_max_retries`), and one that computes balance (`_compute_balance`). Every path through the system that changes money goes through one of these three functions, always inside a `transaction.atomic()` block with `SELECT FOR UPDATE` locking.

**Celery is a real async worker.** The `process_payout` task runs in a separate process, not in the Django request cycle. This matters because bank settlement (even simulated) takes 1-3 seconds. If this ran synchronously, the API would block. The `on_commit` hook ensures the Celery task is only dispatched after the payout row is committed to the database — if the transaction rolls back, no task is sent, and there's no orphaned task trying to process a payout that doesn't exist.

**Celery Beat is the safety net.** Every 10 seconds, `check_stuck_payouts` scans for payouts stuck in PROCESSING. This catches cases where the Celery worker crashed, the message was lost, or the simulated bank API "hung." It's a sweep pattern — independent of any individual task's retry mechanism.

---

## 1. The Ledger

### The balance calculation query

Balance is never stored as a column. It's always computed from the ledger at query time. Here's the exact code from `services.py`:

```python
def _compute_balance(merchant_id):
    """
    Returns the available balance in paise using a single SQL SUM/CASE.
    No Python math involved.
    """
    result = LedgerEntry.objects.filter(merchant_id=merchant_id).aggregate(
        balance=Coalesce(
            Sum(
                Case(
                    When(
                        entry_type=LedgerEntry.EntryType.CREDIT,
                        then=F("amount_paise"),
                    ),
                    When(
                        entry_type=LedgerEntry.EntryType.DEBIT,
                        then=-F("amount_paise"),
                    ),
                    output_field=BigIntegerField(),
                )
            ),
            Value(0),
            output_field=BigIntegerField(),
        )
    )
    return result["balance"]
```

The Django ORM compiles this to a single SQL statement:

```sql
SELECT COALESCE(
    SUM(
        CASE
            WHEN entry_type = 'CREDIT' THEN amount_paise
            WHEN entry_type = 'DEBIT'  THEN -amount_paise
        END
    ),
    0
) AS balance
FROM ledger_entries
WHERE merchant_id = %s;
```

### Why I modeled credits and debits this way

**The `ledger_entries` table is the single source of truth.** Every money movement — whether a customer payment arriving (CREDIT) or a payout being requested (DEBIT) or a failed payout returning funds (CREDIT) — is an immutable row in this table. The balance at any point in time is always:

```
balance = SUM(all CREDIT amounts) - SUM(all DEBIT amounts)
```

I chose this append-only ledger design for five specific reasons:

**1. No stale balance column.** Many payment systems store a `balance` field on the merchant and update it with every transaction. This creates two problems: (a) if the update fails halfway, the balance is wrong; (b) you need to reconcile the stored balance against the ledger entries periodically. With a derived balance, there's nothing to desync. The balance is always correct because it's computed from the entries that define it.

**2. Database-level arithmetic, not Python.** The `SUM(CASE(...))` runs inside PostgreSQL. The result is computed by the database engine against the exact rows that exist at that moment in the transaction. There's no intermediate Python list of amounts that could be stale, truncated, or accidentally cast to `float`. This is critical because the balance check happens inside a locked transaction — the number the database returns is the number the database will enforce.

**3. Crash recovery is free.** If the server crashes between creating a payout and completing it, the ledger still contains the DEBIT entry from when the payout was created. The balance is already reduced. When the system comes back up, the periodic `check_stuck_payouts` task finds the stuck payout and either retries or fails it (returning funds with a new CREDIT entry). At no point is the balance in an inconsistent state.

**4. Full audit trail.** Every `LedgerEntry` has a timestamp, type, amount, description, and optional link to the payout it relates to. If a merchant disputes a balance, you can reconstruct exactly what happened: which credits came in, which debits went out, which failed payouts returned funds. This is `SUM(CREDIT) - SUM(DEBIT)` = displayed balance, verified with one query.

**5. BigIntegerField in paise — no floats, no decimals.**
- `FloatField` is ruled out because IEEE 754 floating-point cannot represent `0.1` exactly. In Python, `0.1 + 0.2 == 0.30000000000000004`. In a ledger with thousands of entries, rounding errors compound into balances that don't reconcile. This isn't theoretical — it's the #1 cause of accounting bugs in early fintech code.
- `DecimalField` is mathematically safe, but paise-as-integer is simpler. There's no `max_digits` or `decimal_places` to configure, no risk of someone passing `Decimal('1000.005')` and silently truncating the half-paise. An integer is an integer.
- The entire backend never sees a decimal point. The frontend converts rupees to paise before sending (`rupees * 100`, integer arithmetic) and converts back for display. The API accepts and returns integers only.

### The held balance query

The dashboard also shows how much money is currently locked in in-flight payouts:

```python
held = Payout.objects.filter(
    merchant_id=merchant_id,
    status__in=[Payout.Status.PENDING, Payout.Status.PROCESSING],
).aggregate(
    total=Coalesce(
        Sum("amount_paise"),
        Value(0),
        output_field=BigIntegerField(),
    )
)["total"]
```

This is also a single SQL aggregate. The `available_balance` already accounts for holds (the DEBIT was created when the payout was requested), so the held amount is informational — it tells the merchant "₹X of your balance is currently being sent to your bank."

---

## 2. The Lock

### The exact code that prevents concurrent overdrawing

From `services.py`, the `create_payout` function:

```python
def create_payout(merchant_id, amount_paise, bank_account_id, idempotency_key):
    if amount_paise <= 0:
        return 400, {"error": "amount_paise must be a positive integer"}

    with transaction.atomic():
        # ---- STEP 1: Lock the merchant row ----
        # This is the critical line. SELECT FOR UPDATE acquires a row-level
        # exclusive lock on this specific merchant. Any other transaction
        # trying to lock the same merchant will BLOCK here until we commit.
        merchant = Merchant.objects.select_for_update().get(id=merchant_id)

        # ---- STEP 2: Idempotency check (inside the lock) ----
        cutoff = timezone.now() - timedelta(hours=24)
        existing = IdempotencyKey.objects.filter(
            key=idempotency_key,
            merchant=merchant,
            created_at__gte=cutoff,
        ).first()
        if existing:
            return existing.response_status, existing.response_body

        # ---- STEP 3: Compute balance at the database level ----
        balance = _compute_balance(merchant.id)

        # ---- STEP 4: Reject if insufficient funds ----
        if balance < amount_paise:
            return 422, {
                "error": "Insufficient funds",
                "available_balance_paise": balance,
                "requested_paise": amount_paise,
            }

        # ---- STEP 5: Create the payout and debit the ledger ----
        payout = Payout.objects.create(
            merchant=merchant,
            amount_paise=amount_paise,
            bank_account_id=bank_account_id,
            status=Payout.Status.PENDING,
        )
        LedgerEntry.objects.create(
            merchant=merchant,
            entry_type=LedgerEntry.EntryType.DEBIT,
            amount_paise=amount_paise,
            payout=payout,
            description=f"Payout hold #{str(payout.id)[:8]}",
        )

        # ---- STEP 6: Cache the response for idempotency ----
        response = {
            "id": str(payout.id),
            "merchant_id": str(merchant.id),
            "amount_paise": payout.amount_paise,
            "bank_account_id": payout.bank_account_id,
            "status": payout.status,
            "created_at": payout.created_at.isoformat(),
        }
        IdempotencyKey.objects.create(
            key=idempotency_key,
            merchant=merchant,
            response_status=201,
            response_body=response,
        )

        # ---- STEP 7: Dispatch Celery task ONLY after commit ----
        from .tasks import process_payout
        transaction.on_commit(
            lambda pid=str(payout.id): process_payout.delay(pid)
        )

    return 201, response
```

### The database primitive it relies on: SELECT FOR UPDATE

`Merchant.objects.select_for_update().get(id=merchant_id)` translates to:

```sql
SELECT * FROM merchants WHERE id = %s FOR UPDATE;
```

This is PostgreSQL's **row-level exclusive lock**. It works like this:

1. The `FOR UPDATE` clause tells PostgreSQL: "I'm going to modify data that depends on this row. Don't let anyone else read it with `FOR UPDATE` until I commit or rollback."
2. The lock is held for the duration of the transaction (`transaction.atomic()` block).
3. Any other transaction that tries to `SELECT ... FOR UPDATE` on the **same row** will **block** — it literally waits until the first transaction finishes.
4. When the first transaction commits or rolls back, PostgreSQL releases the lock, and the blocked transaction proceeds.

### Walk-through: the two-60-rupee race

> A merchant has ₹100 balance (10000 paise). Two API requests arrive at the same time, each requesting ₹60 (6000 paise).

**Without locking (the bug):**
1. Request A reads balance: 10000p ✓
2. Request B reads balance: 10000p ✓ (hasn't changed yet)
3. Request A creates debit of 6000p
4. Request B creates debit of 6000p
5. Balance is now 10000 - 6000 - 6000 = **-2000p** ← money created from nothing

**With SELECT FOR UPDATE (what actually happens):**
1. Request A enters `transaction.atomic()`, executes `SELECT ... FOR UPDATE` on merchant row → **lock acquired**
2. Request B enters its own `transaction.atomic()`, executes `SELECT ... FOR UPDATE` on the same merchant row → **blocks, waiting for A's lock**
3. Request A computes `_compute_balance()` → 10000p. 10000 >= 6000, so it creates the payout + DEBIT entry. Commits. **Lock released.**
4. Request B **unblocks**. Computes `_compute_balance()` → 4000p (A's debit is now committed). 4000 < 6000 → **returns 422 Insufficient Funds**. No debit created.

Result: exactly one payout, balance is 4000p. The invariant is preserved.

### Why lock the merchant row, not the ledger entries?

Locking ledger entries doesn't prevent new inserts. Even if you lock every existing `LedgerEntry` row for a merchant, another transaction can insert a new DEBIT row without touching the locked rows. The lock wouldn't prevent the race.

The merchant row serves as a **serialization point** — a single resource that all balance-mutating operations must claim. By locking it, you create a total ordering: operations for the same merchant happen one at a time. Operations for different merchants are unaffected — they lock different rows and proceed in parallel.

### Why not Redis or application-level locks?

Redis locks (`SETNX` with TTL) and Python threading locks have several problems for money-moving code:

1. **They don't participate in the database transaction.** If you acquire a Redis lock, compute the balance, then the database transaction fails and rolls back, you still held the lock — but nothing happened. Worse, if the process crashes while holding the Redis lock, the lock stays until the TTL expires, during which no payouts can be processed for that merchant.

2. **They create distributed coordination problems.** With multiple Django processes or Celery workers, you need a distributed lock. Redis SETNX works, but now you have two systems to reason about — the database transaction AND the Redis lock. They can disagree.

3. **PostgreSQL handles crashes automatically.** If the Django process crashes mid-transaction, PostgreSQL detects the broken connection, rolls back the transaction, and releases the `FOR UPDATE` lock. No cleanup needed. No orphaned locks. No TTL to tune.

`SELECT FOR UPDATE` gives you locking **inside** the transaction. The lock, the balance check, and the debit all happen atomically. If any part fails, everything rolls back together.

---

## 3. The Idempotency

### The problem this solves

In real networks, things go wrong:
- A client's HTTP connection drops after sending the request but before receiving the response. The client retries.
- A load balancer times out and retries the request.
- A mobile app's "submit" button gets double-tapped.

Without idempotency, each retry creates a new payout. The merchant gets debited multiple times for what they intended as one withdrawal.

### How the system knows it has seen a key before

The client includes an `Idempotency-Key` header with every `POST /api/v1/payouts/` request. This is a UUID that the client generates — it represents "this specific payout intention."

The server stores a mapping of `(idempotency_key, merchant_id) → (response_status, response_body)` in the `idempotency_keys` table, with a `UNIQUE` constraint on `(key, merchant)`.

When a request arrives, **inside the same `SELECT FOR UPDATE` transaction**, the server checks:

```python
# Step 2 of create_payout():
cutoff = timezone.now() - timedelta(hours=24)
existing = IdempotencyKey.objects.filter(
    key=idempotency_key,
    merchant=merchant,
    created_at__gte=cutoff,  # 24-hour TTL
).first()

if existing:
    # Return the exact same HTTP status and body as the first request
    return existing.response_status, existing.response_body
```

If the key exists and was created within the last 24 hours, the server returns the **cached response** — same HTTP status code, same JSON body, same payout ID. No new payout is created, no new debit entry, no new Celery task.

If the key doesn't exist, the server proceeds with normal payout creation, and at the end stores the response:

```python
# Step 6 of create_payout():
IdempotencyKey.objects.create(
    key=idempotency_key,
    merchant=merchant,
    response_status=201,
    response_body=response,  # the full JSON response dict
)
```

### What happens if the first request is still in flight when the second arrives

This is the hardest edge case. Imagine:
1. Request 1 arrives with key `abc-123`, starts processing.
2. 50ms later, Request 2 arrives with the same key `abc-123` (network retry).

**The solution: the idempotency check is inside the `SELECT FOR UPDATE` lock.**

Here's the timeline:

1. Request 1 acquires the `SELECT FOR UPDATE` lock on the merchant row.
2. Request 1 checks for idempotency key `abc-123` → not found. Proceeds to create payout.
3. Request 2 tries to acquire `SELECT FOR UPDATE` on the same merchant → **blocks**.
4. Request 1 creates the payout, creates the DEBIT entry, stores the idempotency key, commits.
5. Request 2 **unblocks**. Checks for idempotency key `abc-123` → **found** (Request 1 just created it).
6. Request 2 returns the cached response. No duplicate payout.

Because the idempotency check happens inside the serialization lock, there is **no window** where two concurrent requests with the same key both see "key not found." The lock guarantees that the second request always sees the key that the first one wrote.

### Key scoping and expiry

**Scoped per merchant:** The `idempotency_keys` table has a `UNIQUE(key, merchant)` constraint. Merchant A's key `abc-123` is completely independent of Merchant B's key `abc-123`. This prevents cross-merchant collisions and means clients don't need globally unique keys — just unique per merchant.

**24-hour expiry:** The lookup includes `created_at__gte=cutoff` where `cutoff = now - 24h`. After 24 hours, the same key can be reused. This is correct behavior: if you're retrying 24 hours later, something else went wrong and a fresh payout is likely intentional.

### The database constraint as a safety net

Even if the lock somehow failed to prevent concurrent inserts (it won't, but defense in depth), the `UNIQUE(key, merchant)` constraint on `idempotency_keys` would cause the second insert to fail with an `IntegrityError`, rolling back the entire transaction. No duplicate payout possible.

---

## 4. The State Machine

### Legal transitions

```
PENDING ──▶ PROCESSING ──▶ COMPLETED    (payout sent to bank successfully)
                       └──▶ FAILED       (bank rejected, or max retries exceeded)
```

No other transitions are allowed. You cannot go backward. You cannot jump from PENDING to COMPLETED. You cannot revive a FAILED payout.

### Where in the code failed-to-completed is blocked

In `models.py`, the `Payout` model:

```python
class Payout(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"
        FAILED = "FAILED"

    VALID_TRANSITIONS = {
        Status.PENDING:    {Status.PROCESSING},
        Status.PROCESSING: {Status.COMPLETED, Status.FAILED},
        # COMPLETED and FAILED are intentionally absent — they are terminal states.
        # .get() on a missing key returns an empty set, blocking all transitions.
    }

    def transition_to(self, new_status):
        allowed = self.VALID_TRANSITIONS.get(self.status, set())
        if new_status not in allowed:
            raise ValueError(
                f"Illegal transition: {self.status} -> {new_status}"
            )
        self.status = new_status
```

Here's how each illegal transition is blocked:

| Current state | Attempted | `VALID_TRANSITIONS.get(...)` returns | Allowed? |
|---------------|-----------|--------------------------------------|----------|
| PENDING | PROCESSING | `{PROCESSING}` | ✅ Yes |
| PROCESSING | COMPLETED | `{COMPLETED, FAILED}` | ✅ Yes |
| PROCESSING | FAILED | `{COMPLETED, FAILED}` | ✅ Yes |
| **COMPLETED** | **PENDING** | `set()` (empty — not in dict) | ❌ **ValueError** |
| **COMPLETED** | **PROCESSING** | `set()` | ❌ **ValueError** |
| **FAILED** | **COMPLETED** | `set()` | ❌ **ValueError** |
| **FAILED** | **PENDING** | `set()` | ❌ **ValueError** |
| **FAILED** | **PROCESSING** | `set()` | ❌ **ValueError** |
| PENDING | COMPLETED | `{PROCESSING}` | ❌ **ValueError** (skips PROCESSING) |
| PENDING | FAILED | `{PROCESSING}` | ❌ **ValueError** (skips PROCESSING) |

`COMPLETED` and `FAILED` have no key in `VALID_TRANSITIONS`. Python's `dict.get(key, default)` returns `set()` (the default), which is empty. Since no status is `in` an empty set, every transition from a terminal state raises `ValueError`.

### Why enforce at the model level

The constraint lives in `Payout.transition_to()` on the model, not in a view or a Celery task. This means:
- The API can't bypass it.
- Celery tasks can't bypass it.
- Management commands (`python manage.py shell`) can't bypass it.
- Admin panel actions can't bypass it.

Every code path in the application that changes payout status must call `transition_to()`. There's no other setter for `status` that skips the check.

### Atomic fund return on failure

When a payout fails (bank rejection or max retries), the state change and the fund return happen in one atomic operation:

```python
# services.py — settle_payout() (called when bank returns FAILURE)
with transaction.atomic():
    # Lock the payout row
    payout = Payout.objects.select_for_update().get(id=payout_id)

    if payout.status != Payout.Status.PROCESSING:
        return  # Already settled (duplicate Celery message — safe to ignore)

    # Lock the merchant row (we're about to modify their balance)
    Merchant.objects.select_for_update().get(id=payout.merchant_id)

    # Transition state: PROCESSING → FAILED
    payout.transition_to(Payout.Status.FAILED)
    payout.save()

    # Return funds to merchant in the SAME transaction
    LedgerEntry.objects.create(
        merchant_id=payout.merchant_id,
        entry_type=LedgerEntry.EntryType.CREDIT,
        amount_paise=payout.amount_paise,
        payout=payout,
        description=f"Payout failed — funds returned #{str(payout.id)[:8]}",
    )
```

**Why atomicity matters here:** If the CREDIT entry insert failed (disk full, constraint violation, whatever), the `transaction.atomic()` block would roll back the entire transaction — including the state change. The payout would stay in PROCESSING, not FAILED. This prevents the worst possible bug: a payout marked as FAILED with no corresponding CREDIT entry, meaning the merchant's money just vanished.

The same pattern is used in `fail_payout_max_retries()` for payouts that exhaust all retry attempts.

---

## 5. The AI Audit

### The specific example: balance calculation

When I asked AI to implement the balance query for the merchant dashboard, it generated:

```python
# What AI gave me — WRONG
def get_merchant_balance(merchant_id):
    entries = LedgerEntry.objects.filter(merchant_id=merchant_id)
    credits = sum(e.amount_paise for e in entries if e.entry_type == 'CREDIT')
    debits = sum(e.amount_paise for e in entries if e.entry_type == 'DEBIT')
    return {
        "available_balance_paise": credits - debits,
        "held_balance_paise": 0,
    }
```

### What I caught — three bugs

**Bug 1: Python-level aggregation creates a TOCTOU race.**

The code does `LedgerEntry.objects.filter(...)` which issues a `SELECT * FROM ledger_entries WHERE merchant_id = %s`. This fetches every ledger row into Python memory. Then `sum(...)` iterates over the Python list.

The problem: between the `SELECT` (reading entries) and the return (using the sum), another transaction could commit a new DEBIT entry. The returned balance is already stale. In the `create_payout` function, this would mean the balance check is unreliable — the merchant could actually have less money than this function reports.

Even worse, for a merchant with 50,000 ledger entries, this loads all 50,000 rows into Django model instances, then iterates them twice (once for credits, once for debits). A single SQL aggregate does the same work with zero data transfer to Python.

**Bug 2: Held balance hardcoded to zero.**

The AI returned `"held_balance_paise": 0` — it completely ignored pending and processing payouts. On the dashboard, a merchant with ₹10,000 in credits and ₹6,000 in a pending payout would see:
- Available: ₹4,000 (correct, because the debit is in the ledger)
- Held: ₹0 (wrong — there's ₹6,000 in flight)

The merchant would have no idea that ₹6,000 is being processed. They might think their balance just disappeared.

**Bug 3: No output type enforcement.**

Python's built-in `sum()` returns an `int` for integers, but this is fragile. If someone later adds a `to_rupees()` conversion before summing (dividing by 100), the result becomes a `float`, and you're back to IEEE 754 rounding errors in a financial calculation. The DB-level `Sum(..., output_field=BigIntegerField())` enforces the type at the database level — it can't accidentally become a float regardless of Python-side changes.

### What I replaced it with

```python
# What I shipped — correct
def _compute_balance(merchant_id):
    """Single SQL aggregate. No Python math. Type-enforced at DB level."""
    result = LedgerEntry.objects.filter(merchant_id=merchant_id).aggregate(
        balance=Coalesce(
            Sum(
                Case(
                    When(entry_type=LedgerEntry.EntryType.CREDIT, then=F("amount_paise")),
                    When(entry_type=LedgerEntry.EntryType.DEBIT, then=-F("amount_paise")),
                    output_field=BigIntegerField(),
                )
            ),
            Value(0),
            output_field=BigIntegerField(),
        )
    )
    return result["balance"]


def get_merchant_balance(merchant_id):
    """Public API: returns available + held, both from DB-level aggregates."""
    available = _compute_balance(merchant_id)

    held = Payout.objects.filter(
        merchant_id=merchant_id,
        status__in=[Payout.Status.PENDING, Payout.Status.PROCESSING],
    ).aggregate(
        total=Coalesce(
            Sum("amount_paise"),
            Value(0),
            output_field=BigIntegerField(),
        )
    )["total"]

    return {
        "available_balance_paise": available,
        "held_balance_paise": held,
    }
```

**What changed:**
1. Balance computed by `Sum(Case(When(...)))` — a single SQL query, no rows fetched to Python.
2. Explicit `output_field=BigIntegerField()` — the database returns a bigint, always.
3. `Coalesce(..., Value(0))` — handles merchants with no entries (returns 0, not NULL).
4. Held balance computed by a separate aggregate on pending/processing payouts — not hardcoded to zero.
5. The `_compute_balance` function is reused in `create_payout()` (inside the lock) and in the public balance endpoint — one source of truth, two call sites.

---

## Retry logic — how stuck payouts recover

### The flow

1. **`create_payout()`** creates a PENDING payout and dispatches `process_payout.delay()` via `on_commit`.
2. **`process_payout()` task** (Celery worker):
   - Transitions PENDING → PROCESSING (or accepts a retry if already PROCESSING).
   - Increments `attempts`, records `last_attempted_at`.
   - Calls `_simulate_bank_settlement()` which sleeps 1-3 seconds, then returns:
     - `SUCCESS` (70%): calls `settle_payout()` → PROCESSING → COMPLETED.
     - `FAILURE` (20%): calls `settle_payout()` → PROCESSING → FAILED + return funds.
     - `HANG` (10%): task returns without settling. Payout stays PROCESSING.
3. **`check_stuck_payouts()` periodic task** (Celery Beat, every 10s):
   - Scans all PROCESSING payouts.
   - For each, calculates the backoff window: `BASE_BACKOFF * 2^(attempts-1)`.
   - If past the window and `attempts < 3`: dispatches another `process_payout.delay()`.
   - If past the window and `attempts >= 3`: calls `fail_payout_max_retries()` → FAILED + return funds.

### Exponential backoff schedule

```
Attempt 1: retry after 30s   (30 × 2⁰)
Attempt 2: retry after 60s   (30 × 2¹)
Attempt 3: retry after 120s  (30 × 2²)
After attempt 3: FAIL permanently, return funds to merchant
```

### Why a periodic sweep instead of Celery's built-in retry

Celery has `self.retry(countdown=...)`, which schedules a retry within the same task chain. But:
- If the worker process crashes, the retry message is lost.
- If Redis loses the message (unlikely but possible), the retry never fires.
- If the task raises an unexpected exception, the retry might not execute.

The periodic `check_stuck_payouts` is a **sweep** — it runs every 10 seconds and catches any payout stuck in PROCESSING, regardless of *why* it's stuck. It's a safety net that makes the system self-healing. Even if every Celery worker crashes and restarts, the beat task will find the stuck payouts and retry them.

### Idempotent retries

The `process_payout` task handles both initial processing and retries safely:

```python
if payout.status == Payout.Status.PENDING:
    payout.transition_to(Payout.Status.PROCESSING)
elif payout.status == Payout.Status.PROCESSING:
    pass  # retry — already in processing, just re-attempt settlement
else:
    return  # terminal state — nothing to do
```

If a retry races with the original task completing, `SELECT FOR UPDATE` serializes them. The loser finds the payout in a terminal state (COMPLETED or FAILED) and exits immediately.

---

## Frontend design decisions

### Polling at 3-second intervals

The dashboard polls balance, payouts, and ledger entries every 3 seconds:

```javascript
const POLL_INTERVAL = 3000;

useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(id);
}, [refresh]);
```

I chose polling over WebSockets because:
- Data changes every few seconds (payout state transitions), not milliseconds. 3s polling is effectively "live" for this use case.
- Polling is stateless — no connection management, no reconnection logic, no state synchronization between client and server.
- For a demo with a handful of users, polling is far simpler to debug than WebSockets.

### Integer-only display

The `formatINR()` function converts paise to display rupees using only integer operations:

```javascript
function formatINR(paise) {
    const rupees = Math.floor(paise / 100);
    const paisePart = paise % 100;
    return `₹${rupees.toLocaleString("en-IN")}.${String(paisePart).padStart(2, "0")}`;
}
```

`Math.floor()` and `%` on integers produce integers. No division that could introduce floating-point artifacts. `toLocaleString("en-IN")` adds the Indian numbering format (lakhs and crores grouping).

### Payout form: rupees input, paise transmission

The form accepts rupees (what merchants think in) and converts to paise before calling the API:

```javascript
const amountPaise = parseInt(amountRupees, 10) * 100;
```

`parseInt()` ensures we're working with an integer. Multiplying by 100 gives paise. No floating point involved at any step.

---

## What I'd do differently in production

1. **Authentication.** Merchant identity should come from a JWT or session token, not a `merchant_id` in the request body. The current design trusts the client to identify itself, which is a security vulnerability in production.

2. **Idempotency key cleanup.** A periodic background job that deletes `IdempotencyKey` rows older than 24 hours, plus a partial index on `(key, merchant_id) WHERE created_at >= now() - interval '24 hours'` to keep the lookup fast as the table grows.

3. **Webhook notifications.** Instead of frontend polling, fire webhooks to the merchant's configured URL when payout status changes. The dashboard would use WebSockets or SSE for real-time updates.

4. **Real bank integration.** Replace `_simulate_bank_settlement()` with actual NEFT/IMPS/UPI API calls. Settlement would be truly async — the bank sends a callback webhook, and a handler processes the result.

5. **Audit log.** Every state transition logged with timestamp, actor (API/worker/beat), and reason. The ledger covers financial mutations, but operational events (who triggered the retry, why it failed, what the bank returned) need their own trail.

6. **Read replicas.** The `GET /balance` endpoint doesn't need to hit the primary database. Only the payout creation path (which uses `SELECT FOR UPDATE`) needs the primary. Routing reads to a replica would reduce load on the primary.

7. **Dead letter queue.** Payouts that fail after max retries should land in a DLQ for manual review, not just be marked FAILED. A stuck payout might indicate a bank outage, not a permanent failure — auto-failing it loses the context for the operations team.

8. **Rate limiting.** Per-merchant rate limits on payout creation to prevent abuse or accidental flooding from a buggy client.

---

## Known limitations of this implementation

- **No auth:** Any client can create payouts for any merchant. Intentional for the demo — adding auth would obscure the payout logic that's being evaluated.
- **Single-process Celery:** The docker-compose runs one worker with 4 threads. Production would run multiple workers across multiple hosts.
- **No monitoring:** No Prometheus metrics, no structured logging (just Python `logging`), no alerting on stuck payouts. These are table stakes for production money-moving code.
- **Polling-based frontend:** Acceptable for a demo dashboard. Would not scale to thousands of concurrent viewers.
- **No bank account validation:** The `bank_account_id` is a freetext string. Production would validate against IFSC codes and account number formats.
- **No currency conversion:** The engine operates purely in INR paise. The USD → INR conversion that would happen in production is outside the scope of this challenge.
