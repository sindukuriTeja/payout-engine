import { useState } from "react";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLanguage, setSelectedLanguage] = useState("node");

  const codeExamples = {
    node: `import PlaytoPay from '@playtopay/node';

const playtopay = new PlaytoPay('sk_live_...');

// Create a payout
const payout = await playtopay.payouts.create({
  amount: 50000,       // $500.00 in cents
  currency: 'usd',
  destination: {
    type: 'bank_account',
    account_id: 'ba_1N4sK2JkL9mPqR'
  },
  speed: 'instant',
  metadata: { order_id: 'ord_12345' }
});

console.log(payout.id);     // po_3N5tL3KmM0nQsS
console.log(payout.status); // 'processing'`,
    python: `import playtopay

playtopay.api_key = 'sk_live_...'

# Create a payout
payout = playtopay.Payout.create(
    amount=50000,       # $500.00 in cents
    currency='usd',
    destination={
        'type': 'bank_account',
        'account_id': 'ba_1N4sK2JkL9mPqR'
    },
    speed='instant',
    metadata={'order_id': 'ord_12345'}
)

print(payout.id)     # po_3N5tL3KmM0nQsS
print(payout.status) # 'processing'`,
    ruby: `require 'playtopay'

PlaytoPay.api_key = 'sk_live_...'

# Create a payout
payout = PlaytoPay::Payout.create(
  amount: 50000,       # $500.00 in cents
  currency: 'usd',
  destination: {
    type: 'bank_account',
    account_id: 'ba_1N4sK2JkL9mPqR'
  },
  speed: 'instant',
  metadata: { order_id: 'ord_12345' }
)

puts payout.id     # po_3N5tL3KmM0nQsS
puts payout.status # 'processing'`,
    go: `package main

import (
    "fmt"
    playtopay "github.com/playtopay/playtopay-go/v2"
)

func main() {
    client := playtopay.New("sk_live_...")

    params := &playtopay.PayoutParams{
        Amount:   playtopay.Int64(50000),
        Currency: playtopay.String("usd"),
        Speed:    playtopay.String("instant"),
    }

    payout, _ := client.Payouts.Create(params)
    fmt.Println(payout.ID)     // po_3N5tL3KmM0nQsS
    fmt.Println(payout.Status) // processing
}`,
    java: `import com.playtopay.PlaytoPay;
import com.playtopay.model.Payout;
import com.playtopay.param.PayoutCreateParams;

PlaytoPay.apiKey = "sk_live_...";

PayoutCreateParams params = PayoutCreateParams.builder()
    .setAmount(50000L)           // $500.00 in cents
    .setCurrency("usd")
    .setSpeed(PayoutCreateParams.Speed.INSTANT)
    .putMetadata("order_id", "ord_12345")
    .build();

Payout payout = Payout.create(params);
System.out.println(payout.getId());     // po_3N5tL3KmM0nQsS
System.out.println(payout.getStatus()); // processing`,
    php: `<?php
require_once('vendor/autoload.php');

\\PlaytoPay\\PlaytoPay::setApiKey('sk_live_...');

// Create a payout
$payout = \\PlaytoPay\\Payout::create([
    'amount' => 50000,       // $500.00 in cents
    'currency' => 'usd',
    'destination' => [
        'type' => 'bank_account',
        'account_id' => 'ba_1N4sK2JkL9mPqR'
    ],
    'speed' => 'instant',
    'metadata' => ['order_id' => 'ord_12345']
]);

echo $payout->id;     // po_3N5tL3KmM0nQsS
echo $payout->status; // processing`,
    dotnet: `using PlaytoPay;

var client = new PlaytoPayClient("sk_live_...");

var options = new PayoutCreateOptions
{
    Amount = 50000,       // $500.00 in cents
    Currency = "usd",
    Speed = "instant",
    Metadata = new Dictionary<string, string>
    {
        { "order_id", "ord_12345" }
    }
};

var payout = await client.Payouts.CreateAsync(options);
Console.WriteLine(payout.Id);     // po_3N5tL3KmM0nQsS
Console.WriteLine(payout.Status); // processing`,
    curl: `curl https://api.playtopay.com/v1/payouts \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 50000,
    "currency": "usd",
    "destination": {
      "type": "bank_account",
      "account_id": "ba_1N4sK2JkL9mPqR"
    },
    "speed": "instant",
    "metadata": {
      "order_id": "ord_12345"
    }
  }'

# Returns: { "id": "po_3N5tL3KmM0nQsS", "status": "processing", ... }`
  };

  const sdks = [
    { name: "Node.js", id: "node", icon: "⬢", version: "4.2.0", install: "npm install @playtopay/node", downloads: "2.1M/month" },
    { name: "Python", id: "python", icon: "🐍", version: "5.1.0", install: "pip install playtopay", downloads: "1.8M/month" },
    { name: "Ruby", id: "ruby", icon: "💎", version: "3.0.0", install: "gem install playtopay", downloads: "420K/month" },
    { name: "Go", id: "go", icon: "🔵", version: "2.1.0", install: "go get github.com/playtopay/playtopay-go/v2", downloads: "680K/month" },
    { name: "Java", id: "java", icon: "☕", version: "6.0.0", install: "implementation 'com.playtopay:playtopay-java:6.0.0'", downloads: "950K/month" },
    { name: "PHP", id: "php", icon: "🐘", version: "4.5.0", install: "composer require playtopay/playtopay-php", downloads: "1.2M/month" },
    { name: ".NET", id: "dotnet", icon: "🔷", version: "5.2.0", install: "dotnet add package PlaytoPay.net", downloads: "560K/month" },
    { name: "cURL", id: "curl", icon: "📡", version: "v1", install: "curl https://api.playtopay.com/v1/...", downloads: "REST API" }
  ];

  const apiEndpoints = [
    { method: "POST", path: "/v1/payouts", description: "Create a new payout", category: "Payouts" },
    { method: "GET", path: "/v1/payouts/:id", description: "Retrieve a payout by ID", category: "Payouts" },
    { method: "GET", path: "/v1/payouts", description: "List all payouts with filters", category: "Payouts" },
    { method: "POST", path: "/v1/payouts/:id/cancel", description: "Cancel a pending payout", category: "Payouts" },
    { method: "POST", path: "/v1/payouts/batch", description: "Create a batch of payouts", category: "Payouts" },
    { method: "GET", path: "/v1/balance", description: "Retrieve current balance", category: "Balance" },
    { method: "GET", path: "/v1/balance/history", description: "List balance transactions", category: "Balance" },
    { method: "POST", path: "/v1/balance/topup", description: "Add funds to your balance", category: "Balance" },
    { method: "GET", path: "/v1/ledger/entries", description: "List ledger entries", category: "Ledger" },
    { method: "GET", path: "/v1/ledger/entries/:id", description: "Retrieve a ledger entry", category: "Ledger" },
    { method: "POST", path: "/v1/ledger/reconcile", description: "Trigger reconciliation", category: "Ledger" },
    { method: "POST", path: "/v1/connect/accounts", description: "Create a connected account", category: "Connect" },
    { method: "GET", path: "/v1/connect/accounts/:id", description: "Retrieve account details", category: "Connect" },
    { method: "POST", path: "/v1/connect/accounts/:id/payouts", description: "Payout to connected account", category: "Connect" },
    { method: "POST", path: "/v1/identity/verifications", description: "Create a verification session", category: "Identity" },
    { method: "GET", path: "/v1/identity/verifications/:id", description: "Retrieve verification result", category: "Identity" },
    { method: "POST", path: "/v1/radar/assessments", description: "Assess risk for a payout", category: "Radar" },
    { method: "GET", path: "/v1/reporting/runs", description: "List report runs", category: "Reporting" },
    { method: "POST", path: "/v1/reporting/runs", description: "Create a report run", category: "Reporting" }
  ];

  const webhookEvents = [
    { event: "payout.created", description: "Triggered when a new payout is initiated", category: "Payouts" },
    { event: "payout.processing", description: "Payout has been sent to the payment network", category: "Payouts" },
    { event: "payout.completed", description: "Funds have been delivered to the recipient", category: "Payouts" },
    { event: "payout.failed", description: "Payout failed — includes failure reason and code", category: "Payouts" },
    { event: "payout.reversed", description: "A completed payout has been reversed or returned", category: "Payouts" },
    { event: "payout.updated", description: "Payout metadata or status was updated", category: "Payouts" },
    { event: "balance.updated", description: "Available or pending balance has changed", category: "Balance" },
    { event: "balance.threshold_reached", description: "Balance crossed a configured threshold", category: "Balance" },
    { event: "account.created", description: "A new connected account was created", category: "Connect" },
    { event: "account.updated", description: "Connected account details were updated", category: "Connect" },
    { event: "account.verified", description: "Connected account passed verification", category: "Connect" },
    { event: "identity.verification_completed", description: "Identity verification session completed", category: "Identity" },
    { event: "identity.verification_failed", description: "Identity verification failed", category: "Identity" },
    { event: "radar.risk_flagged", description: "A payout was flagged by risk assessment", category: "Radar" },
    { event: "reporting.run_completed", description: "A scheduled report is ready for download", category: "Reporting" },
    { event: "tax.form_generated", description: "A tax form (1099) was generated for a payee", category: "Tax" }
  ];

  const cliCommands = [
    { command: "playtopay login", description: "Authenticate with your API keys" },
    { command: "playtopay payouts create --amount 5000 --currency usd", description: "Create a payout from the terminal" },
    { command: "playtopay payouts list --status completed --limit 20", description: "List recent completed payouts" },
    { command: "playtopay listen --forward-to localhost:3000/webhooks", description: "Forward webhook events to your local server" },
    { command: "playtopay logs tail", description: "Stream real-time API logs" },
    { command: "playtopay testing trigger payout.completed", description: "Trigger a test webhook event" },
    { command: "playtopay fixtures --file seed.json", description: "Load test data into sandbox" },
    { command: "playtopay open dashboard", description: "Open the dashboard in your browser" }
  ];

  const guides = [
    { title: "Quickstart Guide", description: "Create your first payout in under 5 minutes", time: "5 min", level: "Beginner" },
    { title: "Authentication & API Keys", description: "Set up API keys, manage environments, and configure access controls", time: "8 min", level: "Beginner" },
    { title: "Handling Webhooks", description: "Receive and verify webhook events securely in your application", time: "12 min", level: "Intermediate" },
    { title: "Batch Payouts", description: "Process thousands of payouts efficiently with batch operations", time: "15 min", level: "Intermediate" },
    { title: "Multi-currency Payouts", description: "Send payouts in 135+ currencies with automatic FX conversion", time: "10 min", level: "Intermediate" },
    { title: "Building a Marketplace", description: "End-to-end guide for marketplace payment splitting and seller payouts", time: "30 min", level: "Advanced" },
    { title: "Error Handling & Retries", description: "Implement robust error handling with idempotency keys and retry logic", time: "12 min", level: "Intermediate" },
    { title: "Testing & Sandbox", description: "Test your integration with sandbox mode, test cards, and fixtures", time: "10 min", level: "Beginner" },
    { title: "Going Live Checklist", description: "Everything you need to verify before switching from sandbox to production", time: "8 min", level: "Advanced" },
    { title: "PCI Compliance", description: "Understanding your PCI obligations when using Playto Pay APIs", time: "15 min", level: "Advanced" },
    { title: "Migration from Stripe", description: "Step-by-step guide to migrating your existing Stripe integration", time: "20 min", level: "Advanced" },
    { title: "Migration from PayPal", description: "Migrate your PayPal payout integration to Playto Pay", time: "20 min", level: "Advanced" }
  ];

  const endpointCategories = [...new Set(apiEndpoints.map(e => e.category))];
  const [activeApiCategory, setActiveApiCategory] = useState("Payouts");
  const filteredEndpoints = apiEndpoints.filter(e => e.category === activeApiCategory);

  const [activeWebhookCategory, setActiveWebhookCategory] = useState("Payouts");
  const webhookCategories = [...new Set(webhookEvents.map(e => e.category))];
  const filteredWebhooks = webhookEvents.filter(e => e.category === activeWebhookCategory);

  return (
    <div className="developers-page">
      <section className="developers-hero">
        <div className="developers-hero-container">
          <span className="developers-badge">Developers</span>
          <h1 className="developers-hero-title">
            Build with <span className="gradient-text">powerful APIs</span>
          </h1>
          <p className="developers-hero-subtitle">
            Comprehensive documentation, 8 official SDKs, a CLI, and a full sandbox environment.
            Integrate payouts into your application in minutes — not months.
          </p>
          <div className="developers-hero-actions">
            <button className="btn btn-primary">Get API Keys</button>
            <button className="btn btn-secondary">Read Documentation</button>
            <button className="btn btn-secondary">Open Sandbox</button>
          </div>
        </div>
      </section>

      <section className="developers-content">
        <div className="developers-content-container">
          <div className="developers-tabs">
            {[
              { id: "overview", label: "Quick Start" },
              { id: "api", label: "API Reference" },
              { id: "sdks", label: "SDKs & Libraries" },
              { id: "webhooks", label: "Webhooks" },
              { id: "cli", label: "CLI" },
              { id: "guides", label: "Guides" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`developers-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="developers-overview">
              <div className="developers-code-section">
                <h3 className="developers-section-title">Create your first payout in 3 steps</h3>
                <p className="developers-section-description">
                  Install an SDK, configure your API key, and send a payout — it's that simple.
                </p>

                <div className="developers-steps">
                  <div className="developers-step">
                    <span className="developers-step-number">1</span>
                    <div>
                      <h4>Install the SDK</h4>
                      <code className="developers-step-code">npm install @playtopay/node</code>
                    </div>
                  </div>
                  <div className="developers-step">
                    <span className="developers-step-number">2</span>
                    <div>
                      <h4>Set your API key</h4>
                      <code className="developers-step-code">const playtopay = new PlaytoPay('sk_test_...');</code>
                    </div>
                  </div>
                  <div className="developers-step">
                    <span className="developers-step-number">3</span>
                    <div>
                      <h4>Create a payout</h4>
                      <code className="developers-step-code">await playtopay.payouts.create({'{'} amount: 50000, currency: 'usd' {'}'});</code>
                    </div>
                  </div>
                </div>

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
                  <h4>5-minute Integration</h4>
                  <p>Install an SDK, add 10 lines of code, and you're live. We handle the payment infrastructure complexity.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">🔒</div>
                  <h4>Secure by Default</h4>
                  <p>API key auth, webhook signatures, idempotency keys, and TLS 1.3 encryption on every request.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">📊</div>
                  <h4>Real-time Webhooks</h4>
                  <p>16 event types with guaranteed delivery, automatic retries, and signature verification.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">🧪</div>
                  <h4>Full Sandbox</h4>
                  <p>Test every API endpoint with realistic test data, simulated delays, and triggerable failure scenarios.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">🔧</div>
                  <h4>CLI & Dev Tools</h4>
                  <p>Powerful CLI for local development, webhook forwarding, log streaming, and test data management.</p>
                </div>
                <div className="developers-feature">
                  <div className="developers-feature-icon">📖</div>
                  <h4>Interactive Docs</h4>
                  <p>API explorer with real requests, auto-generated code samples, and inline parameter descriptions.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="developers-api">
              <h3 className="developers-section-title">API Reference</h3>
              <p className="developers-section-description">
                RESTful API with predictable URLs, standard HTTP codes, and JSON request/response bodies.
                All endpoints are versioned and backward compatible within a major version.
              </p>

              <div className="developers-api-categories">
                {endpointCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`developers-api-category ${activeApiCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveApiCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="developers-endpoints">
                {filteredEndpoints.map((endpoint, index) => (
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
                  <code>Bearer sk_live_...</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>Rate Limit</h4>
                  <code>10,000 req/min</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>API Version</h4>
                  <code>2026-04-01</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>Content-Type</h4>
                  <code>application/json</code>
                </div>
                <div className="developers-api-info-item">
                  <h4>Idempotency</h4>
                  <code>Idempotency-Key header</code>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sdks" && (
            <div className="developers-sdks">
              <h3 className="developers-section-title">Official SDKs & Libraries</h3>
              <p className="developers-section-description">
                Type-safe, well-documented SDKs for every major language. Auto-generated from our OpenAPI spec,
                tested against every API version, and published within hours of new feature releases.
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
                      <span className="developers-sdk-downloads">{sdk.downloads}</span>
                    </div>
                    <div className="developers-sdk-install">
                      <code>{sdk.install}</code>
                    </div>
                    <div className="developers-sdk-links">
                      <a href="#">GitHub</a>
                      <a href="#">Docs</a>
                      <a href="#">Changelog</a>
                      <a href="#">Examples</a>
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
                Subscribe to 16 event types and receive real-time HTTP POST notifications. Every event includes
                a cryptographic signature for verification, and failed deliveries are retried up to 15 times over 72 hours.
              </p>

              <div className="developers-webhook-categories">
                {webhookCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`developers-webhook-cat-btn ${activeWebhookCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveWebhookCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="developers-webhook-list">
                {filteredWebhooks.map((webhook, index) => (
                  <div key={index} className="developers-webhook-item">
                    <code className="developers-webhook-event">{webhook.event}</code>
                    <span className="developers-webhook-description">{webhook.description}</span>
                  </div>
                ))}
              </div>

              <div className="developers-webhook-info">
                <div className="developers-webhook-info-card">
                  <h4>Signature Verification</h4>
                  <p>Every webhook includes a <code>Playtopay-Signature</code> header with a HMAC-SHA256 signature. Always verify before processing.</p>
                </div>
                <div className="developers-webhook-info-card">
                  <h4>Retry Policy</h4>
                  <p>Failed deliveries (non-2xx response) are retried up to 15 times over 72 hours with exponential backoff.</p>
                </div>
                <div className="developers-webhook-info-card">
                  <h4>Local Testing</h4>
                  <p>Use <code>playtopay listen --forward-to localhost:3000</code> to receive webhook events during local development.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cli" && (
            <div className="developers-cli">
              <h3 className="developers-section-title">Playto Pay CLI</h3>
              <p className="developers-section-description">
                A powerful command-line tool for local development, testing, and debugging.
                Forward webhooks to localhost, stream logs, trigger test events, and manage resources — all from your terminal.
              </p>

              <div className="developers-cli-install">
                <h4>Installation</h4>
                <div className="developers-cli-install-options">
                  <div className="developers-cli-install-option">
                    <span className="developers-cli-os">macOS</span>
                    <code>brew install playtopay/tap/playtopay</code>
                  </div>
                  <div className="developers-cli-install-option">
                    <span className="developers-cli-os">Linux</span>
                    <code>curl -s https://get.playtopay.com | bash</code>
                  </div>
                  <div className="developers-cli-install-option">
                    <span className="developers-cli-os">Windows</span>
                    <code>scoop install playtopay</code>
                  </div>
                  <div className="developers-cli-install-option">
                    <span className="developers-cli-os">Docker</span>
                    <code>docker pull playtopay/cli:latest</code>
                  </div>
                </div>
              </div>

              <div className="developers-cli-commands">
                <h4>Common Commands</h4>
                {cliCommands.map((cmd, index) => (
                  <div key={index} className="developers-cli-command">
                    <code className="developers-cli-cmd">{cmd.command}</code>
                    <span className="developers-cli-desc">{cmd.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "guides" && (
            <div className="developers-guides">
              <h3 className="developers-section-title">Developer Guides</h3>
              <p className="developers-section-description">
                Step-by-step guides covering every aspect of the Playto Pay integration — from your first payout to advanced marketplace architectures and production readiness.
              </p>

              <div className="developers-guides-grid">
                {guides.map((guide, index) => (
                  <div key={index} className="developers-guide-card">
                    <div className="developers-guide-meta">
                      <span className={`developers-guide-level ${guide.level.toLowerCase()}`}>{guide.level}</span>
                      <span className="developers-guide-time">{guide.time}</span>
                    </div>
                    <h4 className="developers-guide-title">{guide.title}</h4>
                    <p className="developers-guide-desc">{guide.description}</p>
                    <button className="developers-guide-link">Read Guide →</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="developers-cta">
        <div className="developers-cta-container">
          <div className="developers-cta-content">
            <h2>Start building today</h2>
            <p>Create a free account, get your API keys, and send your first payout in under 5 minutes.</p>
          </div>
          <div className="developers-cta-actions">
            <button className="btn btn-primary">Get API Keys</button>
            <button className="btn btn-secondary">Open Sandbox</button>
          </div>
        </div>
      </section>
    </div>
  );
}
