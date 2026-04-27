import { LedgerIcon, ArrowUpIcon, ArrowDownIcon, EmptyIcon } from "./Icons";

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

export default function LedgerTable({ entries }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">
          <LedgerIcon size={20} />
          Ledger Entries
        </h3>
        <span className="table-count">{entries.length} entries</span>
      </div>

      {entries.length === 0 ? (
        <div className="table-empty">
          <div className="table-empty-icon">
            <EmptyIcon size={56} />
          </div>
          <p>No ledger entries yet.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>
                    <span className={`badge ${e.entry_type.toLowerCase()}`}>
                      {e.entry_type === "CREDIT" ? (
                        <><ArrowUpIcon size={12} /> CREDIT</>
                      ) : (
                        <><ArrowDownIcon size={12} /> DEBIT</>
                      )}
                    </span>
                  </td>
                  <td style={{
                    fontWeight: 700,
                    color: e.entry_type === "CREDIT" ? "var(--green-600)" : "var(--red-600)",
                  }}>
                    {e.entry_type === "CREDIT" ? "+" : "−"}
                    {formatINR(e.amount_paise)}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{e.description}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {timeAgo(e.created_at)}
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
