import React from 'react';

const ResearchGapsSection = ({ onExplore }) => {
  const gaps = [
    {
      id: "01",
      title: "Trust Decentralization Gap",
      desc: "Traditional payout systems operate as closed 'black boxes.' Merchants must trust internal databases blindly. We bridge this with a dual-ledger system that mirrors every transaction to a public blockchain for immutable proof.",
      icon: "🛡️",
      accent: "from-indigo-500 to-blue-600",
      lightAccent: "bg-indigo-50"
    },
    {
      id: "02",
      title: "Atomic Compliance Gap",
      desc: "Manual tax reconciliation is slow and error-prone, leading to financial desync. We've integrated statutory-path logic directly into the payout critical path, ensuring 5% tax is deducted atomically at the moment of payment.",
      icon: "🏛️",
      accent: "from-emerald-500 to-teal-600",
      lightAccent: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Architectural Foundations
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
            Bridging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Research Gaps</span>.
          </h2>
          <p className="max-w-2xl text-xl text-slate-500 leading-relaxed font-medium">
            We've identified and solved the structural weaknesses in modern fintech that prevent absolute transparency and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {gaps.map((gap) => (
            <div 
              key={gap.id}
              className="group relative p-1 bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-700 cursor-pointer overflow-hidden border border-slate-100"
              onClick={onExplore}
            >
              {/* Card Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gap.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>
              
              <div className="relative p-12 md:p-16 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex flex-col">
                    <span className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b ${gap.accent} opacity-10 group-hover:opacity-20 transition-all duration-700 mb-2`}>
                      {gap.id}
                    </span>
                    <div className={`h-1.5 w-12 bg-gradient-to-r ${gap.accent} rounded-full`}></div>
                  </div>
                  <div className={`w-24 h-24 ${gap.lightAccent} rounded-[32px] flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                    {gap.icon}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-indigo-600 transition-colors">
                  {gap.title}
                </h3>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                  {gap.desc}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onExplore();
                    }}
                    className={`group/btn relative w-full overflow-hidden bg-slate-900 py-6 rounded-3xl text-white font-black text-lg transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/20 hover:-translate-y-1`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${gap.accent} translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500`}></div>
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span>View Technical Analysis</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button 
            onClick={onExplore}
            className="inline-flex items-center space-x-3 text-slate-400 hover:text-indigo-600 font-bold transition-all text-lg group"
          >
            <span className="w-12 h-[1px] bg-slate-200 group-hover:w-20 group-hover:bg-indigo-200 transition-all"></span>
            <span>Explore full engineering documentation in EXPLAINER.md</span>
            <span className="w-12 h-[1px] bg-slate-200 group-hover:w-20 group-hover:bg-indigo-200 transition-all"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResearchGapsSection;
