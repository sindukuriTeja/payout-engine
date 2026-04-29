export default function Navbar({ currentPage, setCurrentPage, user, onSignOut }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button 
          className="navbar-logo"
          onClick={() => setCurrentPage("home")}
        >
          <div className="navbar-logo-icon">P</div>
          <span className="navbar-logo-text">Playto Pay</span>
        </button>

        <div className="navbar-links">
          <button 
            className={`navbar-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </button>
          <button 
            className={`navbar-link ${currentPage === "products" ? "active" : ""}`}
            onClick={() => setCurrentPage("products")}
          >
            Products
          </button>
          <button 
            className={`navbar-link ${currentPage === "solutions" ? "active" : ""}`}
            onClick={() => setCurrentPage("solutions")}
          >
            Solutions
          </button>
          <button 
            className={`navbar-link ${currentPage === "developers" ? "active" : ""}`}
            onClick={() => setCurrentPage("developers")}
          >
            Developers
          </button>
          <button 
            className={`navbar-link ${currentPage === "resources" ? "active" : ""}`}
            onClick={() => setCurrentPage("resources")}
          >
            Resources
          </button>
          <button 
            className={`navbar-link ${currentPage === "profile" ? "active" : ""}`}
            onClick={() => setCurrentPage("profile")}
          >
            Profile
          </button>

        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <button 
                className="navbar-user"
                onClick={() => setCurrentPage("profile")}
                title={user.name}
              >
                <div className="navbar-user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              <button className="navbar-btn navbar-btn-secondary" onClick={onSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button 
                className="navbar-btn navbar-btn-secondary"
                onClick={() => setCurrentPage("signin")}
              >
                Sign in
              </button>
              <button 
                className="navbar-btn navbar-btn-primary"
                onClick={() => setCurrentPage("signup")}
              >
                Start now →
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
