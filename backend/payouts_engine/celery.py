import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "payouts_engine.settings")

app = Celery("payouts_engine")
app.config_from_object("django.conf:settings", namespace="CELERY")

if not os.environ.get("REDIS_URL"):
    app.conf.broker_url = "memory://"
    app.conf.result_backend = "cache+memory://"

app.autodiscover_tasks()
