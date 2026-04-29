import { useState } from "react";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState("ecommerce");
  const [activeTab, setActiveTab] = useState("overview");

  const solutions = [
    {
      id: "ecommerce",
      title: "E-commerce & Marketplaces",
      icon: "🛒",
      tagline: "Automate multi-vendor payouts with on-chain trust",
      description: "Scale your marketplace without the reconciliation headache. Our solution automates vendor payouts, handles instant refunds, and mirrors every settlement on the blockchain to eliminate vendor disputes before they happen.",
      benefits: [
        { title: "Vendor Trust", desc: "Show your vendors immutable proof of payment recorded on the blockchain registry." },
        { title: "Split Settlements", desc: "Automatically split order revenue between platform fees, taxes, and vendor earnings." },
        { title: "Instant Refunds", desc: "Improve customer NPS with instant refund processing and automated vendor clawbacks." }
      ],
      stats: [
        { value: "85%", label: "Ops Time Saved" },
        { value: "0%", label: "Ledger Discrepancy" },
        { value: "40%", label: "Vendor NPS Boost" }
      ],
      challenges: [
        "Manual payout processing taking 5+ days",
        "Vendor disputes over 'missing' or delayed funds",
        "Complex tax reconciliation across multiple states"
      ],
      caseStudy: {
        company: "ShopFlow Global",
        metric: "Processed $2.1M in first month",
        quote: "Switching to the Blockchain Payout Engine eliminated our weekly reconciliation meetings. The vendors love the transparency."
      }
    },
    {
      id: "saas",
      title: "SaaS & Affiliate Platforms",
      icon: "☁️",
      tagline: "Recursive revenue sharing made simple",
      description: "Manage complex affiliate tiers, partner revenue shares, and reseller commissions. Our atomic ledger ensures that every commission is calculated to the paise and disbursed exactly when it's earned.",
      benefits: [
        { title: "Atomic Splits", desc: "Calculate and lock commissions the moment a subscription payment is successful." },
        { title: "Global Reach", desc: "Pay out to partners in 45+ countries using local rails with real-time conversion." },
        { title: "Self-Serve Dashboards", desc: "Provide partners with a white-label dashboard to track their on-chain earnings." }
      ],
      stats: [
        { value: "135+", label: "Currencies supported" },
        { value: "5min", label: "Partner Onboarding" },
        { value: "100%", label: "Audit Compliance" }
      ],
      challenges: [
        "Calculating tiered commissions manually in spreadsheets",
        "High FX fees eating into partner margins",
        "Lack of transparency for international affiliates"
      ],
      caseStudy: {
        company: "Streamline SaaS",
        metric: "Scaled to 5,000+ affiliates",
        quote: "The auto-tax compliance alone saved our accounting team 20 hours a week. It's a game changer for SaaS platforms."
      }
    },
    {
      id: "gig",
      title: "Gig Economy & Freelance",
      icon: "🚀",
      tagline: "High-velocity payouts for the global workforce",
      description: "Built for the speed of the modern workforce. Deliver earnings to freelancers and contractors instantly, ensuring high retention and trust through transparent, on-chain proof of work and payment.",
      benefits: [
        { title: "Real-time Payouts", desc: "Move money as soon as the job is marked complete—no more net-30 wait times." },
        { title: "Statutory Compliance", desc: "Automatically handle professional tax and GST deductions at the source." },
        { title: "Immutable Records", desc: "Protect your platform against fraudulent 'non-payment' claims with on-chain proofs." }
      ],
      stats: [
        { value: "< 2s", label: "Transaction Speed" },
        { value: "10k+", label: "Daily Disbursements" },
        { value: "99.9%", label: "Uptime SLA" }
      ],
      challenges: [
        "High churn due to delayed payments",
        "Difficulty tracking hundreds of individual tax liabilities",
        "Disputes over project-based milestone payments"
      ],
      caseStudy: {
        company: "WorkWave India",
        metric: "0% late payment rate",
        quote: "Our freelancers now get paid the same day the client approves the work. The blockchain registry has ended all payment disputes."
      }
    }
  ];

  const activeSolutionData = solutions.find((s) => s.id === activeSolution);

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="section-label bg-white/10 text-indigo-300">Industry Solutions</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Financial Rails for <span className="text-indigo-400">Every Vertical</span>.
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We've engineered industry-specific infrastructure to solve the unique trust and compliance challenges of modern digital business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-4">
                {solutions.map((sol) => (
                  <button
                    key={sol.id}
                    className={`w-full text-left p-8 rounded-3xl transition-all border-2 ${
                      activeSolution === sol.id
                        ? "bg-white border-indigo-600 shadow-2xl shadow-indigo-100"
                        : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                    }`}
                    onClick={() => setActiveSolution(sol.id)}
                  >
                    <div className="flex items-center space-x-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                        activeSolution === sol.id ? "bg-indigo-600 text-white" : "bg-slate-200"
                      }`}>
                        {sol.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-xl ${activeSolution === sol.id ? "text-slate-900" : "text-slate-500"}`}>
                          {sol.title}
                        </h3>
                        <p className="text-sm font-medium mt-1">
                          {sol.tagline}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="glass-card p-10 md:p-12 rounded-[48px] border border-slate-100 animate-fade-in-scale">
                <div className="mb-12">
                  <h2 className="text-4xl font-black text-slate-900 mb-6">{activeSolutionData.title}</h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {activeSolutionData.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {activeSolutionData.stats.map((stat, index) => (
                    <div key={index} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 text-center hover-lift">
                      <div className="text-3xl font-black text-indigo-600 mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-8 border-b border-slate-100 mb-12">
                  {["overview", "benefits", "casestudy"].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-6 px-2 text-sm font-bold transition-all border-b-4 uppercase tracking-widest ${
                        activeTab === tab
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-10 animate-fade-in-scale">
                    <div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Core Industry Challenges</h4>
                      <div className="space-y-4">
                        {activeSolutionData.challenges.map((challenge, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">✕</span>
                            <p className="text-slate-600 font-medium">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-200">
                      <h4 className="text-lg font-bold mb-4">Why Blockchain Payouts?</h4>
                      <p className="text-indigo-100 leading-relaxed italic">
                        "For {activeSolutionData.id}, trust is everything. By mirroring settlements on-chain, we move the source of truth from a private database to a public protocol, eliminating 99% of vendor friction."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "benefits" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-scale">
                    {activeSolutionData.benefits.map((benefit, index) => (
                      <div key={index} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "casestudy" && (
                  <div className="animate-fade-in-scale">
                    <div className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-20">
                        <span className="text-8xl font-black">"</span>
                      </div>
                      <div className="relative z-10">
                        <div className="inline-block px-4 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                          Customer Success
                        </div>
                        <h3 className="text-2xl font-bold mb-6 leading-tight">
                          {activeSolutionData.caseStudy.quote}
                        </h3>
                        <div className="flex items-center justify-between border-t border-white/10 pt-8">
                          <div>
                            <div className="font-black text-xl text-white">{activeSolutionData.caseStudy.company}</div>
                            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest">{activeSolutionData.caseStudy.metric}</div>
                          </div>
                          <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-400 hover:text-white transition-all">
                            Read Case Study
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-16 pt-10 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-slate-400 text-sm font-medium">Ready to transform your {activeSolutionData.id} payouts?</p>
                  <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-black text-sm shadow-xl shadow-indigo-100 hover-lift">
                    Schedule Demo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Deploy your next-gen financial rail today.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-indigo-600 px-12 py-5 rounded-full font-black text-lg hover-lift">
              Create Developer Account
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
          <p className="mt-10 text-indigo-200 font-medium">
            Join 50,000+ businesses scaling with Playto Pay.
          </p>
        </div>
      </section>
    </div>
  );
}
