import { useState } from "react";

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState("payouts");

  const products = [
    {
      id: "payouts",
      title: "Payouts",
      subtitle: "Send money to anyone, anywhere",
      description: "Automate payouts to vendors, contractors, and sellers worldwide. Support for bank transfers, cards, and digital wallets across 190+ countries.",
      icon: "💸",
      features: [
        "Instant payouts to 190+ countries",
        "Multiple payment methods (bank, card, wallet)",
        "Automated scheduling and batch processing",
        "Real-time tracking and notifications",
        "Smart retry logic for failed payments"
      ],
      stats: [
        { value: "99.9%", label: "Success rate" },
        { value: "< 30s", label: "Average speed" },
        { value: "190+", label: "Countries" }
      ]
    },
    {
      id: "balance",
      title: "Balance",
      subtitle: "Real-time account management",
      description: "Track your available and held balances in real-time. Get instant visibility into your funds with detailed breakdowns and projections.",
      icon: "💰",
      features: [
        "Real-time balance updates",
        "Multi-currency support",
        "Available vs held fund tracking",
        "Instant balance notifications",
        "Projected earnings calculator"
      ],
      stats: [
        { value: "Real-time", label: "Updates" },
        { value: "135+", label: "Currencies" },
        { value: "24/7", label: "Monitoring" }
      ]
    },
    {
      id: "ledger",
      title: "Ledger",
      subtitle: "Complete transaction history",
      description: "Every transaction recorded with full audit trail. Search, filter, and export your complete financial history with ease.",
      icon: "📊",
      features: [
        "Complete transaction ledger",
        "Advanced search and filtering",
        "Export to CSV, PDF, Excel",
        "Audit trail for compliance",
        "Automated reconciliation"
      ],
      stats: [
        { value: "Unlimited", label: "History" },
        { value: "7+ years", label: "Retention" },
        { value: "SOC 2", label: "Compliant" }
      ]
    },
    {
      id: "api",
      title: "API",
      subtitle: "Build powerful integrations",
      description: "RESTful APIs and webhooks to integrate payouts into your platform. SDKs for all major languages with comprehensive documentation.",
      icon: "⚡",
      features: [
        "RESTful API with OpenAPI spec",
        "Webhooks for real-time events",
        "SDKs for Node, Python, Ruby, Go",
        "Sandbox environment for testing",
        "Rate limiting and retry support"
      ],
      stats: [
        { value: "99.99%", label: "Uptime SLA" },
        { value: "< 100ms", label: "API latency" },
        { value: "24/7", label: "Support" }
      ]
    }
  ];

  const activeProductData = products.find(p => p.id === activeProduct);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="products-hero-container">
          <span className="products-badge">Products</span>
          <h1 className="products-hero-title">
            Financial infrastructure for the <span className="gradient-text">internet economy</span>
          </h1>
          <p className="products-hero-subtitle">
            A fully integrated suite of products for managing payouts, balances, and financial operations at scale.
          </p>
        </div>
      </section>

      <section className="products-content">
        <div className="products-content-container">
          <div className="products-sidebar">
            {products.map((product) => (
              <button
                key={product.id}
                className={`products-sidebar-item ${activeProduct === product.id ? "active" : ""}`}
                onClick={() => setActiveProduct(product.id)}
              >
                <span className="products-sidebar-icon">{product.icon}</span>
                <div className="products-sidebar-text">
                  <span className="products-sidebar-title">{product.title}</span>
                  <span className="products-sidebar-subtitle">{product.subtitle}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="products-main">
            <div className="products-detail">
              <div className="products-detail-header">
                <span className="products-detail-icon">{activeProductData.icon}</span>
                <div>
                  <h2 className="products-detail-title">{activeProductData.title}</h2>
                  <p className="products-detail-subtitle">{activeProductData.subtitle}</p>
                </div>
              </div>

              <p className="products-detail-description">{activeProductData.description}</p>

              <div className="products-features">
                <h3 className="products-features-title">Key Features</h3>
                <ul className="products-features-list">
                  {activeProductData.features.map((feature, index) => (
                    <li key={index} className="products-feature-item">
                      <svg className="products-feature-check" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="products-stats">
                {activeProductData.stats.map((stat, index) => (
                  <div key={index} className="products-stat">
                    <span className="products-stat-value">{stat.value}</span>
                    <span className="products-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="products-actions">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-secondary">View Documentation</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
