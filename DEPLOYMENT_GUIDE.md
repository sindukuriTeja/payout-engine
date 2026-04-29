# Payout Engine — Deployment Guide

## Architecture Overview

| Service | Render Type | Purpose |
|---------|-------------|---------|
| `payout-db` | PostgreSQL (Free) | Primary database |
| `payout-redis` | Redis (Free) | Celery broker & result backend |
| `payout-engine-backend` | Web Service (Docker) | Django API + Gunicorn |
| `payout-engine-celery-worker` | Background Worker (Docker) | Celery task processor |
| `payout-engine-frontend` | Static Site | React (Vite) dashboard |

---

## Step 1: Deploy Infrastructure on Render

1. Go to [render.com](https://render.com) and sign in with your GitHub account.
2. Click **New +** (top-right) → **Blueprint**.
3. Select your `payout-engine` repository.
4. Set:
   - **Blueprint Name**: `payout-engine-prod`
   - **Branch**: `main`
5. Click **Apply**. Render will provision all 5 services automatically using `render.yaml`.

Wait for all services to show a green **"Live"** status.

---

## Step 2: Deploy Smart Contract (Blockchain)

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new file and paste the code from `blockchain/PayoutRegistry.sol`.
3. Compile with Solidity `^0.8.0`.
4. Deploy to your target network (e.g., **Sepolia Testnet** or **Polygon**).
5. Copy the deployed **Contract Address**.

---

## Step 3: Set Environment Variables

Go to your Render Dashboard → `payout-engine-backend` → **Environment** tab.

Set these variables (they are marked `sync: false` in the blueprint — you must fill them manually):

| Variable | Value | Description |
|----------|-------|-------------|
| `CONTRACT_ADDRESS` | `0x...` | Your deployed PayoutRegistry contract address |
| `WEB3_PROVIDER_URL` | `https://sepolia.infura.io/v3/YOUR_KEY` | Infura/Alchemy RPC endpoint |
| `PRIVATE_KEY` | `0x...` | Wallet private key for signing on-chain transactions |

These are **auto-configured** by the blueprint (do not change unless needed):

| Variable | Source |
|----------|--------|
| `DATABASE_URL` | Auto-linked from `payout-db` |
| `REDIS_URL` | Auto-linked from `payout-redis` |
| `DJANGO_SECRET_KEY` | Auto-generated |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `*` |

> Also set `CONTRACT_ADDRESS`, `WEB3_PROVIDER_URL`, and `PRIVATE_KEY` on the **celery-worker** service.

---

## Step 4: Verify Deployment

1. All 5 services should show green **"Live"** on the Render dashboard.
2. Click the URL for `payout-engine-frontend` to open the dashboard.
3. Test the flow:
   - Sign up / Sign in
   - Select a merchant
   - Submit a payout
   - Check that the ledger updates (DB) and blockchain recording logs appear in the backend logs.

---

## What Changed for Production

| File | Change |
|------|--------|
| `render.yaml` | Complete rewrite — proper Blueprint syntax with `databases` block, `runtime: docker`, Celery worker, `generateValue` for secret key, `sync: false` for blockchain vars |
| `settings.py` | Uses `dj-database-url` for `DATABASE_URL`, WhiteNoise for static files, `STATIC_ROOT` configured |
| `requirements.txt` | Added `gunicorn`, `whitenoise`, `dj-database-url` |
| `Dockerfile` | Added `collectstatic` build step |
| `entrypoint.sh` | Parses `DATABASE_URL` for health check, uses Gunicorn instead of `runserver` |
| `blockchain_service.py` | Env vars renamed to `CONTRACT_ADDRESS` and `WEB3_PROVIDER_URL` (matching `render.yaml`) |
| `frontend/src/api.js` | Properly constructs full URL from `VITE_API_URL` (Render provides hostname, not full URL) |

---

## Local Development (Unchanged)

```bash
docker compose up --build
```

The `DATABASE_URL` env var won't be set locally, so `dj-database-url` falls back to SQLite. The Docker Compose setup continues to work as before with PostgreSQL via the individual `POSTGRES_*` vars.

---

## Cost

All services use Render's **Free Tier**:
- Free PostgreSQL: 256 MB storage, expires after 90 days
- Free Redis: 25 MB
- Free Web Service: 750 hours/month
- Free Static Site: unlimited
- Free Background Worker: 750 hours/month
