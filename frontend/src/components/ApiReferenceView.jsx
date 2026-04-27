import { ApiIcon } from "./Icons";

export default function ApiReferenceView() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/merchants/",
      desc: "List all merchants with their details",
      response: `[
  {
    "id": "uuid",
    "name": "Acme Digital Agency",
    "email": "finance@acmedigital.in",
    "created_at": "2025-01-15T10:30:00Z"
  }
]`,
    },
    {
      method: "GET",
      path: "/api/v1/merchants/{id}/balance/",
      desc: "Get merchant's available and held balance (DB-level aggregate)",
      response: `{
  "merchant_id": "uuid",
  "available_balance_paise": 745000,
  "held_balance_paise": 100000
}`,
    },
    {
      method: "POST",
      path: "/api/v1/payouts/",
      desc: "Create a new payout request. Requires Idempotency-Key header (UUID). Locks merchant row, checks balance, creates DEBIT entry atomically.",
      headers: "Idempotency-Key: <uuid>",
      body: `{
  "merchant_id": "uuid",
  "amount_paise": 100000,
  "bank_account_id": "HDFC00012345"
}`,
      response: `{
  "id": "uuid",
  "merchant_id": "uuid",
  "amount_paise": 100000,
  "bank_account_id": "HDFC00012345",
  "status": "PENDING",
  "created_at": "2025-03-15T14:20:00Z"
}`,
    },
    {
      method: "GET",
      path: "/api/v1/merchants/{id}/payouts/",
      desc: "List payout history for a merchant (latest 50)",
      response: `[
  {
    "id": "uuid",
    "amount_paise": 100000,
    "bank_account_id": "HDFC00012345",
    "status": "COMPLETED",
    "attempts": 1,
    "created_at": "...",
    "updated_at": "..."
  }
]`,
    },
    {
      method: "GET",
      path: "/api/v1/merchants/{id}/ledger/",
      desc: "List ledger entries (CREDIT/DEBIT) for a merchant (latest 50)",
      response: `[
  {
    "id": "uuid",
    "entry_type": "DEBIT",
    "amount_paise": 100000,
    "description": "Payout hold #a1b2c3d4",
    "payout_id": "uuid",
    "created_at": "..."
  }
]`,
    },
  ];

  const methodColors = {
    GET: { bg: "var(--green-100)", color: "var(--green-600)" },
    POST: { bg: "var(--blue-100)", color: "var(--blue-600)" },
  };

  return (
    <div className="animate-in">
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-body">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <ApiIcon size={20} /> REST API Reference
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
            All endpoints are served by Django REST Framework at <code style={{ color: "var(--indigo-500)" }}>http://localhost:8000</code>.
            The frontend proxies <code style={{ color: "var(--indigo-500)" }}>/api</code> through Vite dev server.
          </p>
        </div>
      </div>

      {endpoints.map((ep, i) => (
        <div key={i} className="card" style={{ marginBottom: "16px" }}>
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span style={{
                padding: "4px 12px",
                borderRadius: "6px",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                background: methodColors[ep.method].bg,
                color: methodColors[ep.method].color,
              }}>
                {ep.method}
              </span>
              <code style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {ep.path}
              </code>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 14px 0", lineHeight: 1.6 }}>
              {ep.desc}
            </p>

            {ep.headers && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px 0" }}>
                  Required Header
                </p>
                <pre style={{ margin: 0, padding: "12px 16px", fontSize: "0.78rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", overflow: "auto" }}>
                  {ep.headers}
                </pre>
              </div>
            )}

            {ep.body && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px 0" }}>
                  Request Body
                </p>
                <pre style={{ margin: 0, padding: "12px 16px", fontSize: "0.78rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", overflow: "auto" }}>
                  {ep.body}
                </pre>
              </div>
            )}

            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px 0" }}>
                Response
              </p>
              <pre style={{ margin: 0, padding: "12px 16px", fontSize: "0.78rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", overflow: "auto" }}>
                {ep.response}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
