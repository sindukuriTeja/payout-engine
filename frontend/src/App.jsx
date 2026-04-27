import { useCallback, useEffect, useState } from "react";
import {
  fetchMerchants,
  fetchBalance,
  fetchLedger,
  fetchPayouts,
} from "./api";
import Sidebar from "./components/Sidebar";
import StatsBar from "./components/StatsBar";
import MerchantSelector from "./components/MerchantSelector";
import BalanceCard from "./components/BalanceCard";
import PayoutForm from "./components/PayoutForm";
import PayoutHistory from "./components/PayoutHistory";
import LedgerTable from "./components/LedgerTable";
import ArchitectureView from "./components/ArchitectureView";
import ApiReferenceView from "./components/ApiReferenceView";
import { RefreshIcon, WalletIcon, HoldIcon } from "./components/Icons";

const POLL_INTERVAL = 3000;

const SECTION_META = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Real-time merchant overview",
  },
  payouts: {
    title: "Create Payout",
    subtitle: "Submit a new withdrawal request",
  },
  history: {
    title: "Payout History",
    subtitle: "Track all payout requests",
  },
  ledger: {
    title: "Ledger",
    subtitle: "Complete audit trail",
  },
  architecture: {
    title: "System Architecture",
    subtitle: "Design decisions and patterns",
  },
  api: {
    title: "API Reference",
    subtitle: "REST endpoints documentation",
  },
};

export default function App() {
  const [merchants, setMerchants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [lastUpdate, setLastUpdate] = useState(null);

  // Load merchant list once
  useEffect(() => {
    fetchMerchants().then((data) => {
      setMerchants(data);
      if (data.length > 0) setSelectedId(data[0].id);
    });
  }, []);

  // Refresh data for selected merchant
  const refresh = useCallback(() => {
    if (!selectedId) return;
    fetchBalance(selectedId).then(setBalance).catch(() => {});
    fetchLedger(selectedId).then(setLedger).catch(() => {});
    fetchPayouts(selectedId).then(setPayouts).catch(() => {});
    setLastUpdate(new Date());
  }, [selectedId]);

  // Poll every 3s for live status updates
  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [refresh]);

  const section = SECTION_META[activeSection];

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <h1 className="top-bar-title">{section.title}</h1>
          </div>
          <div className="top-bar-right">
            <div className="realtime-indicator">
              <span className="realtime-dot" />
              <span>Live</span>
            </div>
            {lastUpdate && (
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Updated {new Date().toLocaleTimeString()}
              </span>
            )}
          </div>
        </header>

        <div className="page-content animate-in" key={activeSection}>
          {/* ============ DASHBOARD ============ */}
          {activeSection === "dashboard" && (
            <>
              <MerchantSelector
                merchants={merchants}
                selectedId={selectedId}
                onChange={setSelectedId}
              />

              <StatsBar
                merchants={merchants}
                payouts={payouts}
                balance={balance}
              />

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

              <PayoutForm merchantId={selectedId} onSuccess={refresh} />

              <div style={{ marginTop: "24px" }}>
                <PayoutHistory payouts={payouts} />
              </div>

              <div style={{ marginTop: "24px" }}>
                <LedgerTable entries={ledger} />
              </div>
            </>
          )}

          {/* ============ CREATE PAYOUT ============ */}
          {activeSection === "payouts" && (
            <>
              <MerchantSelector
                merchants={merchants}
                selectedId={selectedId}
                onChange={setSelectedId}
              />

              {balance && (
                <div className="balance-grid" style={{ marginBottom: "24px" }}>
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

              <PayoutForm merchantId={selectedId} onSuccess={refresh} />
            </>
          )}

          {/* ============ HISTORY ============ */}
          {activeSection === "history" && (
            <>
              <MerchantSelector
                merchants={merchants}
                selectedId={selectedId}
                onChange={setSelectedId}
              />
              <PayoutHistory payouts={payouts} />
            </>
          )}

          {/* ============ LEDGER ============ */}
          {activeSection === "ledger" && (
            <>
              <MerchantSelector
                merchants={merchants}
                selectedId={selectedId}
                onChange={setSelectedId}
              />
              <LedgerTable entries={ledger} />
            </>
          )}

          {/* ============ ARCHITECTURE ============ */}
          {activeSection === "architecture" && <ArchitectureView />}

          {/* ============ API REFERENCE ============ */}
          {activeSection === "api" && <ApiReferenceView />}
        </div>
      </main>
    </div>
  );
}
