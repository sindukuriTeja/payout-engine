#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
while ! python -c "
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(1)
s.connect(('db', 5432))
s.close()
" 2>/dev/null; do
    sleep 1
done
echo "PostgreSQL ready."

echo "Running migrations..."
python manage.py makemigrations ledger
python manage.py migrate --noinput

echo "Seeding data..."
python manage.py seed_data

echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000
