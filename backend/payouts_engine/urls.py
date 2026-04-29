from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("Payout Engine is Live")

urlpatterns = [
    path("", home_view, name="home"),
    path("admin/", admin.site.urls),
    path("api/v1/", include("ledger.urls")),
]
