"""
Celery tasks for payout processing.

process_payout:      Handles one payout — transitions PENDING->PROCESSING,
                     simulates bank settlement, then settles.
check_stuck_payouts: Periodic beat task that finds PROCESSING payouts past
                     their backoff window and either retries or fails them.
"""

import logging
import random
import time
from datetime import timedelta

from celery import shared_task
from django.db import transaction
from django.utils import timezone

from .models import Payout
from .services import fail_payout_max_retries, settle_payout

logger = logging.getLogger(__name__)

MAX_ATTEMPTS = 3
BASE_BACKOFF_SECONDS = 30


def _simulate_bank_settlement():
    """
    Simulate a bank API call.  Returns 'SUCCESS', 'FAILURE', or 'HANG'.

    70% success, 20% failure, 10% hang (no response — stays PROCESSING).
    Uses randint to avoid floats.
    """
    time.sleep(random.randint(1, 3))  # simulate network latency
    roll = random.randint(1, 100)
    if roll <= 70:
        return "SUCCESS"
    elif roll <= 90:
        return "FAILURE"
    else:
        return "HANG"


@shared_task(name="ledger.tasks.process_payout")
def process_payout(payout_id):
    """
    Process a single payout.

    1. Transition to PROCESSING (or accept retry if already PROCESSING).
    2. Simulate bank settlement.
    3. Settle based on result; on HANG do nothing — periodic task retries.
    """
    # --- Phase 1: move to PROCESSING inside a transaction ---
    with transaction.atomic():
        payout = Payout.objects.select_for_update().get(id=payout_id)

        if payout.status == Payout.Status.PENDING:
            payout.transition_to(Payout.Status.PROCESSING)
        elif payout.status == Payout.Status.PROCESSING:
            pass  # retry — already in processing
        else:
            logger.info("Payout %s already in terminal state %s", payout_id, payout.status)
            return

        payout.attempts += 1
        payout.last_attempted_at = timezone.now()
        payout.save()

    logger.info(
        "Processing payout %s (attempt %d)", payout_id, payout.attempts
    )

    # --- Phase 2: simulate bank call (outside the lock) ---
    result = _simulate_bank_settlement()
    logger.info("Payout %s settlement result: %s", payout_id, result)

    # --- Phase 3: settle ---
    if result == "HANG":
        # Do nothing.  The periodic check_stuck_payouts task will
        # pick this up after the backoff window.
        logger.warning("Payout %s hung — will be retried by beat task", payout_id)
        return

    settle_payout(payout_id, result)


@shared_task(name="ledger.tasks.check_stuck_payouts")
def check_stuck_payouts():
    """
    Periodic task (runs every 10s via beat).

    Finds payouts stuck in PROCESSING beyond their exponential backoff
    window and either retries them or fails them if max attempts reached.

    Backoff: 30s * 2^(attempts-1)
        attempt 1 → 30s
        attempt 2 → 60s
        attempt 3 → 120s  (then fail)
    """
    now = timezone.now()
    stuck = Payout.objects.filter(
        status=Payout.Status.PROCESSING,
        last_attempted_at__isnull=False,
    )

    for payout in stuck:
        backoff_seconds = BASE_BACKOFF_SECONDS * (2 ** (payout.attempts - 1))
        threshold = payout.last_attempted_at + timedelta(seconds=backoff_seconds)

        if now < threshold:
            continue  # not yet time

        if payout.attempts >= MAX_ATTEMPTS:
            logger.warning(
                "Payout %s exceeded max retries (%d) — failing",
                payout.id,
                MAX_ATTEMPTS,
            )
            fail_payout_max_retries(str(payout.id))
        else:
            logger.info(
                "Retrying stuck payout %s (attempt %d)",
                payout.id,
                payout.attempts + 1,
            )
            process_payout.delay(str(payout.id))
