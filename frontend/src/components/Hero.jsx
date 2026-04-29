import { useEffect, useState } from "react";

const transactionTexts = [
  { to: "Ravi Kumar", amount: "₹25,000", status: "Completed", method: "IMPS" },
  { to: "Priya Sharma", amount: "₹18,500", status: "Processing", method: "NEFT" },
  { to: "Amit Patel", amount: "₹42,000", status: "Completed", method: "UPI" },
  { to: "Neha Singh", amount: "₹9,750", status: "Completed", method: "RTGS" },
  { to: "Suresh Reddy", amount: "₹31,200", status: "Processing", method: "IMPS" },
];

const floatingStats = [
  { label: "Success Rate", value: "99.9%" },
  { label: "Avg. Speed", value: "< 2s" },
  { label: "Uptime", value: "99.99%" },
];

function AnimatedTransaction({ transaction, index }) {
  return (
    <div
      className="hero-anim-transaction"
      style={{ animationDelay: `${index * 1.8}s` }}
    >
      <div className="hero-anim-tx-row">
        <div className="hero-anim-tx-avatar">
          {transaction.to.charAt(0)}
        </div>
        <div className="hero-anim-tx-details">
          <span className="hero-anim-tx-name">{transaction.to}</span>
          <span className="hero-anim-tx-method">{transaction.method}</span>
        </div>
        <div className="hero-anim-tx-right">
          <span className="hero-anim-tx-amount">{transaction.amount}</span>
          <span className={`hero-anim-tx-status ${transaction.status.toLowerCase()}`}>
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countUp, setCountUp] = useState({ payouts: 0, volume: 0, merchants: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % transactionTexts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targets = { payouts: 12847, volume: 245, merchants: 186 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountUp({
        payouts: Math.floor(targets.payouts * eased),
        volume: Math.floor(targets.volume * eased),
        merchants: Math.floor(targets.merchants * eased),
      });
      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero-particle" style={{
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + i * 0.5}s`,
          }} />
        ))}
      </div>

      <div className="hero-container hero-split">
        <div className="hero-content">
          <span className="section-label">Infrastructure for the Future</span>
          <h1 className="hero-title hero-title-main">
            Solving the world's most complex{" "}
            <span className="hero-title-gradient hero-title-typewriter">payouts</span>
          </h1>

          <p className="hero-subtitle">
            We've fixed the real-world friction of cross-border payments. By combining 
            <strong> immutable blockchain records</strong> with <strong>atomic tax compliance</strong>, 
            we provide a payout engine that is faster, safer, and 100% transparent for businesses and freelancers.
          </p>

          <div className="hero-counter-strip">
            <div className="hero-counter">
              <span className="hero-counter-value">{countUp.payouts.toLocaleString()}</span>
              <span className="hero-counter-label">Payouts Processed</span>
            </div>
            <div className="hero-counter-divider" />
            <div className="hero-counter">
              <span className="hero-counter-value">₹{countUp.volume}Cr</span>
              <span className="hero-counter-label">Volume Moved</span>
            </div>
            <div className="hero-counter-divider" />
            <div className="hero-counter">
              <span className="hero-counter-value">{countUp.merchants}+</span>
              <span className="hero-counter-label">Merchants</span>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="hero-btn hero-btn-primary hover-lift"
              onClick={() => onNavigate("signup")}
            >
              Start now →
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-glow" />

          <div className="hero-anim-card">
            <div className="hero-anim-card-header">
              <div className="hero-anim-card-dot green" />
              <span className="hero-anim-card-title">Live Payout Feed</span>
              <span className="hero-anim-pulse-dot" />
            </div>

            <div className="hero-anim-transactions">
              {transactionTexts.map((tx, i) => (
                <AnimatedTransaction
                  key={tx.to}
                  transaction={tx}
                  index={i}
                />
              ))}
            </div>

            <div className="hero-anim-card-footer">
              <span className="hero-anim-footer-text">Processing in real-time</span>
              <div className="hero-anim-progress">
                <div className="hero-anim-progress-bar" />
              </div>
            </div>
          </div>

          {floatingStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`hero-floating-stat hero-floating-stat-${i}`}
            >
              <span className="hero-floating-stat-value">{stat.value}</span>
              <span className="hero-floating-stat-label">{stat.label}</span>
            </div>
          ))}

          <div className="hero-floating-icon hero-floating-icon-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div className="hero-floating-icon hero-floating-icon-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="hero-floating-icon hero-floating-icon-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );

}
