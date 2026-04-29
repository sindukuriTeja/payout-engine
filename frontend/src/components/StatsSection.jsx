import { MerchantIcon, PayoutIcon, BalanceIcon, ProcessingIcon } from "./Icons";

function formatINR(paise) {
  if (paise == null) return "₹0";
  const rupees = Math.floor(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export default function StatsSection({ payouts, balance }) {
  const totalVolume = payouts?.reduce((sum, p) => sum + (p.amount_paise || 0), 0) || 0;
  const totalTax = payouts?.reduce((sum, p) => sum + (p.tax_paise || (p.amount_paise * 0.05)), 0) || 0;
  const completedVolume = payouts?.filter(p => p.status === "COMPLETED").reduce((sum, p) => sum + (p.amount_paise || 0), 0) || 0;
  const processingVolume = payouts?.filter(p => p.status === "PROCESSING").reduce((sum, p) => sum + (p.amount_paise || 0), 0) || 0;

  const stats = [
    {
      label: "Money Sent",
      value: formatINR(totalVolume),
      sublabel: "Total initiated payouts",
      icon: PayoutIcon,
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-200",
    },
    {
      label: "Money Received",
      value: formatINR(completedVolume),
      sublabel: "Successfully settled",
      icon: BalanceIcon,
      gradient: "from-green-500 to-emerald-600",
      shadow: "shadow-green-200",
    },
    {
      label: "Tax Deducted",
      value: formatINR(totalTax),
      sublabel: "Compliance & Fees",
      icon: ProcessingIcon,
      gradient: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-200",
    },
    {
      label: "In Processing",
      value: formatINR(processingVolume),
      sublabel: "Pending settlement",
      icon: MerchantIcon,
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-200",
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Financial Transparency at Scale
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real-time insights into your global payout operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ label, value, sublabel, icon: Icon, gradient, shadow }, idx) => (
            <div 
              key={label} 
              className={`glass-card hover-lift p-8 rounded-3xl border border-gray-100 transition-all animate-fade-in-scale`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200/50`}>
                <Icon size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <div className="text-3xl font-black text-gray-900 tracking-tight">{value}</div>
                <p className="text-xs text-indigo-500 font-semibold">{sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
