import { HistoryIcon, EmptyIcon } from "./Icons";

function formatINR(paise) {
  const rupees = Math.floor(paise / 100);
  const p = paise % 100;
  return `₹${rupees.toLocaleString("en-IN")}.${String(p).padStart(2, "0")}`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function StatusBadge({ status }) {
  const statusLower = status.toLowerCase();
  return (
    <span className={`badge ${statusLower}`}>
      {status === "PROCESSING" && (
        <span className="live-dot" style={{ width: 6, height: 6 }} />
      )}
      {status}
    </span>
  );
}

export default function PayoutHistory({ payouts }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">
          <HistoryIcon size={20} />
          Payout History
        </h3>
        <span className="table-count">{payouts.length} records</span>
      </div>

      {payouts.length === 0 ? (
        <div className="table-empty">
          <div className="table-empty-icon">
            <EmptyIcon size={56} />
          </div>
          <p>No payouts yet — submit one to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Bank Account</th>
                <th>Status</th>
                <th>Attempts</th>
                <th>Created</th>
              </tr>

            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td style={{ 
                    fontFamily: "monospace", 
                    fontSize: "0.82rem", 
                    color: "var(--stripe-purple)" 
                  }}>
                    {p.id.slice(0, 8)}…
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {formatINR(p.amount_paise)}
                  </td>
                  <td style={{ color: "var(--status-failed-text)" }}>
                    {formatINR(p.tax_paise || (p.amount_paise * 0.05))}
                  </td>
                  <td>{p.bank_account_id}</td>

                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>{p.attempts}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {timeAgo(p.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
