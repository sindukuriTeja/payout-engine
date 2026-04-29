import React from 'react';

const ComparisonSection = () => {
  const comparisons = [
    {
      feature: "Processing Time",
      traditional: "3-5 Business Days",
      payoutEngine: "Near Instant",
      icon: "⚡"
    },
    {
      feature: "Transaction Fees",
      traditional: "2.5% + $0.30",
      payoutEngine: "0.5% Flat",
      icon: "💰"
    },
    {
      feature: "Data Integrity",
      traditional: "Centralized DB (Editable)",
      payoutEngine: "Blockchain (Immutable)",
      icon: "🛡️"
    },
    {
      feature: "Transparency",
      traditional: "Opaque Records",
      payoutEngine: "Publicly Verifiable",
      icon: "👁️"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden glow-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Real-World Benchmarks</span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
            How we solve the <span className="text-indigo-600">Legacy Friction</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Traditional systems are designed for the physical world. We've optimized every layer for the digital economy.
          </p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm relative">
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-400 text-center uppercase tracking-widest mb-8">Traditional Systems</h3>
              {comparisons.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6 grayscale opacity-60 hover:opacity-100 transition-all">
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.feature}</p>
                    <p className="text-xl font-bold text-gray-600">{item.traditional}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-indigo-600 text-center uppercase tracking-widest mb-8">Payout Engine</h3>
              {comparisons.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-2xl flex items-center space-x-6 transform transition hover:scale-105 payout-card-glow">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl text-white shadow-inner">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">{item.feature}</p>
                    <p className="text-xl font-bold text-white">{item.payoutEngine}</p>
                  </div>
                </div>
              ))}
            </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">{item.feature}</p>
                    <p className="text-lg font-bold text-gray-600">{item.traditional}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-indigo-600 text-center uppercase tracking-widest">Payout Engine</h3>
              {comparisons.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-xl flex items-center space-x-4 transform transition hover:scale-105">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-100">{item.feature}</p>
                    <p className="text-lg font-bold text-white">{item.payoutEngine}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
