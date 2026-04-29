import { useState } from "react";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("library");

  const resources = [
    {
      id: 1, category: "guides", title: "Blockchain Payout Fundamentals",
      description: "Learn how we use Solidity smart contracts to create a tamper-proof audit trail for every money movement. Essential for trust-focused platforms.",
      type: "Guide", readTime: "12 min read", icon: "🔗", featured: true
    },
    {
      id: 2, category: "guides", title: "Compliance & Auto-Tax Strategy",
      description: "A deep dive into how our atomic 5% tax deduction logic works and how it keeps your platform compliant with global financial regulations.",
      type: "Guide", readTime: "8 min read", icon: "🏛️"
    },
    {
      id: 3, category: "tutorials", title: "Building a Transparent Marketplace",
      description: "End-to-end tutorial: split payments at checkout, handle vendor payouts, and provide immutable proof-of-payment to your sellers.",
      type: "Tutorial", readTime: "25 min read", icon: "🎯", featured: true
    },
    {
      id: 4, category: "api", title: "Web3.py Bridge Reference",
      description: "Complete documentation for the Payout Engine's blockchain bridge. Learn how to verify transactions directly on the EVM chain.",
      type: "API Docs", icon: "⚡", featured: true
    },
    {
      id: 5, category: "guides", title: "Securing your Payout Rails",
      description: "Best practices for API key management, signature verification, and role-based access control for your financial infrastructure.",
      type: "Guide", readTime: "15 min read", icon: "🛡️"
    },
    {
      id: 6, category: "tutorials", title: "Implementing Webhook Retries",
      description: "Learn how to build a resilient notification system that handles network failures and ensures 100% event delivery.",
      type: "Tutorial", readTime: "10 min read", icon: "🔔"
    }
  ];

  const changelog = [
    { date: "April 2026", version: "v2.1.0", title: "Blockchain Mirroring Launch", tag: "Major", description: "Successfully launched the PayoutRegistry.sol integration. All production payouts are now mirrored to the blockchain." },
    { date: "March 2026", version: "v2.0.4", title: "Atomic Tax Deduction", tag: "Feature", description: "Integrated statutory 5% tax calculation directly into the ledger critical path for immediate compliance." },
    { date: "February 2026", version: "v2.0.0", title: "UI Redesign & Performance", tag: "Improvement", description: "Complete overhaul of the merchant dashboard with glassmorphism and real-time polling improvements." }
  ];

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[140px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="section-label">Knowledge Hub</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Master the Future of <span className="text-indigo-600">Financial Trust</span>.
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, scale, and secure your payout infrastructure with blockchain-backed integrity.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-16">
            <div className="bg-slate-100 p-1.5 rounded-full flex space-x-2">
              {[
                { id: "library", label: "Resource Library" },
                { id: "changelog", label: "Changelog" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                    activeSection === tab.id
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveSection(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeSection === "library" ? (
            <div className="animate-fade-in-scale">
              <div className="flex flex-wrap gap-4 mb-12 justify-center">
                {["all", "guides", "tutorials", "api"].map((cat) => (
                  <button
                    key={cat}
                    className={`px-6 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                      activeCategory === cat
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-white border-slate-100 text-slate-500 hover:border-indigo-100"
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((res, idx) => (
                  <div key={res.id} className="glass-card p-10 rounded-[40px] hover-lift group border border-slate-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {res.icon}
                      </div>
                      <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{res.type}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                      {res.description}
                    </p>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <span className="text-xs font-bold text-slate-400">{res.readTime || "Documentation"}</span>
                      <button className="text-indigo-600 font-bold text-sm hover:underline">Read Now →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in-scale">
              <div className="space-y-12">
                {changelog.map((entry, idx) => (
                  <div key={idx} className="relative pl-12 border-l-2 border-slate-100 pb-12 last:pb-0">
                    <div className="absolute top-0 -left-[11px] w-5 h-5 bg-white border-4 border-indigo-600 rounded-full shadow-lg shadow-indigo-100"></div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm font-black text-indigo-600">{entry.date}</span>
                      <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-md">{entry.version}</span>
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                        entry.tag === "Major" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      }`}>{entry.tag}</span>
                    </div>
                    <div className="glass-card p-10 rounded-[40px] border border-slate-50">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{entry.title}</h3>
                      <p className="text-lg text-slate-500 leading-relaxed mb-6">{entry.description}</p>
                      <button className="text-indigo-600 font-bold text-sm hover:underline">View Release Notes →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-black mb-8 leading-tight">Can't find what you're looking for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: "🚀", title: "Direct Onboarding", desc: "Start sending payouts in under 5 minutes.", btn: "Create Account" },
              { icon: "💬", title: "Discord Community", desc: "Join 15k+ devs building on Payout Engine.", btn: "Join Server" },
              { icon: "🟢", title: "System Status", desc: "Check real-time system health and uptime.", btn: "View Status" }
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all">
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{card.desc}</p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-400 hover:text-white transition-all text-sm">
                  {card.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
