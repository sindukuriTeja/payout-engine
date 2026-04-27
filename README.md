# Playto Payout Engine

Minimal payout engine for Playto Pay. Merchants accumulate balance from international customer payments and withdraw to Indian bank accounts.

## Quick Start

```bash
docker compose up --build
```

This starts:
- **PostgreSQL** on port 5432
- **Redis** on port 6379
- **Django API** on http://localhost:8000
- **Celery worker** (4 threads) + **Celery beat** (10s interval)
- **React dashboard** on http://localhost:5173

Three merchants are seeded automatically with credit history.

## API

### Create Payout
```bash
curl -X POST http://localhost:8000/api/v1/payouts/ \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{
    "merchant_id": "<uuid>",
    "amount_paise": 100000,
    "bank_account_id": "HDFC00012345"
  }'
```

### Get Balance
```bash
curl http://localhost:8000/api/v1/merchants/<uuid>/balance/
```

### List Merchants
```bash
curl http://localhost:8000/api/v1/merchants/
```

### Payout History
```bash
curl http://localhost:8000/api/v1/merchants/<uuid>/payouts/
```

### Ledger Entries
```bash
curl http://localhost:8000/api/v1/merchants/<uuid>/ledger/
```

## Architecture

See [EXPLAINER.md](./EXPLAINER.md) for detailed design decisions on:
- Money integrity (BigInteger paise, DB-level aggregation)
- Concurrency control (SELECT FOR UPDATE)
- Idempotency (merchant-scoped keys, 24h TTL)
- State machine enforcement
- Retry logic with exponential backoff

## Stack

| Component | Technology |
|-----------|-----------|
| Backend | Django 5.1 + DRF |
| Database | PostgreSQL 16 |
| Task Queue | Celery 5.4 + Redis |
| Frontend | React 18 + Tailwind CSS |
| Containerization | Docker Compose |
