import { useState } from "react";

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState("payouts");
  const [activeTab, setActiveTab] = useState("features");

  const products = [
    {
      id: "payouts",
      title: "Payouts",
      subtitle: "Global money movement",
      description: "Send money to anyone, anywhere in the world. Automate payouts to vendors, contractors, sellers, and creators with support for bank transfers, cards, and digital wallets across 190+ countries. Intelligent routing ensures the fastest, cheapest path for every transaction.",
      icon: "💸",
      color: "purple",
      features: [
        { title: "Instant Payouts", desc: "Deliver funds in under 30 seconds to eligible bank accounts and cards in 45+ countries" },
        { title: "Smart Routing", desc: "AI-powered payment routing selects the optimal rail for speed, cost, and reliability" },
        { title: "Batch Processing", desc: "Upload thousands of payouts via CSV or API and process them in a single batch run" },
        { title: "Scheduled Payouts", desc: "Set up recurring payout schedules — daily, weekly, bi-weekly, or custom intervals" },
        { title: "Multi-currency", desc: "Pay in 135+ currencies with competitive FX rates and automatic conversion at settlement" },
        { title: "Smart Retries", desc: "Failed payments are automatically retried with fallback rails and updated routing logic" },
        { title: "Payout Links", desc: "Send a link and let recipients choose how they want to receive funds — no integration needed" },
        { title: "Compliance Checks", desc: "Built-in KYC/KYB verification, sanctions screening, and regulatory compliance for every payout" }
      ],
      stats: [
        { value: "99.97%", label: "Success rate" },
        { value: "< 30s", label: "Instant speed" },
        { value: "190+", label: "Countries" },
        { value: "135+", label: "Currencies" }
      ],
      useCases: [
        "Marketplace seller payouts",
        "Freelancer and contractor payments",
        "Insurance claim disbursements",
        "Affiliate commission payouts",
        "Creator monetization payouts"
      ],
      codeExample: `const payout = await playtopay.payouts.create({
  amount: 50000,
  currency: 'usd',
  destination: {
    type: 'bank_account',
    account_id: 'ba_1N4sK2JkL9mPqR'
  },
  speed: 'instant',
  description: 'Vendor payment - March 2026',
  metadata: { order_id: 'ord_12345' }
});
// => po_3N5tL3KmM0nQsS`
    },
    {
      id: "connect",
      title: "Connect",
      subtitle: "Payments for platforms",
      description: "Build a complete payments experience for your marketplace or platform. Onboard sellers and service providers, split payments at checkout, manage payouts, and handle tax reporting — all through a single integration.",
      icon: "🔗",
      color: "blue",
      features: [
        { title: "Onboarding Flows", desc: "White-label onboarding with KYC/KYB verification, bank account linking, and identity checks" },
        { title: "Payment Splitting", desc: "Split payments at checkout between your platform and connected accounts with flexible fee structures" },
        { title: "Managed Accounts", desc: "Full control over connected accounts — set payout schedules, hold funds, and manage compliance" },
        { title: "Express Accounts", desc: "Pre-built onboarding UI with hosted dashboards for sellers who want a quick setup" },
        { title: "Custom Accounts", desc: "Build fully custom onboarding and dashboard experiences with complete API control" },
        { title: "Instant Onboarding", desc: "Get sellers accepting payments in minutes with progressive verification requirements" },
        { title: "Multi-party Payments", desc: "Route funds between multiple parties in a single transaction with configurable splits" },
        { title: "1099 Tax Reporting", desc: "Automated tax form generation and filing for US-based connected accounts" }
      ],
      stats: [
        { value: "50K+", label: "Platforms" },
        { value: "< 5min", label: "Onboarding" },
        { value: "3 types", label: "Account models" },
        { value: "Auto", label: "Tax reporting" }
      ],
      useCases: [
        "Multi-vendor marketplaces",
        "On-demand delivery platforms",
        "Freelance service platforms",
        "SaaS with embedded payments",
        "Crowdfunding platforms"
      ],
      codeExample: `const account = await playtopay.connect.accounts.create({
  type: 'express',
  country: 'US',
  capabilities: {
    payouts: { requested: true },
    transfers: { requested: true }
  },
  business_profile: {
    name: 'Seller Store LLC',
    mcc: '5734'
  }
});
// => acct_1N4sK2JkL9mPqR`
    },
    {
      id: "balance",
      title: "Balance",
      subtitle: "Real-time fund management",
      description: "Track available, pending, and held balances in real-time across all currencies. Get instant visibility into your funds with detailed breakdowns, projections, and automated notifications for balance changes.",
      icon: "💰",
      color: "green",
      features: [
        { title: "Real-time Updates", desc: "Balance changes reflected instantly with sub-second latency across all account types" },
        { title: "Multi-currency Wallets", desc: "Hold and manage funds in 135+ currencies with real-time exchange rate visibility" },
        { title: "Balance Holds", desc: "Place holds on funds for dispute reserves, compliance requirements, or custom business rules" },
        { title: "Auto Top-up", desc: "Configure automatic funding when balances drop below a threshold to ensure uninterrupted payouts" },
        { title: "Projected Balance", desc: "Forecast future balances based on scheduled payouts, expected inflows, and pending settlements" },
        { title: "Balance Alerts", desc: "Get notified via webhook, email, or SMS when balances cross configurable thresholds" },
        { title: "Fund Segregation", desc: "Separate operating funds from customer funds with dedicated balance pools for compliance" },
        { title: "Interest Earnings", desc: "Earn interest on held balances with transparent rates and daily accrual visibility" }
      ],
      stats: [
        { value: "Real-time", label: "Updates" },
        { value: "135+", label: "Currencies" },
        { value: "24/7", label: "Monitoring" },
        { value: "< 50ms", label: "API latency" }
      ],
      useCases: [
        "Treasury management",
        "Escrow and trust accounts",
        "Multi-currency operations",
        "Compliance fund segregation",
        "Cash flow forecasting"
      ],
      codeExample: `const balance = await playtopay.balance.retrieve({
  account_id: 'acct_1N4sK2JkL9mPqR',
  expand: ['pending', 'reserved']
});

console.log(balance.available); // [{ amount: 245000, currency: 'usd' }]
console.log(balance.pending);   // [{ amount: 18500, currency: 'usd' }]
console.log(balance.reserved);  // [{ amount: 5000, currency: 'usd' }]`
    },
    {
      id: "ledger",
      title: "Ledger",
      subtitle: "Financial record-keeping",
      description: "Every transaction recorded with a complete, immutable audit trail. Double-entry bookkeeping ensures your financial records are always balanced. Search, filter, reconcile, and export your complete financial history with enterprise-grade reliability.",
      icon: "📊",
      color: "indigo",
      features: [
        { title: "Double-entry Bookkeeping", desc: "Every transaction creates balanced debit and credit entries for perfect accounting accuracy" },
        { title: "Immutable Records", desc: "Append-only ledger ensures transaction history can never be altered — only corrected with adjustments" },
        { title: "Automated Reconciliation", desc: "Match payouts against bank statements automatically with configurable matching rules" },
        { title: "Custom Categories", desc: "Tag and categorize transactions with custom metadata for flexible reporting and analysis" },
        { title: "Multi-format Export", desc: "Export to CSV, PDF, Excel, QuickBooks, Xero, and other accounting software formats" },
        { title: "Compliance Audit Trail", desc: "SOC 2 compliant audit logs with who-did-what-when tracking for every operation" },
        { title: "Real-time Search", desc: "Search across millions of transactions in milliseconds with full-text and structured queries" },
        { title: "Automated Reports", desc: "Schedule daily, weekly, or monthly financial reports delivered to your inbox or SFTP" }
      ],
      stats: [
        { value: "Unlimited", label: "History" },
        { value: "7+ years", label: "Retention" },
        { value: "SOC 2", label: "Compliant" },
        { value: "< 100ms", label: "Search speed" }
      ],
      useCases: [
        "Financial auditing and compliance",
        "Revenue reconciliation",
        "Dispute management",
        "Tax reporting preparation",
        "Management reporting"
      ],
      codeExample: `const entries = await playtopay.ledger.entries.list({
  account_id: 'acct_1N4sK2JkL9mPqR',
  created: {
    gte: '2026-01-01',
    lte: '2026-03-31'
  },
  type: 'payout',
  limit: 100,
  expand: ['transaction']
});

// Double-entry: each entry has matching debit + credit`
    },
    {
      id: "radar",
      title: "Radar",
      subtitle: "Fraud prevention & risk",
      description: "Machine learning-powered fraud detection trained on billions of data points. Protect your platform from fraudulent payouts, account takeover, and identity theft with real-time risk scoring, customizable rules, and adaptive models.",
      icon: "🛡️",
      color: "red",
      features: [
        { title: "ML Risk Scoring", desc: "Every payout receives a real-time risk score from models trained on billions of transactions" },
        { title: "Custom Rules Engine", desc: "Create rules using 200+ risk signals — block, review, or allow based on your risk appetite" },
        { title: "Velocity Checks", desc: "Detect unusual patterns like rapid-fire payouts, new account bursts, and amount anomalies" },
        { title: "Device Fingerprinting", desc: "Identify suspicious devices and sessions across your platform with browser and device signals" },
        { title: "Account Takeover Protection", desc: "Detect compromised accounts with behavioral analysis and step-up authentication triggers" },
        { title: "Sanctions Screening", desc: "Real-time screening against global watchlists including OFAC, EU, UN, and 50+ national lists" },
        { title: "Manual Review Queue", desc: "Flag high-risk payouts for human review with contextual data and recommended actions" },
        { title: "Risk Analytics", desc: "Dashboard with fraud rates, false positive trends, rule performance, and model accuracy metrics" }
      ],
      stats: [
        { value: "99.5%", label: "Detection rate" },
        { value: "< 100ms", label: "Scoring speed" },
        { value: "200+", label: "Risk signals" },
        { value: "0.01%", label: "False positives" }
      ],
      useCases: [
        "Payout fraud prevention",
        "Account verification",
        "Regulatory compliance screening",
        "Risk-based authentication",
        "Suspicious activity reporting"
      ],
      codeExample: `const riskAssessment = await playtopay.radar.assess({
  payout_id: 'po_3N5tL3KmM0nQsS',
  signals: {
    ip_address: '203.0.113.42',
    device_id: 'dev_abc123',
    session_id: 'sess_xyz789'
  }
});

console.log(riskAssessment.score);    // 12 (low risk)
console.log(riskAssessment.decision); // 'allow'`
    },
    {
      id: "tax",
      title: "Tax",
      subtitle: "Automated tax compliance",
      description: "Automate tax calculation, reporting, and form generation for payouts across jurisdictions. Handle 1099-K, 1099-NEC, 1099-MISC, and international tax reporting with built-in threshold monitoring and electronic filing.",
      icon: "📋",
      color: "yellow",
      features: [
        { title: "1099 Generation", desc: "Automatically generate 1099-K, 1099-NEC, and 1099-MISC forms based on payout thresholds" },
        { title: "W-8/W-9 Collection", desc: "Collect and validate tax forms from payees with hosted forms and TIN verification" },
        { title: "Threshold Monitoring", desc: "Track IRS reporting thresholds per payee and alert when approaching filing requirements" },
        { title: "Electronic Filing", desc: "File 1099s electronically with the IRS and deliver copies to payees automatically" },
        { title: "International Tax IDs", desc: "Collect and validate tax IDs across 50+ countries with local format verification" },
        { title: "Withholding Management", desc: "Calculate and apply backup withholding for non-compliant payees per IRS regulations" },
        { title: "Tax Year Dashboard", desc: "Monitor filing status, form counts, and compliance metrics across all tax years" },
        { title: "Corrections & Amendments", desc: "File corrected 1099s and handle amendments through the same automated workflow" }
      ],
      stats: [
        { value: "50+", label: "Countries" },
        { value: "Auto", label: "1099 filing" },
        { value: "100%", label: "IRS compliant" },
        { value: "Real-time", label: "Monitoring" }
      ],
      useCases: [
        "Marketplace tax reporting",
        "Contractor payment compliance",
        "Cross-border tax management",
        "Creator platform 1099s",
        "Gig economy tax forms"
      ],
      codeExample: `const taxForms = await playtopay.tax.forms.generate({
  tax_year: 2025,
  account_id: 'acct_1N4sK2JkL9mPqR',
  form_type: '1099-nec',
  delivery: {
    method: 'electronic',
    notify_payee: true
  }
});

console.log(taxForms.count);  // 847 forms generated
console.log(taxForms.status); // 'ready_to_file'`
    },
    {
      id: "identity",
      title: "Identity",
      subtitle: "Verification & KYC",
      description: "Verify the identity of payees, vendors, and connected accounts with document verification, biometric checks, and database lookups. Stay compliant with KYC/KYB regulations across jurisdictions while minimizing onboarding friction.",
      icon: "🪪",
      color: "teal",
      features: [
        { title: "Document Verification", desc: "Verify government IDs, passports, and driver's licenses from 200+ countries with AI-powered OCR" },
        { title: "Selfie Matching", desc: "Liveness detection and biometric comparison against ID photos to prevent impersonation" },
        { title: "Database Lookups", desc: "Cross-reference against credit bureaus, government databases, and commercial registries" },
        { title: "Business Verification", desc: "Verify business entities with EIN validation, secretary of state records, and UBO identification" },
        { title: "Watchlist Screening", desc: "Screen against PEP lists, sanctions databases, and adverse media in real-time" },
        { title: "Address Verification", desc: "Validate addresses with postal service databases and proof-of-address document analysis" },
        { title: "Progressive Verification", desc: "Start with lightweight checks and escalate to full KYC only when thresholds are reached" },
        { title: "Verification Reports", desc: "Detailed verification results with confidence scores, extracted data, and audit-ready reports" }
      ],
      stats: [
        { value: "200+", label: "ID types" },
        { value: "< 10s", label: "Verification" },
        { value: "99.1%", label: "Accuracy" },
        { value: "GDPR", label: "Compliant" }
      ],
      useCases: [
        "Payee onboarding and KYC",
        "Seller identity verification",
        "Age and identity checks",
        "Beneficial owner identification",
        "Ongoing monitoring and re-verification"
      ],
      codeExample: `const verification = await playtopay.identity.verify({
  type: 'document',
  person: {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com'
  },
  options: {
    document: { allowed_types: ['passport', 'id_card'] },
    selfie: { required: true }
  },
  return_url: 'https://app.example.com/verified'
});
// => Returns hosted verification URL`
    },
    {
      id: "reporting",
      title: "Reporting",
      subtitle: "Business intelligence",
      description: "Comprehensive reporting and analytics for your payout operations. Pre-built dashboards, custom report builder, and real-time data exports give you full visibility into volumes, success rates, costs, and trends.",
      icon: "📈",
      color: "cyan",
      features: [
        { title: "Pre-built Dashboards", desc: "Out-of-the-box dashboards for payout volumes, success rates, costs, and settlement timelines" },
        { title: "Custom Report Builder", desc: "Drag-and-drop report builder with 100+ data fields, filters, grouping, and visualization options" },
        { title: "Scheduled Reports", desc: "Automate report generation and delivery via email, SFTP, or webhook on custom schedules" },
        { title: "Real-time Data Pipeline", desc: "Stream transaction data to your data warehouse via Kafka, S3, or BigQuery connectors" },
        { title: "SQL Access (Sigma)", desc: "Write custom SQL queries against your transaction data with a built-in query editor" },
        { title: "Revenue Recognition", desc: "Track revenue, fees, and costs with ASC 606 compliant recognition rules" },
        { title: "Benchmarking", desc: "Compare your metrics against anonymized industry benchmarks for success rates and speeds" },
        { title: "Embeddable Charts", desc: "Embed interactive charts and reports in your own dashboard with our reporting SDK" }
      ],
      stats: [
        { value: "100+", label: "Data fields" },
        { value: "Real-time", label: "Streaming" },
        { value: "SQL", label: "Query access" },
        { value: "50+", label: "Integrations" }
      ],
      useCases: [
        "Executive dashboards",
        "Operations monitoring",
        "Finance and accounting",
        "Data warehouse integration",
        "Regulatory reporting"
      ],
      codeExample: `const report = await playtopay.reporting.runs.create({
  report_type: 'payout_summary',
  parameters: {
    interval: 'month',
    start_date: '2026-01-01',
    end_date: '2026-03-31',
    columns: ['volume', 'count', 'success_rate', 'avg_speed'],
    group_by: ['currency', 'destination_country']
  },
  destination: {
    type: 's3',
    bucket: 'my-reports-bucket'
  }
});`
    }
  ];

  const activeProductData = products.find(p => p.id === activeProduct);

  const tabs = [
    { id: "features", label: "Features" },
    { id: "code", label: "Code Example" },
    { id: "usecases", label: "Use Cases" }
  ];

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="products-hero-container">
          <span className="products-badge">Products</span>
          <h1 className="products-hero-title">
            Financial infrastructure for the <span className="gradient-text">internet economy</span>
          </h1>
          <p className="products-hero-subtitle">
            A fully integrated suite of financial products for managing payouts, identity, compliance, and reporting at scale.
            From startups to enterprises — build, launch, and grow your payout operations with confidence.
          </p>
        </div>
      </section>

      <section className="products-overview">
        <div className="products-overview-container">
          <div className="products-overview-grid">
            {products.map((product) => (
              <button
                key={product.id}
                className={`products-overview-card ${activeProduct === product.id ? "active" : ""}`}
                onClick={() => { setActiveProduct(product.id); setActiveTab("features"); }}
              >
                <span className="products-overview-icon">{product.icon}</span>
                <span className="products-overview-title">{product.title}</span>
                <span className="products-overview-subtitle">{product.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-content">
        <div className="products-content-container">
          <div className="products-detail">
            <div className="products-detail-header">
              <span className="products-detail-icon">{activeProductData.icon}</span>
              <div>
                <h2 className="products-detail-title">{activeProductData.title}</h2>
                <p className="products-detail-subtitle">{activeProductData.subtitle}</p>
              </div>
            </div>

            <p className="products-detail-description">{activeProductData.description}</p>

            <div className="products-stats">
              {activeProductData.stats.map((stat, index) => (
                <div key={index} className="products-stat">
                  <span className="products-stat-value">{stat.value}</span>
                  <span className="products-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="products-detail-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`products-detail-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "features" && (
              <div className="products-features-grid">
                {activeProductData.features.map((feature, index) => (
                  <div key={index} className="products-feature-card">
                    <h4 className="products-feature-card-title">{feature.title}</h4>
                    <p className="products-feature-card-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "code" && (
              <div className="products-code-section">
                <div className="products-code-block">
                  <div className="products-code-header">
                    <span className="products-code-lang">Node.js</span>
                    <button className="products-code-copy">Copy</button>
                  </div>
                  <pre className="products-code-content">
                    <code>{activeProductData.codeExample}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "usecases" && (
              <div className="products-usecases">
                <div className="products-usecases-grid">
                  {activeProductData.useCases.map((useCase, index) => (
                    <div key={index} className="products-usecase-item">
                      <svg className="products-usecase-check" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="products-actions">
              <button className="btn btn-primary">Get Started Free</button>
              <button className="btn btn-secondary">View Documentation</button>
              <button className="btn btn-secondary">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <section className="products-cta">
        <div className="products-cta-container">
          <h2 className="products-cta-title">Ready to get started?</h2>
          <p className="products-cta-description">
            Explore our products, read the documentation, or talk to our team to find the right solution for your business.
          </p>
          <div className="products-cta-actions">
            <button className="btn btn-primary">Create Free Account</button>
            <button className="btn btn-secondary">Talk to Sales</button>
          </div>
        </div>
      </section>
    </div>
  );
}
