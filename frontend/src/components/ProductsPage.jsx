import { useState } from "react";

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState("payouts");
  const [activeTab, setActiveTab] = useState("features");

  const products = [
    {
      id: "payouts",
      title: "Payouts (Blockchain Edition)",
      subtitle: "Immutable Money Movement",
      description: "Send money with absolute certainty. Our blockchain-integrated payout engine mirrors every transaction on a Solidity smart contract, ensuring a tamper-proof audit trail. Automated tax calculation (5%) is handled atomically to keep you compliant effortlessly.",
      icon: "💸",
      color: "indigo",
      features: [
        { title: "On-Chain Registry", desc: "Every payout is cryptographically mirrored on the blockchain for public verifiability." },
        { title: "Atomic Tax Compliance", desc: "Statutory 5% tax is deducted and recorded at the moment of payout creation." },
        { title: "Instant Settlement", desc: "Deliver funds in under 30 seconds to eligible bank accounts in 45+ countries." },
        { title: "Immutable Audit Trail", desc: "Records cannot be modified or deleted, even if the primary database is compromised." },
        { title: "Smart Routing", desc: "AI-powered routing selects the optimal rail for speed, cost, and absolute reliability." },
        { title: "Batch Processing", desc: "Process thousands of payouts in a single atomic transaction with complete transparency." },
        { title: "Multi-currency", desc: "Pay in 135+ currencies with competitive FX rates and automatic conversion." },
        { title: "Compliance Checks", desc: "Built-in KYC/KYB verification and sanctions screening for every on-chain record." }
      ],
      stats: [
        { value: "100%", label: "Data Integrity" },
        { value: "< 30s", label: "Instant speed" },
        { value: "0.5%", label: "Transaction Fee" },
        { value: "5%", label: "Auto-Tax" }
      ],
      useCases: [
        "Immutable marketplace payouts",
        "Trust-first freelancer payments",
        "Transparent insurance claim disbursements",
        "Compliant affiliate commission payouts",
        "Secure creator monetization"
      ],
      codeExample: `const payout = await payoutEngine.payouts.create({
  amount_paise: 5000000,
  currency: 'inr',
  destination: {
    type: 'bank_account',
    account_id: 'ba_71C7656EC7ab88b0'
  },
  blockchain_mirror: true,
  auto_tax: true,
  description: 'Project Delivery - Milestone 1'
});
// => blockchain_tx_hash: 0x7a5e...`
    },
    {
      id: "ledger",
      title: "Atomic Ledger",
      subtitle: "The Source of Truth",
      description: "A high-performance, double-entry accounting system designed for internet-scale platforms. Built on PostgreSQL with row-level serialization, it guarantees that your balances are always accurate and your audit trail is unbreakable.",
      icon: "📒",
      color: "purple",
      features: [
        { title: "Double-Entry Design", desc: "Every movement of money is recorded as a debit and a credit, ensuring the books always balance." },
        { title: "Row-Level Locking", desc: "Prevents double-spending and race conditions by serializing balance updates at the database level." },
        { title: "High Concurrency", desc: "Optimized for massive burst traffic without sacrificing transactional integrity." },
        { title: "Paise Precision", desc: "Stored as BigIntegers to avoid IEEE 754 floating-point rounding errors." },
        { title: "Full History", desc: "Never-deleting audit trail of every balance change for the lifetime of the account." },
        { title: "Real-time Reporting", desc: "Get sub-second insights into your platform's total available and held balances." }
      ],
      stats: [
        { value: "0.00", label: "Rounding Error" },
        { value: "100ms", label: "Query Latency" },
        { value: "Unlimited", label: "Throughput" }
      ],
      useCases: [
        "Platform wallet management",
        "Complex escrow logic",
        "Internal fund tracking",
        "Audit-ready financial reporting"
      ],
      codeExample: `const balance = await ledger.merchants.getBalance('mer_123');
// => { available: 450000, held: 120000 }`
    }
  ];

  const activeProductData = products.find((p) => p.id === activeProduct);

  const tabs = [
    { id: "features", label: "Capabilities" },
    { id: "code", label: "API Reference" },
    { id: "usecases", label: "Industry Use Cases" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="section-label">Our Product Suite</span>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Infrastructure built for <span className="text-indigo-600">Absolute Trust</span>.
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From immutable blockchain payouts to high-performance atomic ledgers, we provide the tools to build the future of internet finance.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    className={`w-full text-left p-6 rounded-3xl transition-all border ${
                      activeProduct === product.id
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 border-indigo-600"
                        : "bg-white text-slate-600 hover:bg-slate-50 border-slate-100"
                    }`}
                    onClick={() => setActiveProduct(product.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        activeProduct === product.id ? "bg-white/20" : "bg-indigo-50"
                      }`}>
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{product.title}</h3>
                        <p className={`text-sm ${activeProduct === product.id ? "text-indigo-100" : "text-slate-400"}`}>
                          {product.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="glass-card p-10 rounded-[40px] border border-slate-100">
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{activeProductData.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {activeProductData.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {activeProductData.stats.map((stat, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                      <div className="text-2xl font-black text-indigo-600 mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex border-b border-slate-100 mb-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 ${
                        activeTab === tab.id
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-scale">
                    {activeProductData.features.map((feature, index) => (
                      <div key={index} className="group">
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "code" && (
                  <div className="animate-fade-in-scale">
                    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                      <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Node.js SDK</span>
                      </div>
                      <pre className="p-8 text-sm font-mono text-indigo-100 leading-relaxed overflow-x-auto">
                        <code>{activeProductData.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === "usecases" && (
                  <div className="animate-fade-in-scale">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeProductData.useCases.map((useCase, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                            ✓
                          </div>
                          <span className="font-bold text-emerald-800">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap gap-4">
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100 hover-lift">
                    Get Started Free
                  </button>
                  <button className="bg-white text-slate-600 border border-slate-200 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-black mb-6">Scale with confidence.</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of platforms moving money across borders with absolute certainty and on-chain verifiability.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-indigo-500 text-white px-10 py-4 rounded-full font-black text-lg hover-lift shadow-2xl shadow-indigo-500/20">
              Create Free Account
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
