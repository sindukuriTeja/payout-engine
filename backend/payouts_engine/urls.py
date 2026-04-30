from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.http import HttpResponse
from pathlib import Path


def serve_frontend(request):
    frontend_dir = Path(settings.FRONTEND_DIR)
    index_file = frontend_dir / "index.html"
    if index_file.exists():
        return HttpResponse(index_file.read_text(), content_type="text/html")
    return HttpResponse("Frontend not built", status=500)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("ledger.urls")),
    re_path(r"^(?!api/|admin/|static/|assets/).*$", serve_frontend),
]
