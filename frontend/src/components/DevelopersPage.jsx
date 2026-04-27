import { useState } from "react";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLanguage, setSelectedLanguage] = useState("node");

  const codeExamples = {
    node: `// Create a payout
const payout = await payouts.create({
  amount: 1000,
  currency: 'usd',
  destination: 'acct_1234567890',
  description: 'Vendor payment for Order #12345'
});

console.log(payout.id); // po_abc123`,
    python: `# Create a payout
payout = payouts.create(
  amount=1000,
  currency='usd',
  destination='acct_1234567890',
  description='Vendor payment for Order #12345'
)

print(payout.id)  # po_abc123`,
    ruby: `# Create a payout
payout = Payouts.create(
  amount: 1000,
  currency: 'usd',
  destination: 'acct_1234567890',
  description: 'Vendor payment for Order #12345'
)

puts payout.id # po_abc123`,
    go: `// Create a payout
params := &payouts.PayoutParams{
  Amount:      1000,
  Currency:    "usd",
  Destination: "acct_1234567890",
  Description: "Vendor payment for Order #12345",
}

payout, _ := payouts.New(params)
fmt.Println(payout.ID) // po_abc123`
  };

  const sdks = [
    { name: "Node.js", id: "node", icon: "⬢", version: "4.2.0" },
    { name: "Python", id: "python", icon: "🐍", version: "5.1.0" },
    { name: "Ruby", id: "ruby", icon: "💎", version: "3.0.0" },
    { name: "Go", id: "go", icon: "🔵", version: "2.1.0" }
  ];

  const apiEndpoints = [
    { method: "POST", path: "/v1/payouts", description: "Create a new payout" },
    { method: "GET", path: "/v1/payouts/:id", description: "Retrieve a payout" },
    { method: "GET", path: "/v1/payouts", description: "List all payouts" },
    { method: "POST", path: "/v1/payouts/:id/cancel", description: "Cancel a payout" },
    { method: "GET", path: "/v1/balance", description: "Retrieve balance" },
    { method: "GET", path: "/v1/ledger/entries", description: "List ledger entries" }
  ];

  const webhookEvents = [
    { event: "payout.created", description: "Occurs when a payout is created" },
    { event: "payout.processing", description: "Occurs when a payout starts processing" },
    { event: "payout.completed", description: "Occurs when a payout succeeds" },
    { event: "payout.failed", description: "Occurs when a payout fails" },
    { event: "balance.updated", description: "Occurs when balance changes" }
  ];

  return (
    <div className="developers-page">
      <section className="developers-hero">
        <div className="developers-hero-container">
          <span className="developers-badge">Developers</span>
          <h1 className="developers-hero-title">
            Build with <span className="gradient-text">powerful APIs</span>
          </h1>
          <p className="developers-hero-subtitle">
            Comprehensive documentation, SDKs, and tools to integrate payouts into your application in minutes.
          </p>
          <div className="developers-hero-actions">
            <button className="btn btn-primary">Get API Keys</button>
            <button className="btn btn-secondary">Read Documentation</button>
          </div>
        </div>
      </section>

      <section className="developers-content">
        <div className="developers-content-container">
          <div className="developers-tabs">
            <button 
              className={`developers-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`developers-tab ${activeTab === "api" ? "active" : ""}`}
              onClick={() => setActiveTab("api")}
            >
              API Reference
            </button>
            <button 
              className={`developers-tab ${activeTab === "sdks" ? "active" : ""}`}
              onClick={() => setActiveTab("sdks")}
            >
              SDKs
            </button>
            <button 
              className={`developers-tab ${activeTab === "webhooks" ? "active" : ""}`}
              onClick={() => setActiveTab("webhooks")}
            >
              Webhooks
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="developers-overview">
              <div className="developers-code-section">
                <h3 className="developers-section-title">Quick Start</h3>
                <p className="developers-section-description">
                  Create your first payout in under 5 minutes with our simple API.
                </p>
                
                <div className="developers-code-block">
                  <div className="developers-code-header">
                    <div className="developers-code-tabs">
                      {sdks.map((sdk) => (
                        <button
                          key={sdk.id}
                          className={`developers-code-tab ${selectedLanguage === sdk.id ? "active" : ""}`}
                          onClick={() => setSelectedLanguage(sdk.id)}
                        >
                          {sdk.icon} {sdk.name}
                        </button>
                      ))}
                    </div>
                    <button className="developers-copy-btn">Copy</button>
                  </div>
                  <pre className="developers-code">
                    <code>{codeExamples[selectedLanguage]}</code>
                  </pre>
                </div>
              </div>

              <div className="developers-features">
                <div className="developers-feature">
                  <div className="developers-feature-icon">⚡</div>
                  <h4>Fast Integration</h4>
                  <p>Get started in minutes with our comprehensive SDKs and detailed guides.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">🔒</div>
                  <h4>Secure by Default</h4>
                  <p>Built-in security with API key authentication and webhook signatures.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">📊</div>
                  <h4>Real-time Events</h4>
                  <p>Webhooks for instant notifications on payout status changes.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">🧪</div>
                  <h4>Sandbox Mode</h4>
                  <p>Test your integration thoroughly before going live.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="developers-api">
              <h3 className="developers-section-title">API Endpoints</h3>
              <p className="developers-section-description">
                RESTful API with predictable resource-oriented URLs and standard HTTP response codes.
              </p>

              <div className="developers-endpoints">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="developers-endpoint">
                    <span className={`developers-method ${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                    <span className="developers-path">{endpoint.path}</span>
                    <span className="developers-endpoint-description">{endpoint.description}</span>
                  </div>
                ))}
              </div>

              <div className="developers-api-info">
                <div className="developers-api-info-item">
                  <h4>Base URL</h4>
                  <code>https://api.playtopay.com</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>Authentication</h4>
                  <code>Bearer API_KEY</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>Rate Limit</h4>
                  <code>1000 req/min</code>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sdks" && (
            <div className="developers-sdks">
              <h3 className="developers-section-title">Official SDKs</h3>
              <p className="developers-section-description">
                Use our official SDKs for the best developer experience.
              </p>

              <div className="developers-sdk-grid">
                {sdks.map((sdk) => (
                  <div key={sdk.id} className="developers-sdk-card">
                    <div className="developers-sdk-header">
                      <span className="developers-sdk-icon">{sdk.icon}</span>
                      <div>
                        <h4>{sdk.name}</h4>
                        <span className="developers-sdk-version">v{sdk.version}</span>
                      </div>
                    </div>
                    <p className="developers-sdk-description">
                      Official {sdk.name} SDK for Playto Pay API
                    </p>
                    <div className="developers-sdk-install">
                      <code>npm install @playtopay/{sdk.id}</code>
                    </div>
                    <div className="developers-sdk-links">
                      <a href="#">GitHub</a>
                      <a href="#">Documentation</a>
                      <a href="#">Changelog</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "webhooks" && (
            <div className="developers-webhooks">
              <h3 className="developers-section-title">Webhook Events</h3>
              <p className="developers-section-description">
                Subscribe to events and receive real-time notifications when things happen in your account.
              </p>

              <div className="developers-webhook-list">
                {webhookEvents.map((webhook, index) => (
                  <div key={index} className="developers-webhook-item">
                    <code className="developers-webhook-event">{webhook.event}</code>
                    <span className="developers-webhook-description">{webhook.description}</span>
                  </div>
                ))}
              </div>

              <div className="developers-webhook-config">
                <h4>Webhook Configuration</h4>
                <div className="developers-webhook-form">
                  <div className="form-group">
                    <label className="form-label">Webhook URL</label>
                    <input type="text" className="form-input" placeholder="https://your-app.com/webhooks" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Events to Subscribe</label>
                    <select className="form-input">
                      <option>All Events</option>
                      <option>Payout Events Only</option>
                      <option>Balance Events Only</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">Add Webhook</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
