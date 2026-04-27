export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">P</div>
              <span className="footer-logo-text">Playto Pay</span>
            </div>
            <p className="footer-tagline">
              Financial infrastructure for payouts. Built for reliability with 
              enterprise-grade architecture.
            </p>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <ul className="footer-links">
              <li><a href="#">Payouts</a></li>
              <li><a href="#">Balance</a></li>
              <li><a href="#">Ledger</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Developers</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Architecture</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Playto Pay. All rights reserved.
          </p>
          <div className="footer-status">
            <span className="live-dot" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
