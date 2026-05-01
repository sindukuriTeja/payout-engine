const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.error || `Request failed: ${res.status}`);
    error.status = res.status;
    error.data = errorData;
    throw error;
  }
  return res.json();
}

export async function fetchMerchants() {
  return apiRequest("/merchants/");
}

export async function fetchBalance(merchantId) {
  return apiRequest(`/merchants/${merchantId}/balance/`);
}

export async function fetchLedger(merchantId) {
  return apiRequest(`/merchants/${merchantId}/ledger/`);
}

export async function fetchPayouts(merchantId) {
  return apiRequest(`/merchants/${merchantId}/payouts/`);
}

export async function fetchProfile() {
  return {
    name: "Teja Sindukuri",
    email: "teja@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teja",
    bio: "Blockchain developer and Payout Engine creator.",
    wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
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
