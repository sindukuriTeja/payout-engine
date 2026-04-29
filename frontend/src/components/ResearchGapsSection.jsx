import React from 'react';

const ResearchGapsSection = ({ onExplore }) => {
  const gaps = [
    {
      id: "01",
      title: "Trust Decentralization Gap",
      desc: "Legacy systems rely on closed databases. We bridge this with on-chain mirroring.",
      icon: "🛡️"
    },
    {
      id: "02",
      title: "Atomic Compliance Gap",
      desc: "Manual reconciliation causes errors. We solve this with statutory-path deductions.",
      icon: "🏛️"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-2 block">Project Foundations</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Research Gaps.</h2>
          </div>
          <button 
            onClick={onExplore}
            className="mt-6 md:mt-0 text-indigo-600 font-black flex items-center space-x-2 hover:translate-x-1 transition-transform"
          >
            <span>Explore full analysis</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gaps.map((gap) => (
            <div 
              key={gap.id}
              className="group p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 cursor-pointer"
              onClick={onExplore}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-6xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors">{gap.id}</span>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {gap.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{gap.title}</h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">{gap.desc}</p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onExplore();
                }}
                className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl text-indigo-600 font-black group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300"
              >
                View Analysis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchGapsSection;
