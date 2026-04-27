import {
  DashboardIcon,
  PayoutIcon,
  HistoryIcon,
  LedgerIcon,
  ArchitectureIcon,
  ApiIcon,
} from "./Icons";

const NAV_ITEMS = [
  { id: "dashboard", Icon: DashboardIcon, label: "Dashboard" },
  { id: "payouts", Icon: PayoutIcon, label: "Create Payout" },
  { id: "history", Icon: HistoryIcon, label: "Payout History" },
  { id: "ledger", Icon: LedgerIcon, label: "Ledger" },
];

const SYSTEM_ITEMS = [
  { id: "architecture", Icon: ArchitectureIcon, label: "Architecture" },
  { id: "api", Icon: ApiIcon, label: "API Reference" },
];

export default function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">P</div>
          <div className="sidebar-logo-text">
            <h1>Playto Pay</h1>
            <p>Payout Engine</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {NAV_ITEMS.map(({ id, Icon, label }) => (
            <button
              key={id}
              className={`nav-item ${activeSection === id ? "active" : ""}`}
              onClick={() => onNavigate(id)}
            >
              <span className="nav-icon"><Icon size={20} /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="nav-section" style={{ marginTop: "auto" }}>
          <p className="nav-section-label">System</p>
          {SYSTEM_ITEMS.map(({ id, Icon, label }) => (
            <button
              key={id}
              className={`nav-item ${activeSection === id ? "active" : ""}`}
              onClick={() => onNavigate(id)}
            >
              <span className="nav-icon"><Icon size={20} /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="live-status">
          <span className="live-dot" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}
