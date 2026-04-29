import { useState } from "react";

export default function DevelopersPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("node");
  const [activeSection, setActiveSection] = useState("api");

  const codeExamples = {
    node: `import PayoutEngine from '@payout-engine/node';

const client = new PayoutEngine('sk_live_...');

// Create a blockchain-mirrored payout
const payout = await client.payouts.create({
  amount_paise: 5000000,
  currency: 'inr',
  destination: {
    type: 'bank_account',
    account_id: 'ba_71C7656EC7ab88b0'
  },
  blockchain_mirror: true,
  auto_tax: true
});

console.log(payout.blockchain_tx_hash); 
// 0x7a5e84d9f6b2...`,
    python: `import payout_engine

client = payout_engine.Client('sk_live_...')

# Create a blockchain-mirrored payout
payout = client.payouts.create(
    amount_paise=5000000,
    currency='inr',
    destination={
        'type': 'bank_account',
        'account_id': 'ba_71C7656EC7ab88b0'
    },
    blockchain_mirror=True,
    auto_tax=True
)

print(payout.blockchain_tx_hash)
# 0x7a5e84d9f6b2...`,
    go: `package main

import (
    "fmt"
    payout "github.com/payout-engine/payout-go"
)

func main() {
    client := payout.New("sk_live_...")

    p = client.Payouts.Create(&payout.Params{
        AmountPaise: 5000000,
        Currency:    "inr",
        Mirror:      true,
        AutoTax:     true,
    })

    fmt.Println(p.BlockchainTxHash)
}`
  };

  const sections = [
    {
      id: "api",
      title: "API First Architecture",
      icon: "🔌",
      description: "Everything you see in the dashboard is available via our REST API. Built with security and idempotency at its core.",
      features: [
        "RESTful Endpoints",
        "Idempotency Keys",
        "Web3.py Integration",
        "Real-time Webhooks"
      ]
    },
    {
      id: "blockchain",
      title: "Smart Contract Registry",
      icon: "🔗",
      description: "Directly interact with our Solidity smart contracts for decentralized verification of your payout volume.",
      features: [
        "On-Chain Auditing",
        "Public Proof of Payment",
        "EVM Compatibility",
        "Immutable Storage"
      ]
    },
    {
      id: "security",
      title: "Security & Sandbox",
      icon: "🛡️",
      description: "Test your integration in our high-fidelity sandbox before going live. Every sandbox transaction is also mirrored to a testnet.",
      features: [
        "Testnet Mirroring",
        "API Key Scoping",
        "Signature Verification",
        "Role-based Access"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label bg-white/10 text-indigo-300">Developer Experience</span>
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Built by <span className="text-indigo-400">Developers</span>, for the Future.
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Integrate high-trust, blockchain-backed payouts into your application in minutes. Official SDKs for Node.js, Python, and Go.
              </p>
              <div className="flex space-x-4">
                <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-bold hover-lift shadow-lg shadow-indigo-500/20">
                  Read API Docs
                </button>
                <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
                  GitHub Repository
                </button>
              </div>
            </div>

            <div className="animate-fade-in-scale">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex space-x-4">
                    {["node", "python", "go"].map((lang) => (
                      <button
                        key={lang}
                        className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                          selectedLanguage === lang ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                        }`}
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        {lang === "node" ? "Node.js" : lang === "python" ? "Python" : "Go"}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  </div>
                </div>
                <pre className="p-8 text-sm font-mono text-indigo-100 leading-relaxed overflow-x-auto min-h-[400px]">
                  <code>{codeExamples[selectedLanguage]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-label">Core Integration Paths</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Everything you need to <span className="text-indigo-600">build faster</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={section.id} className="glass-card hover-lift p-10 rounded-[40px] animate-fade-in-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-8">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{section.description}</p>
                <div className="space-y-3">
                  {section.features.map((f, i) => (
                    <div key={i} className="flex items-center text-sm font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-[48px] shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Verified on the Smart Contract.</h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Our developers can interact directly with the <code>PayoutRegistry.sol</code> contract on the blockchain. 
                This allows you to verify every payout initiated by your platform without needing to query our API.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center px-6 py-3 bg-slate-900 rounded-2xl text-white font-mono text-sm">
                  <span className="text-indigo-400 mr-3">CONTRACT_ADDR:</span> 0x7a5e84d...27e4
                </div>
                <button className="text-indigo-600 font-bold hover:underline">
                  View on Block Explorer →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-8">Ready to go live?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-indigo-500 text-white px-12 py-5 rounded-full font-black text-lg hover-lift">
              Generate API Keys
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all">
              Join Developer Slack
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
