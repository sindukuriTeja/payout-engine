#!/bin/bash
set -e

echo "Waiting for database..."
python -c "
import os, time, urllib.parse
url = os.environ.get('DATABASE_URL', '')
if url:
    parsed = urllib.parse.urlparse(url)
    host, port = parsed.hostname, parsed.port or 5432
else:
    host = os.environ.get('POSTGRES_HOST', 'db')
    port = int(os.environ.get('POSTGRES_PORT', '5432'))

import socket
for i in range(30):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2)
        s.connect((host, port))
        s.close()
        break
    except Exception:
        time.sleep(1)
"
echo "Database ready."

echo "Running migrations..."
python manage.py migrate --noinput

echo "Seeding data..."
python manage.py seed_data || true

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn payouts_engine.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
