from django.contrib import admin
from django.urls import include, path
from rest_framework.response import Response
from rest_framework.views import APIView


class RootView(APIView):
    def get(self, request):
        return Response({
            "service": "Payout Engine API",
            "version": "1.0.0",
            "endpoints": {
                "health": "/api/v1/health/",
                "merchants": "/api/v1/merchants/",
                "payouts": "/api/v1/payouts/",
            }
        })


urlpatterns = [
    path("", RootView.as_view(), name="root"),
    path("admin/", admin.site.urls),
    path("api/v1/", include("ledger.urls")),
]
