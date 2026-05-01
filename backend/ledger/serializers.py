from rest_framework import serializers

from .models import LedgerEntry, Merchant, Payout


class MerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = ["id", "name", "email", "created_at"]


class PayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = [
            "id",
            "merchant_id",
            "amount_paise",
            "tax_paise",
            "bank_account_id",
            "status",
            "attempts",
            "created_at",
            "updated_at",
        ]


class LedgerEntrySerializer(serializers.ModelSerializer):
    payout_id = serializers.UUIDField(source="payout.id", allow_null=True)

    class Meta:
        model = LedgerEntry
        fields = [
            "id",
            "merchant_id",
            "entry_type",
            "amount_paise",
            "description",
            "payout_id",
            "created_at",
        ]


class CreatePayoutRequestSerializer(serializers.Serializer):
    merchant_id = serializers.UUIDField()
    amount_paise = serializers.IntegerField(min_value=1)
    bank_account_id = serializers.CharField(max_length=64)
