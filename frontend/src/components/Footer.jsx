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
              Financial infrastructure for the internet economy. Powering payouts for
              50,000+ businesses across 190 countries.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="footer-social-link" aria-label="GitHub">GH</a>
              <a href="#" className="footer-social-link" aria-label="Discord">DC</a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">IN</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <ul className="footer-links">
              <li><a href="#">Payouts</a></li>
              <li><a href="#">Connect</a></li>
              <li><a href="#">Balance</a></li>
              <li><a href="#">Ledger</a></li>
              <li><a href="#">Radar</a></li>
              <li><a href="#">Tax</a></li>
              <li><a href="#">Identity</a></li>
              <li><a href="#">Reporting</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li><a href="#">E-commerce</a></li>
              <li><a href="#">SaaS</a></li>
              <li><a href="#">Marketplaces</a></li>
              <li><a href="#">Gig Economy</a></li>
              <li><a href="#">Fintech</a></li>
              <li><a href="#">Creator Economy</a></li>
              <li><a href="#">Insurance</a></li>
              <li><a href="#">Enterprise</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Developers</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">SDKs & Libraries</a></li>
              <li><a href="#">CLI</a></li>
              <li><a href="#">Webhooks</a></li>
              <li><a href="#">Sandbox</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Guides</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">Learning Paths</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Status Page</a></li>
              <li><a href="#">Contact Sales</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Playto Pay. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-status">
            <span className="live-dot" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
