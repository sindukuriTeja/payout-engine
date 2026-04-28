import { useState } from "react";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("library");

  const resources = [
    {
      id: 1, category: "guides", title: "Getting Started with Payouts",
      description: "Learn the fundamentals of creating, managing, and tracking payouts. Covers API setup, authentication, your first payout, and best practices.",
      type: "Guide", readTime: "10 min read", icon: "📚", featured: true
    },
    {
      id: 2, category: "guides", title: "Balance Management Best Practices",
      description: "Master real-time balance tracking, multi-currency wallets, auto top-ups, and projected balance forecasting for treasury operations.",
      type: "Guide", readTime: "8 min read", icon: "📚"
    },
    {
      id: 3, category: "guides", title: "Global Payout Compliance Guide",
      description: "Navigate KYC, AML, sanctions screening, and local payment regulations across 190+ countries with our comprehensive compliance guide.",
      type: "Guide", readTime: "20 min read", icon: "📚"
    },
    {
      id: 4, category: "guides", title: "Multi-currency Payout Strategy",
      description: "Optimize FX costs, manage currency risk, and implement smart routing for international payouts across 135+ currencies.",
      type: "Guide", readTime: "15 min read", icon: "📚"
    },
    {
      id: 5, category: "tutorials", title: "Build a Marketplace Payout System",
      description: "End-to-end tutorial: onboard sellers, split payments at checkout, schedule payouts, handle disputes, and generate tax forms.",
      type: "Tutorial", readTime: "30 min read", icon: "🎯", featured: true
    },
    {
      id: 6, category: "tutorials", title: "Implementing Webhooks",
      description: "Set up webhook endpoints, verify signatures, handle retries, and build reliable event-driven payout notification systems.",
      type: "Tutorial", readTime: "15 min read", icon: "🎯"
    },
    {
      id: 7, category: "tutorials", title: "Building a Creator Payout Dashboard",
      description: "Build a branded earnings dashboard for creators with real-time balance, payout history, tax forms, and payout preferences.",
      type: "Tutorial", readTime: "25 min read", icon: "🎯"
    },
    {
      id: 8, category: "tutorials", title: "Instant Payouts with Push-to-Card",
      description: "Implement real-time push-to-card payouts using Visa Direct and Mastercard Send for instant fund delivery.",
      type: "Tutorial", readTime: "18 min read", icon: "🎯"
    },
    {
      id: 9, category: "tutorials", title: "Batch Payouts with CSV Upload",
      description: "Process thousands of payouts at once using CSV upload, validation, batch monitoring, and error handling.",
      type: "Tutorial", readTime: "12 min read", icon: "🎯"
    },
    {
      id: 10, category: "api", title: "API Reference",
      description: "Complete REST API documentation with interactive explorer, request/response examples, and parameter descriptions for all 19 endpoints.",
      type: "Documentation", icon: "⚡", featured: true
    },
    {
      id: 11, category: "api", title: "SDK Documentation",
      description: "Official SDKs for Node.js, Python, Ruby, Go, Java, PHP, .NET, and cURL with auto-generated types and full IDE support.",
      type: "Documentation", icon: "⚡"
    },
    {
      id: 12, category: "api", title: "OpenAPI Specification",
      description: "Download our OpenAPI 3.0 spec to auto-generate clients, validate requests, and integrate with API development tools.",
      type: "Documentation", icon: "⚡"
    },
    {
      id: 13, category: "api", title: "Postman Collection",
      description: "Import our Postman collection with pre-configured requests, environments, and test scripts for all API endpoints.",
      type: "Documentation", icon: "⚡"
    },
    {
      id: 14, category: "blog", title: "How We Process 1M+ Payouts Daily",
      description: "Deep dive into our distributed systems architecture, event sourcing, and the infrastructure that powers millions of daily payouts.",
      type: "Blog Post", readTime: "12 min read", icon: "📝", featured: true
    },
    {
      id: 15, category: "blog", title: "Reducing Payout Failures by 99%",
      description: "Our engineering approach to smart retry logic, multi-rail failover, and predictive payment routing that achieves 99.97% success.",
      type: "Blog Post", readTime: "8 min read", icon: "📝"
    },
    {
      id: 16, category: "blog", title: "The State of Global Payouts 2026",
      description: "Annual report on payout trends, emerging payment methods, regulatory changes, and what's ahead for cross-border money movement.",
      type: "Blog Post", readTime: "15 min read", icon: "📝"
    },
    {
      id: 17, category: "blog", title: "Building Trust with Instant Payouts",
      description: "How companies like SwiftDeliver and ArtisanHub used instant payouts to increase retention by 40-65% and scale their platforms.",
      type: "Blog Post", readTime: "10 min read", icon: "📝"
    },
    {
      id: 18, category: "blog", title: "Designing APIs for Financial Infrastructure",
      description: "Principles behind our API design — idempotency, versioning, backward compatibility, and developer experience optimization.",
      type: "Blog Post", readTime: "14 min read", icon: "📝"
    },
    {
      id: 19, category: "webinars", title: "Marketplace Payments Masterclass",
      description: "90-minute deep dive into building marketplace payment infrastructure. Live Q&A with our engineering and product teams.",
      type: "Webinar", readTime: "90 min", icon: "🎥"
    },
    {
      id: 20, category: "webinars", title: "Going Global: Cross-border Payouts",
      description: "Learn how to expand payouts internationally — currency strategy, compliance, local payment methods, and tax considerations.",
      type: "Webinar", readTime: "60 min", icon: "🎥"
    },
    {
      id: 21, category: "webinars", title: "Fraud Prevention for Payout Platforms",
      description: "Our risk team shares ML-powered fraud detection strategies, rule writing best practices, and real-world case studies.",
      type: "Webinar", readTime: "75 min", icon: "🎥"
    },
    {
      id: 22, category: "support", title: "Help Center",
      description: "Searchable knowledge base with 200+ articles covering setup, troubleshooting, billing, compliance, and account management.",
      type: "Support", icon: "💬"
    },
    {
      id: 23, category: "support", title: "Developer Community",
      description: "Join 15,000+ developers in our Discord community. Get help, share integrations, and connect with the Playto Pay team.",
      type: "Community", icon: "👥"
    },
    {
      id: 24, category: "support", title: "Status Page",
      description: "Real-time system status, incident history, and uptime metrics. Subscribe to notifications for service updates.",
      type: "Status", icon: "🟢"
    }
  ];

  const changelog = [
    { date: "Apr 22, 2026", title: "Radar v2.0 — Enhanced ML Models", description: "New fraud detection models with 30% fewer false positives. Custom rule builder now supports 200+ signals.", tag: "New" },
    { date: "Apr 15, 2026", title: "Batch Payouts API", description: "Process up to 10,000 payouts in a single API call with progress tracking and partial failure handling.", tag: "New" },
    { date: "Apr 8, 2026", title: "PHP SDK v4.5.0", description: "Added support for batch payouts, fixed timezone handling in webhook verification, improved error messages.", tag: "Update" },
    { date: "Apr 1, 2026", title: "API Version 2026-04-01", description: "New API version with expanded payout object, improved error codes, and Connect account enhancements.", tag: "Version" },
    { date: "Mar 25, 2026", title: "Identity Verification — Selfie Matching", description: "Biometric selfie matching now available for identity verifications. Supports liveness detection.", tag: "New" },
    { date: "Mar 18, 2026", title: "FedNow Real-time Payments", description: "Instant payouts via FedNow rail now available for US bank accounts. Sub-30-second delivery.", tag: "New" },
    { date: "Mar 11, 2026", title: "Dashboard — Custom Report Builder", description: "Build custom reports with drag-and-drop interface. 100+ data fields, scheduling, and export options.", tag: "New" },
    { date: "Mar 4, 2026", title: "Go SDK v2.1.0", description: "Added context support for all API methods, improved connection pooling, and added Connect account helpers.", tag: "Update" },
    { date: "Feb 25, 2026", title: "Webhook Delivery Improvements", description: "Reduced average delivery latency by 60%. New retry backoff strategy for improved reliability.", tag: "Improvement" },
    { date: "Feb 18, 2026", title: "Tax — 1099-K Threshold Updates", description: "Updated 1099-K thresholds for 2026 tax year. New state-level threshold monitoring.", tag: "Update" }
  ];

  const learningPaths = [
    {
      title: "Payout Fundamentals",
      level: "Beginner",
      duration: "2 hours",
      modules: 5,
      description: "Everything you need to integrate basic payouts — from API setup to going live.",
      topics: ["API Authentication", "Creating Payouts", "Handling Webhooks", "Testing in Sandbox", "Going Live"]
    },
    {
      title: "Marketplace Builder",
      level: "Intermediate",
      duration: "4 hours",
      modules: 8,
      description: "Build a complete marketplace payment system with seller onboarding, splits, and payouts.",
      topics: ["Connect Setup", "Seller Onboarding", "Payment Splitting", "Payout Scheduling", "Dispute Handling", "Tax Reporting", "Dashboard Building", "Production Hardening"]
    },
    {
      title: "Global Payments Expert",
      level: "Advanced",
      duration: "6 hours",
      modules: 10,
      description: "Master cross-border payouts, multi-currency operations, compliance, and optimization.",
      topics: ["Multi-rail Strategy", "FX Optimization", "Regulatory Compliance", "Fraud Prevention", "Performance Tuning", "Data Pipeline Setup", "Custom Reporting", "High-volume Architecture", "Disaster Recovery", "Migration Planning"]
    }
  ];

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "guides", label: "Guides" },
    { id: "tutorials", label: "Tutorials" },
    { id: "api", label: "API Docs" },
    { id: "blog", label: "Blog" },
    { id: "webinars", label: "Webinars" },
    { id: "support", label: "Support" }
  ];

  const filteredResources = activeCategory === "all"
    ? resources
    : resources.filter(r => r.category === activeCategory);

  const featuredResources = resources.filter(r => r.featured);

  const sections = [
    { id: "library", label: "Resource Library" },
    { id: "changelog", label: "Changelog" },
    { id: "learning", label: "Learning Paths" }
  ];

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-container">
          <span className="resources-badge">Resources</span>
          <h1 className="resources-hero-title">
            Everything you need to <span className="gradient-text">succeed</span>
          </h1>
          <p className="resources-hero-subtitle">
            Guides, tutorials, API docs, webinars, and a developer community — everything
            to help you build, scale, and optimize your payout infrastructure.
          </p>
        </div>
      </section>

      <section className="resources-featured">
        <div className="resources-featured-container">
          <h2 className="resources-featured-title">Featured Resources</h2>
          <div className="resources-featured-grid">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="resource-card featured">
                <div className="resource-card-header">
                  <span className="resource-card-icon">{resource.icon}</span>
                  <span className="resource-card-type">{resource.type}</span>
                </div>
                <h3 className="resource-card-title">{resource.title}</h3>
                <p className="resource-card-description">{resource.description}</p>
                {resource.readTime && (
                  <span className="resource-card-time">{resource.readTime}</span>
                )}
                <button className="resource-card-link">Read More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-content-container">
          <div className="resources-section-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`resources-section-tab ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          {activeSection === "library" && (
            <>
              <div className="resources-search">
                <input
                  type="text"
                  className="resources-search-input"
                  placeholder="Search guides, tutorials, API docs, blog posts, and webinars..."
                />
                <svg className="resources-search-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="resources-categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`resources-category ${activeCategory === category.id ? "active" : ""}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="resources-grid">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-card-header">
                      <span className="resource-card-icon">{resource.icon}</span>
                      <span className="resource-card-type">{resource.type}</span>
                    </div>
                    <h3 className="resource-card-title">{resource.title}</h3>
                    <p className="resource-card-description">{resource.description}</p>
                    {resource.readTime && (
                      <span className="resource-card-time">{resource.readTime}</span>
                    )}
                    <button className="resource-card-link">Read More →</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "changelog" && (
            <div className="resources-changelog">
              <h3 className="resources-changelog-title">Product Changelog</h3>
              <p className="resources-changelog-desc">
                Stay up to date with the latest features, improvements, API versions, and SDK releases.
              </p>
              <div className="resources-changelog-list">
                {changelog.map((entry, index) => (
                  <div key={index} className="resources-changelog-entry">
                    <div className="resources-changelog-date">{entry.date}</div>
                    <div className="resources-changelog-content">
                      <div className="resources-changelog-header">
                        <span className={`resources-changelog-tag ${entry.tag.toLowerCase()}`}>{entry.tag}</span>
                        <h4>{entry.title}</h4>
                      </div>
                      <p>{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "learning" && (
            <div className="resources-learning">
              <h3 className="resources-learning-title">Learning Paths</h3>
              <p className="resources-learning-desc">
                Structured, progressive learning paths that take you from beginner to expert.
                Complete at your own pace with hands-on projects and real API exercises.
              </p>
              <div className="resources-learning-grid">
                {learningPaths.map((path, index) => (
                  <div key={index} className="resources-learning-card">
                    <div className="resources-learning-meta">
                      <span className={`resources-learning-level ${path.level.toLowerCase()}`}>{path.level}</span>
                      <span className="resources-learning-duration">{path.duration}</span>
                      <span className="resources-learning-modules">{path.modules} modules</span>
                    </div>
                    <h4 className="resources-learning-card-title">{path.title}</h4>
                    <p className="resources-learning-card-desc">{path.description}</p>
                    <div className="resources-learning-topics">
                      {path.topics.map((topic, i) => (
                        <span key={i} className="resources-learning-topic">{topic}</span>
                      ))}
                    </div>
                    <button className="btn btn-primary resources-learning-btn">Start Learning</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="resources-support-section">
            <div className="resources-support-card">
              <div className="resources-support-icon">🚀</div>
              <h3>Ready to get started?</h3>
              <p>Create your free account and start sending payouts in minutes. No credit card required.</p>
              <button className="btn btn-primary">Create Free Account</button>
            </div>
            <div className="resources-support-card">
              <div className="resources-support-icon">💬</div>
              <h3>Need help?</h3>
              <p>Join 15,000+ developers on Discord or reach our support team — available 24/7.</p>
              <button className="btn btn-secondary">Join Discord Community</button>
            </div>
            <div className="resources-support-card">
              <div className="resources-support-icon">🟢</div>
              <h3>System Status</h3>
              <p>Check real-time system health, incident history, and subscribe to status notifications.</p>
              <button className="btn btn-secondary">View Status Page</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
