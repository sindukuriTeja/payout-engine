"""
Core payout business logic.

Every function that touches balances or payout state operates inside
a database transaction with SELECT FOR UPDATE locking on the merchant
row.  Balance is always computed via a single SQL aggregate — no
Python-level arithmetic on fetched rows.
"""

from datetime import timedelta

from django.db import transaction
from django.db.models import BigIntegerField, Case, F, Sum, Value, When
from django.db.models.functions import Coalesce
from django.utils import timezone

from .models import IdempotencyKey, LedgerEntry, Merchant, Payout


class InsufficientFundsError(Exception):
    pass


class InvalidStateTransitionError(Exception):
    pass


# ---------------------------------------------------------------------------
# Balance queries (all DB-level aggregation, zero Python arithmetic)
# ---------------------------------------------------------------------------


def _compute_balance(merchant_id):
    """
    Returns the available balance in paise using a single SQL SUM/CASE.

    Generated SQL:
        SELECT COALESCE(SUM(
            CASE WHEN entry_type='CREDIT' THEN amount_paise
                 WHEN entry_type='DEBIT'  THEN -amount_paise
            END
        ), 0) FROM ledger_entries WHERE merchant_id = %s

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


def get_merchant_balance(merchant_id):
    """
    Public balance query.  Returns a dict with available and held balances,
    both computed at DB level.
    """
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
    )[
        "total"
    ]

    return {
        "available_balance_paise": available,
        "held_balance_paise": held,
    }


# ---------------------------------------------------------------------------
# Payout creation (the critical path)
# ---------------------------------------------------------------------------


def create_payout(merchant_id, amount_paise, bank_account_id, idempotency_key):
    """
    Atomically:
      1. Lock the merchant row (SELECT FOR UPDATE).
      2. Check idempotency — return cached response if key exists.
      3. Compute balance at DB level.
      4. Reject if insufficient funds.
      5. Create Payout (PENDING) + DEBIT ledger entry.
      6. Store idempotency key with serialised response.
      7. Schedule Celery processing on commit.

    Returns (http_status, response_dict).
    """
    if amount_paise <= 0:
        return 400, {"error": "amount_paise must be a positive integer"}

    with transaction.atomic():
        # ---- 1. Lock merchant row ----
        merchant = Merchant.objects.select_for_update().get(id=merchant_id)

        # ---- 2. Idempotency check (inside the lock so two identical
        #         concurrent requests are serialised) ----
        cutoff = timezone.now() - timedelta(hours=24)
        existing = IdempotencyKey.objects.filter(
            key=idempotency_key,
            merchant=merchant,
            created_at__gte=cutoff,
        ).first()

        if existing:
            return existing.response_status, existing.response_body

        # ---- 3. DB-level balance ----
        balance = _compute_balance(merchant.id)

        # ---- 4. Sufficient funds? ----
        if balance < amount_paise:
            return 422, {
                "error": "Insufficient funds",
                "available_balance_paise": balance,
                "requested_paise": amount_paise,
            }

        # ---- 5. Create payout + debit entry ----
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

        # ---- 6. Build and cache response ----
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

        # ---- 7. Dispatch worker AFTER commit ----
        # Importing here to avoid circular import at module level.
        from .tasks import process_payout

        transaction.on_commit(
            lambda pid=str(payout.id): process_payout.delay(pid)
        )

    return 201, response


# ---------------------------------------------------------------------------
# Payout processing (called by Celery)
# ---------------------------------------------------------------------------


def settle_payout(payout_id, settlement_result):
    """
    Move a PROCESSING payout to its final state.
    On FAILURE, return held funds atomically.

    settlement_result: 'SUCCESS' | 'FAILURE'
    """
    with transaction.atomic():
        payout = Payout.objects.select_for_update().get(id=payout_id)

        if payout.status != Payout.Status.PROCESSING:
            return  # Already settled (duplicate message)

        if settlement_result == "SUCCESS":
            payout.transition_to(Payout.Status.COMPLETED)
            payout.save()

        elif settlement_result == "FAILURE":
            # Lock the merchant too — we're modifying their balance
            Merchant.objects.select_for_update().get(id=payout.merchant_id)

            payout.transition_to(Payout.Status.FAILED)
            payout.save()

            # Return funds in the same transaction
            LedgerEntry.objects.create(
                merchant_id=payout.merchant_id,
                entry_type=LedgerEntry.EntryType.CREDIT,
                amount_paise=payout.amount_paise,
                payout=payout,
                description=f"Payout failed — funds returned #{str(payout.id)[:8]}",
            )


def fail_payout_max_retries(payout_id):
    """
    Called when a payout has exhausted all retries.
    Transitions PROCESSING -> FAILED and returns funds.
    """
    with transaction.atomic():
        payout = Payout.objects.select_for_update().get(id=payout_id)

        if payout.status != Payout.Status.PROCESSING:
            return

        Merchant.objects.select_for_update().get(id=payout.merchant_id)

        payout.transition_to(Payout.Status.FAILED)
        payout.save()

        LedgerEntry.objects.create(
            merchant_id=payout.merchant_id,
            entry_type=LedgerEntry.EntryType.CREDIT,
            amount_paise=payout.amount_paise,
            payout=payout,
            description=f"Payout failed (max retries) #{str(payout.id)[:8]}",
        )
