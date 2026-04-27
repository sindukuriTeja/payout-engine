import uuid

from django.db import models


class Merchant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "merchants"

    def __str__(self):
        return self.name


class Payout(models.Model):
    """
    State machine:
        PENDING -> PROCESSING -> COMPLETED
        PENDING -> PROCESSING -> FAILED

    No backward transitions allowed. A failed payout returns funds
    atomically with the state transition.
    """

    class Status(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"
        FAILED = "FAILED"

    VALID_TRANSITIONS = {
        Status.PENDING: {Status.PROCESSING},
        Status.PROCESSING: {Status.COMPLETED, Status.FAILED},
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    merchant = models.ForeignKey(
        Merchant, on_delete=models.CASCADE, related_name="payouts"
    )
    amount_paise = models.BigIntegerField()
    bank_account_id = models.CharField(max_length=64)
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.PENDING,
    )
    attempts = models.IntegerField(default=0)
    last_attempted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "payouts"
        ordering = ["-created_at"]

    def transition_to(self, new_status):
        """
        Enforce the state machine. Raises ValueError if the transition
        is not in VALID_TRANSITIONS.
        """
        allowed = self.VALID_TRANSITIONS.get(self.status, set())
        if new_status not in allowed:
            raise ValueError(
                f"Illegal transition: {self.status} -> {new_status}"
            )
        self.status = new_status

    def __str__(self):
        return f"Payout {self.id} [{self.status}] {self.amount_paise}p"


class LedgerEntry(models.Model):
    """
    Immutable ledger. Balance is always derived as:
        SUM(CREDIT amounts) - SUM(DEBIT amounts)
    computed at the database level.
    """

    class EntryType(models.TextChoices):
        CREDIT = "CREDIT"
        DEBIT = "DEBIT"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    merchant = models.ForeignKey(
        Merchant, on_delete=models.CASCADE, related_name="ledger_entries"
    )
    entry_type = models.CharField(max_length=8, choices=EntryType.choices)
    amount_paise = models.BigIntegerField()
    description = models.CharField(max_length=512, blank=True, default="")
    payout = models.ForeignKey(
        Payout,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="ledger_entries",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "ledger_entries"
        ordering = ["-created_at"]

    def __str__(self):
        sign = "+" if self.entry_type == self.EntryType.CREDIT else "-"
        return f"{sign}{self.amount_paise}p ({self.description})"


class IdempotencyKey(models.Model):
    """
    Stores the response for a merchant-scoped idempotency key so that
    duplicate POST requests return the same result. Keys expire after 24h.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.UUIDField()
    merchant = models.ForeignKey(
        Merchant, on_delete=models.CASCADE, related_name="idempotency_keys"
    )
    response_status = models.IntegerField()
    response_body = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "idempotency_keys"
        constraints = [
            models.UniqueConstraint(
                fields=["key", "merchant"],
                name="uq_idempotency_key_merchant",
            )
        ]

    def __str__(self):
        return f"IdemKey {self.key} for {self.merchant_id}"
