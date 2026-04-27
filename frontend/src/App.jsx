import { useCallback, useEffect, useState } from "react";
import {
  fetchMerchants,
  fetchBalance,
  fetchLedger,
  fetchPayouts,
} from "./api";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import DashboardSection from "./components/DashboardSection";
import Footer from "./components/Footer";

const POLL_INTERVAL = 3000;

export default function App() {
  const [merchants, setMerchants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [payouts, setPayouts] = useState([]);
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

  return (
    <div className="app">
      <Navbar />
      
      <main>
        <Hero />
        <StatsSection payouts={payouts} balance={balance} />
        <FeaturesSection />
        
        <DashboardSection
          merchants={merchants}
          selectedId={selectedId}
          onSelectMerchant={setSelectedId}
          balance={balance}
          payouts={payouts}
          ledger={ledger}
          onRefresh={refresh}
          lastUpdate={lastUpdate}
        />
      </main>
      
      <Footer />
    </div>
  );
}
