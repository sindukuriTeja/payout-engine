import { useState } from "react";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const resources = [
    {
      id: 1,
      category: "guides",
      title: "Getting Started with Payouts",
      description: "Learn the basics of creating and managing payouts in your application.",
      type: "Guide",
      readTime: "10 min read",
      icon: "📚"
    },
    {
      id: 2,
      category: "guides",
      title: "Balance Management Best Practices",
      description: "Understand how to track and manage your account balance effectively.",
      type: "Guide",
      readTime: "8 min read",
      icon: "📚"
    },
    {
      id: 3,
      category: "tutorials",
      title: "Build a Marketplace Payout System",
      description: "Step-by-step tutorial on implementing split payments and vendor payouts.",
      type: "Tutorial",
      readTime: "25 min read",
      icon: "🎯"
    },
    {
      id: 4,
      category: "tutorials",
      title: "Implementing Webhooks",
      description: "Set up real-time notifications for payout status updates.",
      type: "Tutorial",
      readTime: "15 min read",
      icon: "🎯"
    },
    {
      id: 5,
      category: "api",
      title: "API Reference",
      description: "Complete API documentation with examples and response schemas.",
      type: "Documentation",
      icon: "⚡"
    },
    {
      id: 6,
      category: "api",
      title: "SDK Documentation",
      description: "Official SDKs for Node.js, Python, Ruby, and Go.",
      type: "Documentation",
      icon: "⚡"
    },
    {
      id: 7,
      category: "blog",
      title: "How We Process 1M+ Payouts Daily",
      description: "Deep dive into our infrastructure and scaling strategies.",
      type: "Blog Post",
      readTime: "12 min read",
      icon: "📝"
    },
    {
      id: 8,
      category: "blog",
      title: "Reducing Payout Failures by 99%",
      description: "Our approach to smart retry logic and payment routing.",
      type: "Blog Post",
      readTime: "8 min read",
      icon: "📝"
    },
    {
      id: 9,
      category: "support",
      title: "Help Center",
      description: "Find answers to common questions and troubleshooting guides.",
      type: "Support",
      icon: "💬"
    },
    {
      id: 10,
      category: "support",
      title: "Contact Support",
      description: "Get help from our team of payment experts.",
      type: "Support",
      icon: "💬"
    }
  ];

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "guides", label: "Guides" },
    { id: "tutorials", label: "Tutorials" },
    { id: "api", label: "API Docs" },
    { id: "blog", label: "Blog" },
    { id: "support", label: "Support" }
  ];

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-container">
          <span className="resources-badge">Resources</span>
          <h1 className="resources-hero-title">
            Everything you need to <span className="gradient-text">succeed</span>
          </h1>
          <p className="resources-hero-subtitle">
            Documentation, guides, tutorials, and support to help you build and scale your payout infrastructure.
          </p>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-content-container">
          <div className="resources-search">
            <input 
              type="text" 
              className="resources-search-input" 
              placeholder="Search documentation, guides, and tutorials..."
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
                <button className="resource-card-link">
                  Read More →
                </button>
              </div>
            ))}
          </div>

          <div className="resources-support-section">
            <div className="resources-support-card">
              <div className="resources-support-icon">🚀</div>
              <h3>Ready to get started?</h3>
              <p>Create your free account and start sending payouts in minutes.</p>
              <button className="btn btn-primary">Create Free Account</button>
            </div>
            <div className="resources-support-card">
              <div className="resources-support-icon">💬</div>
              <h3>Need help?</h3>
              <p>Our support team is available 24/7 to help you with any questions.</p>
              <button className="btn btn-secondary">Contact Support</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
