"""
Tests for the core payout engine invariants:
  1. Concurrency — two simultaneous payouts that would overdraw must not both succeed.
  2. Idempotency — duplicate requests with the same key return the same response.
  3. State machine — illegal transitions are rejected.

Requires a real PostgreSQL database (SELECT FOR UPDATE is not supported on SQLite).
Run with:  python manage.py test ledger --verbosity=2
"""

import uuid
from concurrent.futures import ThreadPoolExecutor, as_completed

from django.db import connection
from django.test import TestCase, TransactionTestCase

from .models import IdempotencyKey, LedgerEntry, Merchant, Payout
from .services import _compute_balance, create_payout, get_merchant_balance


class ConcurrencyTest(TransactionTestCase):
    """
    The two-60-rupee problem:
    A merchant has ₹100 (10000 paise). Two threads simultaneously request
    ₹60 (6000 paise) payouts. Exactly one must succeed; the other must be
    rejected with insufficient funds.

    Uses TransactionTestCase because SELECT FOR UPDATE requires real
    transactions — TestCase wraps everything in a single transaction,
    defeating the lock.
    """

    def setUp(self):
        self.merchant = Merchant.objects.create(
            name="Test Merchant",
            email="test@concurrent.in",
        )
        LedgerEntry.objects.create(
            merchant=self.merchant,
            entry_type=LedgerEntry.EntryType.CREDIT,
            amount_paise=10_000,
            description="Seed credit — ₹100",
        )

    def _submit_payout(self, amount_paise):
        """
        Submit a payout in its own database connection.
        Returns (http_status, response_body).
        """
        key = uuid.uuid4()
        try:
            status_code, body = create_payout(
                merchant_id=self.merchant.id,
                amount_paise=amount_paise,
                bank_account_id="HDFC000TEST",
                idempotency_key=key,
            )
            return status_code, body
        finally:
            connection.close()

    def test_concurrent_payouts_one_succeeds_one_fails(self):
        """Exactly one of two concurrent 6000p payouts on a 10000p balance succeeds."""
        results = []
        with ThreadPoolExecutor(max_workers=2) as pool:
            futures = [pool.submit(self._submit_payout, 6_000) for _ in range(2)]
            for f in as_completed(futures):
                results.append(f.result())

        statuses = sorted([r[0] for r in results])
        self.assertEqual(statuses, [201, 422], (
            f"Expected exactly one 201 and one 422, got {statuses}. "
            f"Full results: {results}"
        ))

        final_balance = _compute_balance(self.merchant.id)
        self.assertEqual(final_balance, 4_000, (
            f"Balance should be 10000 - 6000 = 4000 paise, got {final_balance}"
        ))

    def test_concurrent_exact_balance_payouts(self):
        """
        Two threads each request the full balance (10000p).
        Exactly one succeeds; the other is rejected.
        """
        results = []
        with ThreadPoolExecutor(max_workers=2) as pool:
            futures = [pool.submit(self._submit_payout, 10_000) for _ in range(2)]
            for f in as_completed(futures):
                results.append(f.result())

        statuses = sorted([r[0] for r in results])
        self.assertEqual(statuses, [201, 422])

        final_balance = _compute_balance(self.merchant.id)
        self.assertEqual(final_balance, 0)


class IdempotencyTest(TransactionTestCase):
    """
    The same Idempotency-Key for the same merchant must return
    the exact same response without creating a duplicate payout.
    """

    def setUp(self):
        self.merchant = Merchant.objects.create(
            name="Idempotent Merchant",
            email="test@idempotent.in",
        )
        LedgerEntry.objects.create(
            merchant=self.merchant,
            entry_type=LedgerEntry.EntryType.CREDIT,
            amount_paise=500_000,
            description="Seed credit",
        )

    def test_duplicate_key_returns_same_response(self):
        """Second call with the same key returns identical response, no new payout."""
        key = uuid.uuid4()

        status1, body1 = create_payout(
            merchant_id=self.merchant.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=key,
        )
        status2, body2 = create_payout(
            merchant_id=self.merchant.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=key,
        )

        self.assertEqual(status1, 201)
        self.assertEqual(status2, 201)
        self.assertEqual(body1["id"], body2["id"])

        payout_count = Payout.objects.filter(merchant=self.merchant).count()
        self.assertEqual(payout_count, 1, "Duplicate key must not create a second payout")

    def test_different_keys_create_separate_payouts(self):
        """Different idempotency keys create distinct payouts."""
        status1, body1 = create_payout(
            merchant_id=self.merchant.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=uuid.uuid4(),
        )
        status2, body2 = create_payout(
            merchant_id=self.merchant.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=uuid.uuid4(),
        )

        self.assertEqual(status1, 201)
        self.assertEqual(status2, 201)
        self.assertNotEqual(body1["id"], body2["id"])

    def test_same_key_different_merchants_are_independent(self):
        """Same key used by different merchants creates separate payouts."""
        merchant2 = Merchant.objects.create(
            name="Other Merchant",
            email="other@idempotent.in",
        )
        LedgerEntry.objects.create(
            merchant=merchant2,
            entry_type=LedgerEntry.EntryType.CREDIT,
            amount_paise=500_000,
            description="Seed credit",
        )

        shared_key = uuid.uuid4()

        status1, body1 = create_payout(
            merchant_id=self.merchant.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=shared_key,
        )
        status2, body2 = create_payout(
            merchant_id=merchant2.id,
            amount_paise=10_000,
            bank_account_id="HDFC000TEST",
            idempotency_key=shared_key,
        )

        self.assertEqual(status1, 201)
        self.assertEqual(status2, 201)
        self.assertNotEqual(body1["id"], body2["id"])

    def test_concurrent_duplicate_keys(self):
        """Two threads submit the same idempotency key simultaneously — only one payout created."""
        key = uuid.uuid4()

        def submit():
            try:
                return create_payout(
                    merchant_id=self.merchant.id,
                    amount_paise=10_000,
                    bank_account_id="HDFC000TEST",
                    idempotency_key=key,
                )
            finally:
                connection.close()

        results = []
        with ThreadPoolExecutor(max_workers=2) as pool:
            futures = [pool.submit(submit) for _ in range(2)]
            for f in as_completed(futures):
                results.append(f.result())

        self.assertTrue(all(r[0] == 201 for r in results))
        self.assertEqual(results[0][1]["id"], results[1][1]["id"])

        payout_count = Payout.objects.filter(merchant=self.merchant).count()
        self.assertEqual(payout_count, 1)


class StateMachineTest(TestCase):
    """
    Verify that illegal state transitions are rejected.
    """

    def test_completed_to_pending_blocked(self):
        payout = Payout(status=Payout.Status.COMPLETED)
        with self.assertRaises(ValueError) as ctx:
            payout.transition_to(Payout.Status.PENDING)
        self.assertIn("Illegal transition", str(ctx.exception))

    def test_failed_to_completed_blocked(self):
        payout = Payout(status=Payout.Status.FAILED)
        with self.assertRaises(ValueError) as ctx:
            payout.transition_to(Payout.Status.COMPLETED)
        self.assertIn("Illegal transition", str(ctx.exception))

    def test_completed_to_processing_blocked(self):
        payout = Payout(status=Payout.Status.COMPLETED)
        with self.assertRaises(ValueError) as ctx:
            payout.transition_to(Payout.Status.PROCESSING)
        self.assertIn("Illegal transition", str(ctx.exception))

    def test_failed_to_pending_blocked(self):
        payout = Payout(status=Payout.Status.FAILED)
        with self.assertRaises(ValueError) as ctx:
            payout.transition_to(Payout.Status.PENDING)
        self.assertIn("Illegal transition", str(ctx.exception))

    def test_valid_pending_to_processing(self):
        payout = Payout(status=Payout.Status.PENDING)
        payout.transition_to(Payout.Status.PROCESSING)
        self.assertEqual(payout.status, Payout.Status.PROCESSING)

    def test_valid_processing_to_completed(self):
        payout = Payout(status=Payout.Status.PROCESSING)
        payout.transition_to(Payout.Status.COMPLETED)
        self.assertEqual(payout.status, Payout.Status.COMPLETED)

    def test_valid_processing_to_failed(self):
        payout = Payout(status=Payout.Status.PROCESSING)
        payout.transition_to(Payout.Status.FAILED)
        self.assertEqual(payout.status, Payout.Status.FAILED)
