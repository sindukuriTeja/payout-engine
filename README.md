# Playto Payout Engine

A minimal but production-grade payout engine for [Playto Pay](https://www.playto.so/features/playto-pay) — cross-border payment infrastructure for Indian agencies, freelancers, and online businesses.

**What it does:** Merchants accumulate INR balance when their international customers pay in USD. This engine handles the withdrawal side — merchants see their balance, request payouts to their Indian bank account, and track payout status in real time. The system guarantees that money never disappears, balances never go negative, and duplicate requests never create duplicate payouts.

---

## How it works (the 30-second version)

```
Customer pays $500 in USD
        ↓
Playto collects and converts to INR
        ↓
₹41,250 CREDIT appears in merchant's ledger    ← (we seed this)
        ↓
Merchant requests ₹20,000 payout
        ↓
Engine checks balance, holds funds, creates DEBIT entry
        ↓
Background worker simulates bank settlement
        ↓
  70% → COMPLETED (funds sent)
  20% → FAILED (funds returned to merchant)
  10% → HANG (retried with exponential backoff, max 3 attempts)
```

You don't need to build the customer payment flow. The seed script creates 3 merchants with credit history so the demo works out of the box.

---

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Ports 5432, 6379, 8000, 5173 available

### One command setup

```bash
git clone https://github.com/sindukuriTeja/payout-engine.git
cd payout-engine
docker compose up --build
```

This starts **5 services** automatically:

| Service | Port | What it does |
|---------|------|-------------|
| **PostgreSQL 16** | 5432 | Stores merchants, ledger entries, payouts, idempotency keys |
| **Redis 7** | 6379 | Message broker for Celery task queue |
| **Django API** | 8000 | REST API for all payout operations |
| **Celery Worker** | — | Background processor for bank settlement (4 concurrent threads) |
| **Celery Beat** | — | Periodic scheduler that checks for stuck payouts every 10 seconds |
| **React Dashboard** | 5173 | Live merchant dashboard with 3-second polling |

On first boot, the `entrypoint.sh` script automatically:
1. Waits for PostgreSQL to be ready
2. Runs database migrations
3. Seeds 3 merchants with credit history

**Open http://localhost:5173** to see the dashboard.

---

## API Reference

All endpoints are under `/api/v1/`. Amounts are always in **paise** (1 rupee = 100 paise).

### List all merchants
```bash
curl http://localhost:8000/api/v1/merchants/
```
Returns all seeded merchants with their UUIDs. You'll need a merchant UUID for the other endpoints.

### Get merchant balance
```bash
curl http://localhost:8000/api/v1/merchants/<merchant-uuid>/balance/
```
Returns:
```json
{
  "merchant_id": "abc-123...",
  "available_balance_paise": 745000,
  "held_balance_paise": 100000
}
```
- `available_balance_paise`: What the merchant can actually withdraw right now (credits minus all debits, including holds)
- `held_balance_paise`: Funds locked in pending/processing payouts (will either be sent to bank or returned)

### Create a payout
```bash
curl -X POST http://localhost:8000/api/v1/payouts/ \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{
    "merchant_id": "<merchant-uuid>",
    "amount_paise": 100000,
    "bank_account_id": "HDFC00012345"
  }'
```

**Important headers:**
- `Idempotency-Key` (required): A UUID that prevents duplicate payouts. If you send the same key twice, you get the same response back without creating a second payout. Keys are scoped per merchant and expire after 24 hours.

**Response (201 Created):**
```json
{
  "id": "payout-uuid...",
  "merchant_id": "merchant-uuid...",
  "amount_paise": 100000,
  "bank_account_id": "HDFC00012345",
  "status": "PENDING",
  "created_at": "2026-04-28T10:30:00Z"
}
```

**Error responses:**
- `400`: Missing idempotency key, invalid UUID, or invalid body
- `404`: Merchant not found
- `422`: Insufficient funds (includes current balance in response)

### Get payout history
```bash
curl http://localhost:8000/api/v1/merchants/<merchant-uuid>/payouts/
```
Returns the 50 most recent payouts with status, attempts count, and timestamps.

### Get ledger entries
```bash
curl http://localhost:8000/api/v1/merchants/<merchant-uuid>/ledger/
```
Returns the 50 most recent credits and debits — the complete money trail.

---

## Tests

The test suite covers the three hardest problems in payment systems: concurrency, idempotency, and state integrity.

### Running tests

```bash
# Inside the running Docker setup:
docker compose exec backend python manage.py test ledger --verbosity=2
```

> **Note:** Tests require PostgreSQL (not SQLite) because they use `SELECT FOR UPDATE` for real row-level locking.

### What's tested

#### `ConcurrencyTest` (TransactionTestCase)
- **The two-60-rupee problem:** A merchant has ₹100 balance. Two threads simultaneously request ₹60 payouts using `ThreadPoolExecutor`. The test asserts exactly one gets `201 Created` and the other gets `422 Insufficient Funds`. Balance after: ₹40 (not ₹-20).
- **Full balance race:** Two threads each request the full ₹100. Exactly one succeeds. Balance after: ₹0.
- Uses `TransactionTestCase` (not `TestCase`) because Django's `TestCase` wraps everything in a single transaction, which would prevent `SELECT FOR UPDATE` from actually blocking.

#### `IdempotencyTest` (TransactionTestCase)
- **Duplicate key:** Same `Idempotency-Key` header sent twice → same response, only 1 payout in database.
- **Different keys:** Different keys → different payouts (sanity check).
- **Cross-merchant key isolation:** Same key used by two different merchants → two separate payouts (keys are merchant-scoped).
- **Concurrent duplicate keys:** Two threads submit the same key simultaneously using `ThreadPoolExecutor` → only 1 payout created, both threads get identical responses.

#### `StateMachineTest` (TestCase)
- Every illegal transition raises `ValueError`: COMPLETED→PENDING, FAILED→COMPLETED, COMPLETED→PROCESSING, FAILED→PENDING.
- Every legal transition works: PENDING→PROCESSING, PROCESSING→COMPLETED, PROCESSING→FAILED.

---

## Project Structure

```
payout-engine/
├── backend/
│   ├── ledger/                    # The core payout engine app
│   │   ├── models.py              # Merchant, Payout, LedgerEntry, IdempotencyKey
│   │   ├── services.py            # All business logic (balance, locking, payout creation)
│   │   ├── views.py               # DRF API views (thin layer over services)
│   │   ├── serializers.py         # Request/response serialization
│   │   ├── tasks.py               # Celery tasks (process_payout, check_stuck_payouts)
│   │   ├── urls.py                # URL routing
│   │   ├── tests.py               # Concurrency, idempotency, state machine tests
│   │   ├── admin.py               # Django admin registration
│   │   └── management/commands/
│   │       └── seed_data.py       # Seeds 3 merchants with credit history
│   ├── payouts_engine/            # Django project config
│   │   ├── settings.py            # Database, Celery, CORS, DRF config
│   │   ├── celery.py              # Celery app initialization
│   │   ├── urls.py                # Root URL config (api/v1/ → ledger.urls)
│   │   └── wsgi.py
│   ├── Dockerfile
│   ├── entrypoint.sh              # Migrations + seed + runserver
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main app with routing and polling
│   │   ├── api.js                 # API client functions
│   │   └── components/
│   │       ├── DashboardSection   # Balance cards + payout form + tables
│   │       ├── BalanceCard.jsx    # Available/held balance display
│   │       ├── PayoutForm.jsx     # Payout request form (rupees → paise conversion)
│   │       ├── PayoutHistory.jsx  # Payout status table with live badges
│   │       ├── LedgerTable.jsx    # Credit/debit history
│   │       ├── MerchantSelector   # Merchant dropdown
│   │       ├── Navbar.jsx         # Navigation bar
│   │       ├── Hero.jsx           # Landing hero section
│   │       └── ...                # Other UI sections
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js             # Proxy /api → backend:8000
├── docker-compose.yml             # All 5 services + volumes
├── EXPLAINER.md                   # Deep technical explanation (required reading)
└── README.md                      # You are here
```

### Where the important logic lives

| Concern | File | Key function/class |
|---------|------|--------------------|
| Balance calculation | `services.py` | `_compute_balance()` — single SQL aggregate |
| Concurrency control | `services.py` | `create_payout()` — `SELECT FOR UPDATE` on merchant |
| Idempotency | `services.py` | `create_payout()` — check inside the lock |
| State machine | `models.py` | `Payout.transition_to()` — validates transitions |
| Fund return on failure | `services.py` | `settle_payout()` — atomic state + credit |
| Bank simulation | `tasks.py` | `_simulate_bank_settlement()` — 70/20/10 |
| Retry logic | `tasks.py` | `check_stuck_payouts()` — exponential backoff |

---

## Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Backend | Django 5.1 + DRF 3.15 | Mature ORM with transaction support, `select_for_update()` |
| Database | PostgreSQL 16 | Row-level locking (`SELECT FOR UPDATE`), ACID transactions |
| Task Queue | Celery 5.4 + Redis 7 | Real async worker, not sync-faked. Beat for periodic retry sweeps |
| Frontend | React 18 + Tailwind CSS | Fast iteration, polling-based live updates |
| Container | Docker Compose | One-command setup for all 5 services |

---

## Architecture

For the full deep-dive into every design decision — including pasted code, the exact locking mechanism, how idempotency works under concurrency, and where the AI gave wrong code — see **[EXPLAINER.md](./EXPLAINER.md)**.

Topics covered:
1. **The Ledger** — Why paise as BigInteger, why DB-level aggregation, the balance invariant
2. **The Lock** — Exact `SELECT FOR UPDATE` code, how it prevents the two-60-rupee race
3. **The Idempotency** — How duplicate detection works, what happens when both requests are in flight
4. **The State Machine** — Where illegal transitions are blocked, atomic fund return
5. **The AI Audit** — Specific example of wrong AI-generated code and the fix
