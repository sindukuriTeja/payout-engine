import { useState } from "react";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          <div className="navbar-logo-icon">P</div>
          <span className="navbar-logo-text">Playto Pay</span>
        </a>

        <div className="navbar-links">
          <button 
            className={`navbar-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => setActiveLink("home")}
          >
            Home
          </button>
          <button 
            className={`navbar-link ${activeLink === "products" ? "active" : ""}`}
            onClick={() => setActiveLink("products")}
          >
            Products
          </button>
          <button 
            className={`navbar-link ${activeLink === "solutions" ? "active" : ""}`}
            onClick={() => setActiveLink("solutions")}
          >
            Solutions
          </button>
          <button 
            className={`navbar-link ${activeLink === "developers" ? "active" : ""}`}
            onClick={() => setActiveLink("developers")}
          >
            Developers
          </button>
          <button 
            className={`navbar-link ${activeLink === "resources" ? "active" : ""}`}
            onClick={() => setActiveLink("resources")}
          >
            Resources
          </button>
        </div>

        <div className="navbar-actions">
          <button className="navbar-btn navbar-btn-secondary">Sign in</button>
          <button className="navbar-btn navbar-btn-primary">Start now →</button>
        </div>
      </div>
    </nav>
  );
}
