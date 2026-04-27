import { useState } from "react";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState("ecommerce");

  const solutions = [
    {
      id: "ecommerce",
      title: "E-commerce Platforms",
      icon: "🛒",
      description: "Streamline vendor payouts, refund processing, and marketplace settlements for your e-commerce business.",
      challenges: [
        "Manual payout processing taking days",
        "Complex vendor payment schedules",
        "High refund processing costs",
        "Multi-currency payment complexity"
      ],
      benefits: [
        "Automate vendor payouts in minutes, not days",
        "Reduce payment processing costs by up to 60%",
        "Process refunds instantly to improve customer satisfaction",
        "Support 135+ currencies with automatic conversion"
      ],
      useCase: {
        title: "Marketplace Vendor Payouts",
        description: "Automatically split payments and disburse funds to vendors on your schedule—daily, weekly, or monthly.",
        metrics: [
          { value: "85%", label: "Time saved" },
          { value: "99.9%", label: "Accuracy" },
          { value: "2min", label: "Setup time" }
        ]
      }
    },
    {
      id: "saas",
      title: "SaaS Companies",
      icon: "☁️",
      description: "Handle subscription payouts, affiliate commissions, and partner revenue sharing with ease.",
      challenges: [
        "Complex revenue sharing calculations",
        "Delayed partner payments",
        "Manual commission tracking",
        "Inconsistent payout schedules"
      ],
      benefits: [
        "Automate revenue splits and partner payouts",
        "Real-time commission calculations",
        "Flexible payout schedules per partner",
        "Complete audit trail for compliance"
      ],
      useCase: {
        title: "Partner Revenue Sharing",
        description: "Automatically calculate and distribute revenue shares to partners, resellers, and affiliates.",
        metrics: [
          { value: "100%", label: "Automated" },
          { value: "0 errors", label: "In payouts" },
          { value: "Real-time", label: "Reporting" }
        ]
      }
    },
    {
      id: "marketplace",
      title: "Marketplaces",
      icon: "🏪",
      description: "Enable seamless split payments and instant seller payouts for your marketplace platform.",
      challenges: [
        "Complex payment splitting logic",
        "Delayed seller payouts hurting retention",
        "High payment failure rates",
        "Manual reconciliation processes"
      ],
      benefits: [
        "Instant payment splitting at checkout",
        "Same-day or instant seller payouts",
        "Smart retry for failed payments",
        "Automated reconciliation and reporting"
      ],
      useCase: {
        title: "Instant Seller Payouts",
        description: "Give your sellers access to their funds immediately after a sale, improving seller satisfaction and retention.",
        metrics: [
          { value: "Instant", label: "Payouts" },
          { value: "40%", label: "Better retention" },
          { value: "3x", label: "Faster growth" }
        ]
      }
    },
    {
      id: "gig",
      title: "Gig Economy",
      icon: "🚗",
      description: "Pay freelancers, drivers, and gig workers instantly across multiple payment methods.",
      challenges: [
        "Workers waiting weeks for payment",
        "High payment processing fees",
        "Limited payment method options",
        "Cross-border payment complexity"
      ],
      benefits: [
        "Instant payouts to workers after job completion",
        "Lower fees with smart routing",
        "Multiple payout options (bank, card, wallet)",
        "Pay workers in 190+ countries"
      ],
      useCase: {
        title: "Instant Worker Payouts",
        description: "Enable workers to cash out their earnings instantly, improving worker satisfaction and reducing churn.",
        metrics: [
          { value: "Instant", label: "Cash out" },
          { value: "60%", label: "Less churn" },
          { value: "5-star", label: "Worker rating" }
        ]
      }
    },
    {
      id: "fintech",
      title: "Fintech & Banking",
      icon: "🏦",
      description: "Build compliant financial products with our robust payout infrastructure and APIs.",
      challenges: [
        "Complex regulatory requirements",
        "Building payout infrastructure from scratch",
        "Security and fraud concerns",
        "Scalability limitations"
      ],
      benefits: [
        "SOC 2 Type II compliant infrastructure",
        "White-label payout solutions",
        "Advanced fraud detection",
        "Scale to millions of transactions"
      ],
      useCase: {
        title: "Embedded Finance",
        description: "Embed payout capabilities directly into your product with our comprehensive APIs and SDKs.",
        metrics: [
          { value: "99.99%", label: "Uptime" },
          { value: "SOC 2", label: "Compliant" },
          { value: "PCI DSS", label: "Certified" }
        ]
      }
    },
    {
      id: "creator",
      title: "Creator Platforms",
      icon: "🎨",
      description: "Monetize and pay creators, influencers, and content producers seamlessly.",
      challenges: [
        "Manual creator payment processing",
        "Inconsistent payout schedules",
        "International payment barriers",
        "Tax documentation complexity"
      ],
      benefits: [
        "Automated creator payouts on your schedule",
        "Support for international creators",
        "Integrated tax form generation",
        "Multiple payout methods per creator"
      ],
      useCase: {
        title: "Creator Monetization",
        description: "Automatically distribute subscription revenue, tips, and ad revenue to creators worldwide.",
        metrics: [
          { value: "190+", label: "Countries" },
          { value: "Auto", label: "Tax forms" },
          { value: "Weekly", label: "Payouts" }
        ]
      }
    }
  ];

  const activeSolutionData = solutions.find(s => s.id === activeSolution);

  return (
    <div className="solutions-page">
      <section className="solutions-hero">
        <div className="solutions-hero-container">
          <span className="solutions-badge">Solutions</span>
          <h1 className="solutions-hero-title">
            Built for your <span className="gradient-text">industry</span>
          </h1>
          <p className="solutions-hero-subtitle">
            Tailored payout solutions for every business model. From e-commerce to fintech, we've got you covered.
          </p>
        </div>
      </section>

      <section className="solutions-content">
        <div className="solutions-content-container">
          <div className="solutions-tabs">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                className={`solutions-tab ${activeSolution === solution.id ? "active" : ""}`}
                onClick={() => setActiveSolution(solution.id)}
              >
                <span className="solutions-tab-icon">{solution.icon}</span>
                <span className="solutions-tab-title">{solution.title}</span>
              </button>
            ))}
          </div>

          <div className="solutions-detail">
            <div className="solutions-detail-header">
              <span className="solutions-detail-icon">{activeSolutionData.icon}</span>
              <div>
                <h2 className="solutions-detail-title">{activeSolutionData.title}</h2>
                <p className="solutions-detail-description">{activeSolutionData.description}</p>
              </div>
            </div>

            <div className="solutions-grid">
              <div className="solutions-challenges">
                <h3 className="solutions-section-title">Challenges We Solve</h3>
                <ul className="solutions-list">
                  {activeSolutionData.challenges.map((challenge, index) => (
                    <li key={index} className="solutions-list-item challenge">
                      <svg className="solutions-list-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="solutions-benefits">
                <h3 className="solutions-section-title">How We Help</h3>
                <ul className="solutions-list">
                  {activeSolutionData.benefits.map((benefit, index) => (
                    <li key={index} className="solutions-list-item benefit">
                      <svg className="solutions-list-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="solutions-usecase">
              <h3 className="solutions-usecase-title">{activeSolutionData.useCase.title}</h3>
              <p className="solutions-usecase-description">{activeSolutionData.useCase.description}</p>
              <div className="solutions-usecase-metrics">
                {activeSolutionData.useCase.metrics.map((metric, index) => (
                  <div key={index} className="solutions-metric">
                    <span className="solutions-metric-value">{metric.value}</span>
                    <span className="solutions-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="solutions-actions">
              <button className="btn btn-primary">Talk to Sales</button>
              <button className="btn btn-secondary">View Case Studies</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
