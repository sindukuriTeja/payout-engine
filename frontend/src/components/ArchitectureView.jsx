import {
  ArchitectureIcon,
  PayoutIcon,
  LockIcon,
  DatabaseIcon,
  KeyIcon,
  RepeatIcon,
  FileTextIcon,
  AlertTriangleIcon,
  ShieldIcon,
} from "./Icons";

export default function ArchitectureView() {
  return (
    <div className="animate-in">
      {/* Tech Stack */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-body">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldIcon size={20} /> Technology Stack
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Django 5.1", "Django REST Framework", "PostgreSQL 16", "Celery 5.4", "Redis 7", "React 18", "Tailwind CSS", "Docker Compose"].map(tech => (
              <span key={tech} style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 500,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-body">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <ArchitectureIcon size={20} /> System Architecture
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 14px 0", lineHeight: 1.6 }}>
            The API layer validates input and delegates to <code style={{ color: "var(--indigo-500)" }}>services.py</code>,
            which owns every balance mutation. Celery handles async bank settlement outside the request cycle.
          </p>
          <pre style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            overflow: "auto",
            fontFamily: "monospace",
          }}>{`
  ┌─────────────┐     POST /payouts/      ┌────────────────┐
  │   React UI  │ ──────────────────────▶ │  Django + DRF  │
  │  (3s poll)  │ ◀────────────────────── │   (API layer)  │
  └─────────────┘     JSON responses      └───────┬────────┘
                                                    │
                                     services.py    │  SELECT FOR UPDATE
                                     (critical      │  + transaction.atomic
                                      path)         │
                                                    ▼
  ┌─────────────┐   task dispatch     ┌────────────────┐
  │   Celery    │ ◀─ on_commit ───── │   PostgreSQL    │
  │   Worker    │                     │                 │
  │             │ ── settle/fail ──▶  │  merchants      │
  │  Beat (10s) │   (SELECT FOR UP)   │  ledger_entries │
  └─────────────┘                     │  payouts        │
         │                            │  idempotency    │
         ▼                            └────────────────┘
    Simulated bank
    (70/20/10 split)
`}</pre>
        </div>
      </div>

      {/* State Machine */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-body">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <RepeatIcon size={20} /> Payout State Machine
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 14px 0", lineHeight: 1.6 }}>
            Enforced at the model level — every code path (API, Celery, shell) goes through the same check.
            No backward transitions allowed.
          </p>
          <pre style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            overflow: "auto",
            fontFamily: "monospace",
          }}>{`
  ┌─────────┐       ┌────────────┐       ┌───────────┐
  │ PENDING │ ────▶ │ PROCESSING │ ────▶ │ COMPLETED │
  └─────────┘       └────────────┘       └───────────┘
                           │
                           └────────────▶ ┌────────┐
                                          │ FAILED │
                                          └────────┘
                                          + funds returned
                                          atomically
`}</pre>
        </div>
      </div>

      {/* Design Decisions Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        {[
          {
            icon: PayoutIcon,
            title: "Money as Integers (Paise)",
            desc: "All amounts stored as BigInteger paise (1/100 rupee). Floats break money — 0.1 + 0.2 ≠ 0.3 in IEEE 754. Integers eliminate rounding errors entirely.",
            color: "var(--indigo-500)",
          },
          {
            icon: LockIcon,
            title: "SELECT FOR UPDATE Locking",
            desc: "Row-level exclusive lock on the merchant row serializes all balance mutations. Two simultaneous ₹60 payouts on ₹100 balance — exactly one succeeds.",
            color: "var(--green-500)",
          },
          {
            icon: DatabaseIcon,
            title: "DB-Level Balance (Not Python)",
            desc: "Balance is a single SQL aggregate. No Python arithmetic, no stale data, no TOCTOU race conditions. The aggregate runs against the same locked snapshot.",
            color: "var(--indigo-500)",
          },
          {
            icon: KeyIcon,
            title: "Idempotency Keys",
            desc: "Client sends UUID Idempotency-Key header. Server checks (key, merchant) inside the same SELECT FOR UPDATE lock. Keys expire after 24 hours.",
            color: "var(--green-500)",
          },
          {
            icon: RepeatIcon,
            title: "Retry with Exponential Backoff",
            desc: "Simulated bank has 10% hang rate. Celery Beat sweeps every 10s for stuck payouts. Backoff: 30s → 60s → 120s. After 3 attempts, payout fails permanently.",
            color: "var(--yellow-500)",
          },
          {
            icon: FileTextIcon,
            title: "Append-Only Ledger",
            desc: "Ledger entries are never updated or deleted. Payout creation → DEBIT. Payout failure → CREDIT return. Balance is always derivable from the ledger.",
            color: "var(--green-500)",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="card" style={{ borderLeft: `3px solid ${color}` }}>
            <div className="card-body">
              <h4 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 600, margin: "0 0 8px 0" }}>
                <Icon size={18} /> {title}
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Known Limitations */}
      <div className="card">
        <div className="card-body">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <AlertTriangleIcon size={20} /> Known Limitations (Demo)
          </h3>
          <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <li><strong>No auth</strong> — any client can create payouts for any merchant (intentional for demo)</li>
            <li><strong>Single-process Celery</strong> — one worker with 4 threads; production would use multiple workers</li>
            <li><strong>No monitoring</strong> — no Prometheus, no structured logging, no alerting</li>
            <li><strong>Polling frontend</strong> — 3s polling; production would use WebSockets or SSE</li>
            <li><strong>Simulated bank</strong> — 70/20/10 success/fail/hang split instead of real NEFT/IMPS/UPI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
