import { useState } from "react";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState("ecommerce");
  const [activeView, setActiveView] = useState("overview");

  const solutions = [
    {
      id: "ecommerce",
      title: "E-commerce & Retail",
      icon: "🛒",
      tagline: "Streamline your marketplace payments",
      description: "Automate vendor payouts, refund processing, and marketplace settlements. Whether you're a single-brand retailer or a multi-vendor marketplace, our infrastructure handles the complexity of splitting, scheduling, and reconciling payments at any scale.",
      challenges: [
        "Manual payout processing taking 5-7 business days",
        "Complex vendor payment schedules across time zones",
        "High refund processing costs eating into margins",
        "Multi-currency payment complexity and FX exposure",
        "Reconciliation errors causing vendor disputes",
        "Scaling payment ops as vendor count grows"
      ],
      benefits: [
        "Automate vendor payouts — process in minutes, not days",
        "Reduce payment processing costs by up to 60%",
        "Instant refunds improve customer NPS by 25+ points",
        "Support 135+ currencies with locked-in FX rates",
        "Zero reconciliation errors with automated matching",
        "Handle 100K+ vendors without adding headcount"
      ],
      caseStudy: {
        company: "ShopFlow Marketplace",
        industry: "Multi-vendor e-commerce",
        quote: "Playto Pay reduced our payout processing time from 5 days to under 30 seconds. Our vendor satisfaction scores increased by 40%.",
        author: "Sarah Chen, VP of Operations",
        metrics: [
          { value: "85%", label: "Time saved on payouts" },
          { value: "99.97%", label: "Payout accuracy rate" },
          { value: "40%", label: "Vendor satisfaction increase" },
          { value: "$2.1M", label: "Annual cost savings" }
        ]
      },
      integrations: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Custom API"],
      keyFeatures: [
        { title: "Split Payments", desc: "Automatically split order payments between your platform, vendors, and affiliates at checkout" },
        { title: "Vendor Dashboards", desc: "White-label payout dashboards for vendors to track earnings, download statements, and manage tax forms" },
        { title: "Refund Automation", desc: "Process refunds instantly with automatic balance adjustments and vendor clawback handling" }
      ]
    },
    {
      id: "saas",
      title: "SaaS & Subscriptions",
      icon: "☁️",
      tagline: "Revenue sharing made simple",
      description: "Handle subscription payouts, affiliate commissions, partner revenue sharing, and reseller payments. Our flexible rules engine lets you model any revenue sharing structure and automate disbursements on any schedule.",
      challenges: [
        "Complex revenue sharing calculations with tiers and overrides",
        "Delayed partner payments creating trust issues",
        "Manual commission tracking across hundreds of affiliates",
        "Inconsistent payout schedules hurting partner retention",
        "Difficulty scaling partnership programs internationally",
        "Lack of transparency into earnings for partners"
      ],
      benefits: [
        "Model any revenue split — percentage, tiered, usage-based, or hybrid",
        "Real-time commission calculations visible to partners instantly",
        "Flexible payout schedules — per transaction, daily, weekly, monthly, or threshold-based",
        "Complete audit trail for every calculation and disbursement",
        "Scale to 10K+ partners across 190 countries without added complexity",
        "Self-service partner portal with real-time earnings visibility"
      ],
      caseStudy: {
        company: "CloudStack Analytics",
        industry: "B2B SaaS Platform",
        quote: "We went from spending 40 hours per month on partner payouts to fully automated disbursements. Our partner program grew 3x in the first year.",
        author: "Marcus Rivera, Head of Partnerships",
        metrics: [
          { value: "100%", label: "Payout automation" },
          { value: "0 errors", label: "In commission calculations" },
          { value: "3x", label: "Partner program growth" },
          { value: "40hrs/mo", label: "Time reclaimed" }
        ]
      },
      integrations: ["Stripe Billing", "Chargebee", "Recurly", "Zuora", "Custom API"],
      keyFeatures: [
        { title: "Revenue Split Engine", desc: "Define complex split rules with tiered percentages, minimums, maximums, and override logic" },
        { title: "Partner Portal", desc: "Branded portal where partners view real-time earnings, download invoices, and manage payout preferences" },
        { title: "Affiliate Tracking", desc: "Track referrals, calculate commissions across multiple programs, and handle multi-touch attribution" }
      ]
    },
    {
      id: "marketplace",
      title: "Marketplaces & Platforms",
      icon: "🏪",
      tagline: "Scale your two-sided marketplace",
      description: "Enable seamless split payments, instant seller payouts, and automated onboarding for your marketplace. Handle the full lifecycle from seller verification to settlement with a single integration.",
      challenges: [
        "Complex payment splitting across multiple sellers per order",
        "Delayed seller payouts hurting seller acquisition and retention",
        "High payment failure rates on international transfers",
        "Manual seller onboarding creating bottlenecks",
        "Regulatory complexity across different jurisdictions",
        "Dispute handling and seller chargeback management"
      ],
      benefits: [
        "Instant payment splitting at checkout — any number of sellers per order",
        "Same-day or instant seller payouts in 45+ countries",
        "Smart routing reduces international payment failures by 80%",
        "Automated seller onboarding with KYC in under 5 minutes",
        "Built-in compliance for 50+ countries with local regulations",
        "Automated dispute resolution with seller-buyer mediation workflows"
      ],
      caseStudy: {
        company: "ArtisanHub",
        industry: "Handmade goods marketplace",
        quote: "Instant payouts were the #1 feature request from our sellers. Since launching with Playto Pay, seller sign-ups increased 65% and churn dropped to nearly zero.",
        author: "Priya Patel, CEO & Co-founder",
        metrics: [
          { value: "Instant", label: "Seller payouts" },
          { value: "65%", label: "More seller sign-ups" },
          { value: "~0%", label: "Seller churn rate" },
          { value: "3x", label: "GMV growth in 12 months" }
        ]
      },
      integrations: ["Custom API", "Sharetribe", "Arcadier", "Webflow", "No-code tools"],
      keyFeatures: [
        { title: "Instant Seller Payouts", desc: "Pay sellers immediately after order confirmation with configurable hold periods for returns" },
        { title: "Seller Onboarding", desc: "White-label onboarding flow with identity verification, bank account linking, and tax form collection" },
        { title: "Dispute Management", desc: "Automated workflows for buyer disputes with configurable resolution rules and seller notifications" }
      ]
    },
    {
      id: "gig",
      title: "Gig & On-demand",
      icon: "🚗",
      tagline: "Pay workers in real-time",
      description: "Pay freelancers, drivers, delivery workers, and gig workers instantly across multiple payment methods. Flexible cash-out options, earned wage access, and real-time earnings visibility keep your workforce engaged and retained.",
      challenges: [
        "Workers waiting days or weeks for payment hurting retention",
        "High payment processing fees eating into thin margins",
        "Limited payment method options for diverse workforce",
        "Cross-border payment complexity for international contractors",
        "Tax reporting burden for thousands of independent contractors",
        "Compliance with varying labor and payment regulations"
      ],
      benefits: [
        "Instant payouts to workers within seconds of job completion",
        "Lower fees with smart routing — save 40-60% on payment costs",
        "Workers choose: bank transfer, debit card, digital wallet, or cash pickup",
        "Pay workers in 190+ countries with local payment methods",
        "Automated 1099 generation and filing for US contractors",
        "Built-in compliance with gig economy regulations by jurisdiction"
      ],
      caseStudy: {
        company: "SwiftDeliver",
        industry: "On-demand delivery platform",
        quote: "Our drivers love instant cash-out. We saw driver retention improve by 55% and our applicant pipeline doubled within three months of launching instant payouts.",
        author: "James Okonkwo, COO",
        metrics: [
          { value: "Instant", label: "Cash out available" },
          { value: "55%", label: "Better driver retention" },
          { value: "2x", label: "Driver applications" },
          { value: "4.8★", label: "Worker satisfaction" }
        ]
      },
      integrations: ["Custom API", "Uber-style platforms", "Workforce management tools", "Time tracking APIs"],
      keyFeatures: [
        { title: "Earned Wage Access", desc: "Let workers access a percentage of earned-but-unpaid wages before the regular pay cycle" },
        { title: "Flexible Cash-out", desc: "Workers choose when and how to withdraw — instant, scheduled, or threshold-based triggers" },
        { title: "Earnings Dashboard", desc: "Real-time earnings tracker for workers with trip-level breakdowns, tips, and bonuses" }
      ]
    },
    {
      id: "fintech",
      title: "Fintech & Banking",
      icon: "🏦",
      tagline: "Build compliant financial products",
      description: "Embed payout capabilities into your fintech product with our robust, compliant infrastructure. From neobanks to lending platforms — power account-to-account transfers, loan disbursements, and treasury operations with enterprise-grade APIs.",
      challenges: [
        "Complex regulatory requirements across jurisdictions",
        "Building payout infrastructure from scratch takes 12-18 months",
        "Security, fraud, and compliance concerns slowing product launches",
        "Scalability limitations of legacy banking rails",
        "Vendor lock-in with inflexible payment processors",
        "Maintaining PCI DSS, SOC 2, and regional certifications"
      ],
      benefits: [
        "SOC 2 Type II, PCI DSS Level 1, and ISO 27001 compliant",
        "Launch in weeks instead of months with pre-built infrastructure",
        "Advanced fraud detection with ML-powered risk scoring",
        "Scale to millions of transactions with zero infrastructure management",
        "Multi-rail support: ACH, wire, RTP, SEPA, Faster Payments, and more",
        "White-label everything — your brand, your experience"
      ],
      caseStudy: {
        company: "NexaPay",
        industry: "Digital banking platform",
        quote: "We launched our business banking product in 8 weeks instead of the 12 months we estimated. Playto Pay's APIs handled the complexity we didn't want to build.",
        author: "Aisha Mohammed, CTO",
        metrics: [
          { value: "8 weeks", label: "Time to launch" },
          { value: "99.99%", label: "Uptime SLA" },
          { value: "SOC 2", label: "Compliant" },
          { value: "$4M+", label: "Dev costs saved" }
        ]
      },
      integrations: ["Core banking systems", "Plaid", "Alloy", "Unit", "Custom API"],
      keyFeatures: [
        { title: "Multi-rail Payments", desc: "ACH, wire, RTP, FedNow, SEPA, Faster Payments — choose the right rail for each payment" },
        { title: "Embedded Finance", desc: "White-label payout APIs that integrate seamlessly into your product under your brand" },
        { title: "Compliance Engine", desc: "Built-in BSA/AML, KYC, sanctions screening, and suspicious activity monitoring" }
      ]
    },
    {
      id: "creator",
      title: "Creator Economy",
      icon: "🎨",
      tagline: "Monetize creators worldwide",
      description: "Pay creators, influencers, podcasters, and content producers seamlessly across the globe. Handle subscription revenue splits, ad revenue sharing, tip disbursements, and merchandise payouts with automated tax compliance.",
      challenges: [
        "Manual creator payment processing doesn't scale past 100 creators",
        "Inconsistent payout schedules hurting creator trust and retention",
        "International payment barriers blocking global creator bases",
        "Tax documentation complexity with 1099s and W-8BEN forms",
        "Multiple revenue streams (subs, tips, ads, merch) hard to reconcile",
        "Creators demanding faster, more flexible payout options"
      ],
      benefits: [
        "Automated creator payouts supporting 50K+ creators per platform",
        "Pay creators in 190+ countries with local payment methods",
        "Integrated 1099 and W-8BEN collection and filing",
        "Unified earnings from subscriptions, tips, ads, and merch in one view",
        "Instant and scheduled payout options per creator preference",
        "Creator-facing earnings dashboard with real-time analytics"
      ],
      caseStudy: {
        company: "StreamVerse",
        industry: "Live streaming platform",
        quote: "We migrated 12,000 creators to Playto Pay in a weekend. Creators now get paid 5x faster and our support tickets about payments dropped by 90%.",
        author: "David Kim, VP of Product",
        metrics: [
          { value: "12K+", label: "Creators migrated" },
          { value: "5x", label: "Faster payments" },
          { value: "90%", label: "Fewer payment tickets" },
          { value: "Weekly", label: "Auto payouts" }
        ]
      },
      integrations: ["Custom API", "YouTube API", "Twitch", "Patreon-style platforms", "Shopify"],
      keyFeatures: [
        { title: "Revenue Aggregation", desc: "Combine earnings from subscriptions, tips, ad revenue, sponsorships, and merch into unified payouts" },
        { title: "Creator Portal", desc: "Branded portal where creators track earnings, set payout preferences, and download tax forms" },
        { title: "Tiered Monetization", desc: "Configure different revenue splits based on creator tier, content type, or custom business rules" }
      ]
    },
    {
      id: "insurance",
      title: "Insurance & Claims",
      icon: "🏥",
      tagline: "Accelerate claims disbursement",
      description: "Modernize claims payments with instant disbursements, automated approval workflows, and multi-channel delivery. Reduce claims cycle time from weeks to minutes while maintaining full compliance and audit trails.",
      challenges: [
        "Claims disbursement taking 14-30 days frustrating policyholders",
        "Manual approval workflows creating bottlenecks and errors",
        "Check-based payments costly to process and slow to arrive",
        "Regulatory compliance requirements varying by state and line of business",
        "Fraud risk in claims payments requiring manual review",
        "Poor visibility into payment status for adjusters and policyholders"
      ],
      benefits: [
        "Instant claims disbursement via push-to-card or RTP for eligible claims",
        "Automated approval workflows with configurable rules and thresholds",
        "Eliminate 80% of check payments with digital delivery options",
        "State-by-state compliance rules engine for prompt payment regulations",
        "ML-powered fraud scoring for every disbursement before release",
        "Real-time payment tracking for adjusters, agents, and policyholders"
      ],
      caseStudy: {
        company: "ShieldCover Insurance",
        industry: "Property & casualty insurance",
        quote: "Playto Pay transformed our claims experience. Policyholders now receive funds in minutes instead of weeks, and our NPS increased by 35 points.",
        author: "Robert Jansen, SVP Claims Operations",
        metrics: [
          { value: "< 5min", label: "Claims payment time" },
          { value: "35pts", label: "NPS improvement" },
          { value: "80%", label: "Fewer check payments" },
          { value: "$8.50", label: "Saved per claim" }
        ]
      },
      integrations: ["Guidewire", "Duck Creek", "Majesco", "Custom claims systems", "Salesforce"],
      keyFeatures: [
        { title: "Instant Claims Pay", desc: "Disburse approved claims in under 5 minutes via push-to-debit, RTP, or same-day ACH" },
        { title: "Approval Workflows", desc: "Configurable multi-level approval chains with automated routing based on amount and claim type" },
        { title: "Policyholder Portal", desc: "Self-service portal where policyholders track claim status, choose payment method, and confirm receipt" }
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise & B2B",
      icon: "🏢",
      tagline: "Modernize business payments",
      description: "Replace legacy AP systems with modern, API-driven payout infrastructure. Automate vendor payments, employee reimbursements, incentive payouts, and cross-border settlements with full ERP integration.",
      challenges: [
        "Legacy AP systems requiring manual data entry and approvals",
        "Cross-border vendor payments slow and expensive",
        "No visibility into payment status after initiation",
        "Disconnected systems for different payment types and regions",
        "Compliance burden increasing with global vendor bases",
        "IT resources consumed maintaining payment infrastructure"
      ],
      benefits: [
        "API-first integration with SAP, Oracle, NetSuite, and other ERPs",
        "Cross-border payments in 190+ countries at competitive FX rates",
        "Real-time payment tracking with webhook notifications at every step",
        "Single platform for vendor payments, reimbursements, and incentives",
        "Automated compliance with global sanctions and anti-fraud screening",
        "Zero infrastructure maintenance — fully managed, SOC 2 certified"
      ],
      caseStudy: {
        company: "GlobalTech Solutions",
        industry: "Enterprise technology",
        quote: "We consolidated 6 payment vendors into Playto Pay. Our team processes 10x more payments with half the headcount, and vendor payment SLAs improved from 30 days to same-day.",
        author: "Lisa Park, CFO",
        metrics: [
          { value: "6 → 1", label: "Vendor consolidation" },
          { value: "10x", label: "Processing efficiency" },
          { value: "Same-day", label: "Payment SLA" },
          { value: "50%", label: "Cost reduction" }
        ]
      },
      integrations: ["SAP", "Oracle NetSuite", "QuickBooks", "Xero", "Custom ERP"],
      keyFeatures: [
        { title: "ERP Integration", desc: "Pre-built connectors for SAP, Oracle, NetSuite, and other ERPs with bi-directional sync" },
        { title: "Approval Engine", desc: "Multi-level approval workflows with delegation, escalation, and mobile approval capabilities" },
        { title: "Vendor Management", desc: "Centralized vendor database with onboarding, bank validation, and ongoing compliance monitoring" }
      ]
    }
  ];

  const activeSolutionData = solutions.find(s => s.id === activeSolution);

  const views = [
    { id: "overview", label: "Overview" },
    { id: "casestudy", label: "Case Study" },
    { id: "integrations", label: "Integrations" }
  ];

  return (
    <div className="solutions-page">
      <section className="solutions-hero">
        <div className="solutions-hero-container">
          <span className="solutions-badge">Solutions</span>
          <h1 className="solutions-hero-title">
            Built for your <span className="gradient-text">industry</span>
          </h1>
          <p className="solutions-hero-subtitle">
            Purpose-built payout solutions for every business model. Backed by case studies,
            proven ROI, and teams who understand your industry inside and out.
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
                onClick={() => { setActiveSolution(solution.id); setActiveView("overview"); }}
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
                <p className="solutions-detail-tagline">{activeSolutionData.tagline}</p>
                <p className="solutions-detail-description">{activeSolutionData.description}</p>
              </div>
            </div>

            <div className="solutions-view-tabs">
              {views.map((view) => (
                <button
                  key={view.id}
                  className={`solutions-view-tab ${activeView === view.id ? "active" : ""}`}
                  onClick={() => setActiveView(view.id)}
                >
                  {view.label}
                </button>
              ))}
            </div>

            {activeView === "overview" && (
              <>
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

                <div className="solutions-key-features">
                  <h3 className="solutions-section-title">Key Capabilities</h3>
                  <div className="solutions-key-features-grid">
                    {activeSolutionData.keyFeatures.map((feature, index) => (
                      <div key={index} className="solutions-key-feature-card">
                        <h4>{feature.title}</h4>
                        <p>{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeView === "casestudy" && (
              <div className="solutions-casestudy">
                <div className="solutions-casestudy-card">
                  <div className="solutions-casestudy-header">
                    <span className="solutions-casestudy-label">Case Study</span>
                    <h3>{activeSolutionData.caseStudy.company}</h3>
                    <span className="solutions-casestudy-industry">{activeSolutionData.caseStudy.industry}</span>
                  </div>
                  <blockquote className="solutions-casestudy-quote">
                    "{activeSolutionData.caseStudy.quote}"
                  </blockquote>
                  <p className="solutions-casestudy-author">— {activeSolutionData.caseStudy.author}</p>
                  <div className="solutions-casestudy-metrics">
                    {activeSolutionData.caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="solutions-metric">
                        <span className="solutions-metric-value">{metric.value}</span>
                        <span className="solutions-metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === "integrations" && (
              <div className="solutions-integrations">
                <h3 className="solutions-section-title">Integrations & Compatibility</h3>
                <p className="solutions-integrations-desc">
                  Playto Pay integrates with the tools your team already uses. Pre-built connectors get you live in days, not months.
                </p>
                <div className="solutions-integrations-grid">
                  {activeSolutionData.integrations.map((integration, index) => (
                    <div key={index} className="solutions-integration-card">
                      <span className="solutions-integration-name">{integration}</span>
                      <span className="solutions-integration-status">Available</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="solutions-actions">
              <button className="btn btn-primary">Talk to Sales</button>
              <button className="btn btn-secondary">Read Full Case Study</button>
              <button className="btn btn-secondary">See All Integrations</button>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-trust">
        <div className="solutions-trust-container">
          <h2 className="solutions-trust-title">Trusted by industry leaders</h2>
          <div className="solutions-trust-stats">
            <div className="solutions-trust-stat">
              <span className="solutions-trust-value">50,000+</span>
              <span className="solutions-trust-label">Businesses worldwide</span>
            </div>
            <div className="solutions-trust-stat">
              <span className="solutions-trust-value">$42B+</span>
              <span className="solutions-trust-label">Processed annually</span>
            </div>
            <div className="solutions-trust-stat">
              <span className="solutions-trust-value">190+</span>
              <span className="solutions-trust-label">Countries supported</span>
            </div>
            <div className="solutions-trust-stat">
              <span className="solutions-trust-value">99.99%</span>
              <span className="solutions-trust-label">Uptime SLA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
