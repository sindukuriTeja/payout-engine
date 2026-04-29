import React from 'react';

const ProblemSolution = () => {
  const issues = [
    {
      problem: "Traditional banks hold cross-border payments for 3-5 days to 'verify' funds.",
      fix: "Our automated ledger combined with smart contracts allows for near-instant verification and disbursement.",
      label: "Latency Fix",
      icon: "⏱️"
    },
    {
      problem: "Centralized financial records can be altered, leading to 'missing' money or auditing nightmares.",
      fix: "Every transaction is mirrored to an immutable blockchain, providing a permanent, unchangeable proof of payment.",
      label: "Integrity Fix",
      icon: "🛡️"
    },
    {
      problem: "Calculating taxes and compliance fees manually is error-prone and leads to regulatory fines.",
      fix: "Atomic tax deduction (5%) is built into the payout path—if the tax isn't recorded, the payout doesn't happen.",
      label: "Compliance Fix",
      icon: "🏛️"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label bg-white/10 text-indigo-300">Real World Impact</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Fixing the <span className="text-indigo-400">Broken Payout</span> Experience.
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Global commerce is fast, but global payouts are stuck in the 90s. We bridge the gap between digital velocity and financial reliability.
            </p>
            <div className="flex space-x-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-1">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-slate-400">Reduction in Audit Time</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-1">
                <div className="text-3xl font-bold text-white mb-2">0.0%</div>
                <div className="text-sm text-slate-400">Data Tampering Risk</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {issues.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        The Problem
                      </span>
                      <h3 className="text-lg font-semibold text-slate-300 mt-1 leading-snug">
                        {item.problem}
                      </h3>
                    </div>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl relative overflow-hidden group-hover:bg-emerald-500/15 transition-colors">
                      <div className="absolute top-0 right-0 p-2">
                        <span className="solved-badge">Solved</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center mb-2">
                        Our Solution
                      </span>
                      <p className="text-emerald-50 font-medium leading-relaxed">
                        {item.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
