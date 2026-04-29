const VITE_URL = import.meta.env.VITE_API_URL;
const API_BASE = VITE_URL
  ? `https://${VITE_URL}/api/v1`
  : "/api/v1";

export async function fetchMerchants() {
  const res = await fetch(`${API_BASE}/merchants/`);
  if (!res.ok) throw new Error("Failed to fetch merchants");
  return res.json();
}

export async function fetchBalance(merchantId) {
  const res = await fetch(`${API_BASE}/merchants/${merchantId}/balance/`);
  if (!res.ok) throw new Error("Failed to fetch balance");
  return res.json();
}

export async function fetchLedger(merchantId) {
  const res = await fetch(`${API_BASE}/merchants/${merchantId}/ledger/`);
  if (!res.ok) throw new Error("Failed to fetch ledger");
  return res.json();
}

export async function fetchPayouts(merchantId) {
  const res = await fetch(`${API_BASE}/merchants/${merchantId}/payouts/`);
  if (!res.ok) throw new Error("Failed to fetch payouts");
  return res.json();
}

export async function fetchProfile() {
  return {
    name: "Teja Sindukuri",
    email: "teja@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teja",
    bio: "Blockchain developer and Payout Engine creator.",
    wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  };
}

export async function createPayout(merchantId, amountPaise, bankAccountId) {
  const idempotencyKey = crypto.randomUUID();
  const res = await fetch(`${API_BASE}/payouts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount_paise: amountPaise,
      bank_account_id: bankAccountId,
    }),
  });

  const data = await res.json();
  return { status: res.status, data };
}
