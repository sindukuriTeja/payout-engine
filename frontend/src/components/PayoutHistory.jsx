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

export default function PayoutHistory({ payouts, isLoggedIn, onNavigateToLogin }) {
  const downloadCSV = () => {
    if (!isLoggedIn) {
      onNavigateToLogin();
      return;
    }

    const headers = ["ID", "Amount (Paise)", "Tax (Paise)", "Bank Account", "Status", "Attempts", "Created"];
    const rows = payouts.map(p => [
      p.id,
      p.amount_paise,
      p.tax_paise || (p.amount_paise * 0.05),
      p.bank_account_id,
      p.status,
      p.attempts,
      p.created_at
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `payout_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">
          <HistoryIcon size={20} />
          Payout History
        </h3>
        <div className="flex items-center space-x-4">
          <button 
            onClick={downloadCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm"
          >
            <span>↓ Download CSV</span>
          </button>
          <span className="table-count">{payouts.length} records</span>
        </div>
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
