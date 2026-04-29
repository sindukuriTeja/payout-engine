import { useCallback, useEffect, useState } from "react";
import {
  fetchMerchants,
  fetchBalance,
  fetchLedger,
  fetchPayouts,
} from "./api";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ComparisonSection from "./components/ComparisonSection";
import ProblemSolution from "./components/ProblemSolution";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import DashboardSection from "./components/DashboardSection";
import ResearchGapsSection from "./components/ResearchGapsSection";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";

import SolutionsPage from "./components/SolutionsPage";
import DevelopersPage from "./components/DevelopersPage";
import ResourcesPage from "./components/ResourcesPage";
import ResearchGaps from "./components/ResearchGaps";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

const POLL_INTERVAL = 3000;

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
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

  const handleSignIn = (userData) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <ProductsPage onNavigate={setCurrentPage} />;
      case "solutions":
        return <SolutionsPage />;
      case "developers":
        return <DevelopersPage />;
      case "resources":
        return <ResourcesPage />;
      case "research":
        return <ResearchGaps />;
      case "profile":
        return <ProfilePage user={user} />;
      case "signin":

        return (
          <SignInPage 
            onSignIn={handleSignIn} 
            onSwitchToSignUp={() => setCurrentPage("signup")}
          />
        );
      case "signup":
        return (
          <SignUpPage 
            onSignUp={handleSignUp} 
            onSwitchToSignIn={() => setCurrentPage("signin")}
          />
        );
      default:
        return (
          <main>
            <Hero onNavigate={setCurrentPage} />
            <ProblemSolution />
            <ComparisonSection />
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
              isLoggedIn={!!user}
              onNavigateToLogin={() => setCurrentPage("signin")}
            />
          </main>
        );
    }
  };

  const showNavbarAndFooter = !["signin", "signup"].includes(currentPage);

  return (
    <div className="app">
      {showNavbarAndFooter && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          user={user}
          onSignOut={handleSignOut}
        />
      )}
      
      {renderPage()}
      
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}
