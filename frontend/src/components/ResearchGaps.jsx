import React, { useState, useEffect } from 'react';

const ResearchGaps = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gaps = [
    {
      id: "01",
      title: "Trust Decentralization Gap",
      problem: "Current systems are 'black boxes.' Merchants must trust the platform's database blindly with no independent way to verify transaction integrity.",
      impact: "High: Data tampering risk and total lack of transparency for critical financial operations.",
      solution: "Dual-Ledger Immutability",
      solutionDesc: "We mirror every PostgreSQL transaction to a Solidity Smart Contract. This creates a permanent, publicly verifiable proof of payment that exists independently of our central servers.",
      icon: "🛡️",
      color: "indigo"
    },
    {
      id: "02",
      title: "Atomic Compliance Gap",
      problem: "Tax and fee deductions are often calculated in separate background jobs, leading to 'stale' available balances and reconciliation nightmares.",
      impact: "Medium: Financial desync, regulatory risk, and merchant confusion regarding actual spendable funds.",
      solution: "Statutory Path Integration",
      solutionDesc: "Atomic tax deduction (5%) is built directly into the payout critical path. The system debits 'amount + tax' in a single database transaction—guaranteeing perfectly balanced ledgers.",
      icon: "🏛️",
      color: "emerald"
    },
    {
      id: "03",
      title: "Concurrency & Race Conditions",
      problem: "Standard implementations often fail to handle high-load bursts, leading to double-spending or negative balances under simultaneous API requests.",
      impact: "Critical: Monetary loss and ledger corruption that is impossible to resolve without manual intervention.",
      solution: "Row-Level Serialization",
      solutionDesc: "We implement SELECT FOR UPDATE locking at the database level. This serializes every request for a specific merchant, making double-spending mathematically impossible.",
      icon: "⚡",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Technical Analysis</span>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Research <span className="text-indigo-600">Gaps</span> in Modern Payouts.
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-500 leading-relaxed">
            Identifying the structural weaknesses in legacy payment infrastructure and the engineering solutions we've implemented to bridge them.
          </p>
        </div>

        {/* Interactive Tabs/Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {gaps.map((gap, idx) => (
            <button
              key={gap.id}
              onClick={() => setActiveTab(idx)}
              className={`px-8 py-4 rounded-2xl font-black transition-all duration-300 flex items-center space-x-3 shadow-lg ${
                activeTab === idx 
                ? 'bg-slate-900 text-white scale-105 ring-4 ring-slate-200' 
                : 'bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-2xl">{gap.icon}</span>
              <span>{gap.id} {gap.title}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-scale">
          <div className="flex flex-col lg:flex-row">
            {/* Problem Side */}
            <div className="lg:w-1/2 p-12 md:p-16 bg-slate-50 border-r border-slate-100">
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold">!</span>
                  <span className="text-sm font-black text-red-500 uppercase tracking-widest">The Research Gap</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{gaps[activeTab].title}</h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {gaps[activeTab].problem}
                </p>
                <div className="p-6 bg-white rounded-3xl border border-slate-200 border-l-4 border-l-red-500">
                  <div className="text-xs font-black text-slate-400 uppercase mb-2">Architectural Impact</div>
                  <p className="text-slate-700 font-medium">{gaps[activeTab].impact}</p>
                </div>
              </div>
            </div>

            {/* Solution Side */}
            <div className="lg:w-1/2 p-12 md:p-16 relative">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl opacity-50">
                  {gaps[activeTab].icon}
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">✓</span>
                  <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">Our Solution</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{gaps[activeTab].solution}</h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {gaps[activeTab].solutionDesc}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 font-bold">01</div>
                    <span className="text-slate-700 font-bold">On-chain mirrored state validation</span>
                  </div>
                  <div className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 font-bold">02</div>
                    <span className="text-slate-700 font-bold">Cryptographic proof of disbursement</span>
                  </div>
                </div>

                <button className="mt-12 w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3 group">
                  <span>View Technical Documentation</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 font-medium">
            Based on research from <span className="text-slate-900 font-bold">EXPLAINER.md</span> and current industry benchmarks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchGaps;
