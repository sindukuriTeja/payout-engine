import logging
import uuid

from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import LedgerEntry, Merchant, Payout
from .serializers import (
    CreatePayoutRequestSerializer,
    LedgerEntrySerializer,
    MerchantSerializer,
    PayoutSerializer,
)
from .services import InsufficientFundsError, create_payout, get_merchant_balance

logger = logging.getLogger(__name__)


class HealthCheckView(APIView):
    def get(self, request):
        try:
            connection.ensure_connection()
            return Response({"status": "healthy", "database": "connected"})
        except Exception as e:
            logger.error("Health check failed: %s", e)
            return Response(
                {"status": "unhealthy", "database": str(e)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class MerchantListView(APIView):
    def get(self, request):
        try:
            merchants = Merchant.objects.all().order_by("name")
            serializer = MerchantSerializer(merchants, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error("Failed to fetch merchants: %s", e)
            return Response(
                {"error": "Database unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class MerchantBalanceView(APIView):
    def get(self, request, merchant_id):
        try:
            Merchant.objects.get(id=merchant_id)
        except Merchant.DoesNotExist:
            return Response(
                {"error": "Merchant not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error("Failed to fetch merchant %s: %s", merchant_id, e)
            return Response(
                {"error": "Database unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        balance = get_merchant_balance(merchant_id)
        balance["merchant_id"] = str(merchant_id)
        return Response(balance)


class MerchantLedgerView(APIView):
    def get(self, request, merchant_id):
        try:
            entries = LedgerEntry.objects.filter(merchant_id=merchant_id).select_related(
                "payout"
            )[:50]
            serializer = LedgerEntrySerializer(entries, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error("Failed to fetch ledger for %s: %s", merchant_id, e)
            return Response(
                {"error": "Database unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class MerchantPayoutsView(APIView):
    def get(self, request, merchant_id):
        try:
            payouts = Payout.objects.filter(merchant_id=merchant_id)[:50]
            serializer = PayoutSerializer(payouts, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error("Failed to fetch payouts for %s: %s", merchant_id, e)
            return Response(
                {"error": "Database unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class CreatePayoutView(APIView):
    """
    POST /api/v1/payouts/

    Headers:
        Idempotency-Key: <uuid>   (required, merchant-scoped, 24h TTL)

    Body:
        { "merchant_id": "...", "amount_paise": 100000, "bank_account_id": "..." }
    """

    def post(self, request):
        # --- Validate Idempotency-Key header ---
        raw_key = request.META.get("HTTP_IDEMPOTENCY_KEY", "").strip()
        if not raw_key:
            return Response(
                {"error": "Idempotency-Key header is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            idempotency_key = uuid.UUID(raw_key)
        except ValueError:
            return Response(
                {"error": "Idempotency-Key must be a valid UUID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # --- Validate body ---
        serializer = CreatePayoutRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        merchant_id = serializer.validated_data["merchant_id"]
        amount_paise = serializer.validated_data["amount_paise"]
        bank_account_id = serializer.validated_data["bank_account_id"]

        # --- Create payout (all locking/idempotency inside the service) ---
        try:
            status_code, response_body = create_payout(
                merchant_id=merchant_id,
                amount_paise=amount_paise,
                bank_account_id=bank_account_id,
                idempotency_key=idempotency_key,
            )
        except Merchant.DoesNotExist:
            return Response(
                {"error": "Merchant not found"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response(response_body, status=status_code)
