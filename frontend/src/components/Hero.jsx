export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Live System</span>
          </div>
          
          <h1 className="hero-title">
            Financial infrastructure for{" "}
            <span className="hero-title-gradient">payouts</span>
          </h1>
          
          <p className="hero-subtitle">
            Real-time balance tracking, instant payouts, and complete audit trail. 
            Built for reliability with enterprise-grade infrastructure. Accept payments, 
            manage balances, and withdraw to Indian bank accounts seamlessly.
          </p>
          
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary">
              Start now →
            </button>
            <button className="hero-btn hero-btn-secondary">
              Contact sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
