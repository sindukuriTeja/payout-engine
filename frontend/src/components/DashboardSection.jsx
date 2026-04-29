import BalanceCard from "./BalanceCard";
import PayoutForm from "./PayoutForm";
import PayoutHistory from "./PayoutHistory";
import LedgerTable from "./LedgerTable";
import { WalletIcon, HoldIcon } from "./Icons";

export default function DashboardSection({
  merchants,
  selectedId,
  onSelectMerchant,
  balance,
  payouts,
  ledger,
  onRefresh,
  lastUpdate,
  isLoggedIn,
  onNavigateToLogin,
}) {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Live Dashboard</h2>
          <div className="dashboard-controls">
            <select
              className="merchant-select"
              value={selectedId || ""}
              onChange={(e) => onSelectMerchant(e.target.value)}
            >
              {merchants.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.email}
                </option>
              ))}
            </select>
            <div className="live-indicator">
              <span className="live-dot" />
              <span>Live</span>
            </div>
          </div>
        </div>

        {balance && (
          <div className="balance-grid">
            <BalanceCard
              label="Available Balance"
              paise={balance.available_balance_paise}
              color="available"
              icon={WalletIcon}
            />
            <BalanceCard
              label="Held (Pending Payouts)"
              paise={balance.held_balance_paise}
              color="held"
              icon={HoldIcon}
            />
          </div>
        )}

        <PayoutForm merchantId={selectedId} onSuccess={onRefresh} />
        <PayoutHistory payouts={payouts} isLoggedIn={isLoggedIn} onNavigateToLogin={onNavigateToLogin} />
        <LedgerTable entries={ledger} isLoggedIn={isLoggedIn} onNavigateToLogin={onNavigateToLogin} />
      </div>
    </section>
  );
}
