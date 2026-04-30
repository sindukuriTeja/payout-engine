#!/bin/bash
set -e

echo "Waiting for database..."
python -c "
import os, time, urllib.parse, socket
url = os.environ.get('DATABASE_URL', '')
if url:
    if url.startswith('sqlite'):
        print('Using SQLite, skipping network check.')
        exit(0)
    parsed = urllib.parse.urlparse(url)
    host, port = parsed.hostname, parsed.port or 5432
else:
    host = os.environ.get('POSTGRES_HOST', '')
    port = int(os.environ.get('POSTGRES_PORT', '5432'))

if not host:
    print('No database host configured, skipping network check.')
    exit(0)

print(f'Checking connection to {host}:{port}...')
for i in range(1, 31):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2)
        s.connect((host, port))
        s.close()
        print('Database is up!')
        break
    except Exception:
        print(f'Database not ready... (attempt {i})')
        time.sleep(2)
"
echo "Database check complete."

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Re-copy frontend build AFTER collectstatic so it doesn't get clobbered
echo "Copying frontend build..."
cp -r /frontend/dist/* staticfiles/frontend/

echo "Seeding data..."
python manage.py seed_data || true

echo "Starting Gunicorn..."
exec gunicorn payouts_engine.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --threads 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
