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

export default function LedgerTable({ entries, isLoggedIn, onNavigateToLogin }) {
  const downloadSingle = (e) => {
    if (!isLoggedIn) {
      onNavigateToLogin();
      return;
    }

    const content = `
LEDGER VOUCHER
---------------------------
Entry ID: ${e.id}
Type: ${e.entry_type}
Date: ${e.created_at}

Amount: ${formatINR(e.amount_paise)}
Description: ${e.description}

Verification: Recorded in Internal Ledger
Audit Status: Cleared
---------------------------
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ledger_${e.id.slice(0, 8)}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSV = () => {
    if (!isLoggedIn) {
      onNavigateToLogin();
      return;
    }

    const headers = ["ID", "Type", "Amount (Paise)", "Description", "Created"];
    const rows = entries.map(e => [
      e.id,
      e.entry_type,
      e.amount_paise,
      e.description,
      e.created_at
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ledger_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">
          <LedgerIcon size={20} />
          Ledger Entries
        </h3>
        <div className="flex items-center space-x-4">
          <button 
            onClick={downloadCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"
          >
            <span>↓ Download Ledger CSV</span>
          </button>
          <span className="table-count">{entries.length} entries</span>
        </div>
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
                <th style={{ textAlign: "right" }}>Action</th>
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
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => downloadSingle(e)}
                      className="p-2 hover:bg-emerald-50 text-emerald-400 hover:text-emerald-600 rounded-lg transition-colors"
                      title="Download Voucher"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
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
