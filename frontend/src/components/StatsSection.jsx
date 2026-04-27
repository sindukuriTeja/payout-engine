import { MerchantIcon, PayoutIcon, BalanceIcon, ProcessingIcon } from "./Icons";

function formatINR(paise) {
  if (paise == null) return "—";
  const rupees = Math.floor(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export default function StatsSection({ payouts, balance }) {
  const totalPayouts = payouts?.length || 0;
  const processingCount = payouts?.filter(p => p.status === "PROCESSING").length || 0;
  const completedCount = payouts?.filter(p => p.status === "COMPLETED").length || 0;
  const totalVolume = payouts?.reduce((sum, p) => sum + (p.amount_paise || 0), 0) || 0;

  const stats = [
    {
      label: "Total Payouts",
      value: totalPayouts,
      icon: PayoutIcon,
      color: "purple",
    },
    {
      label: "Total Volume",
      value: formatINR(totalVolume),
      icon: BalanceIcon,
      color: "green",
    },
    {
      label: "Processing",
      value: processingCount,
      icon: ProcessingIcon,
      color: "blue",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: MerchantIcon,
      color: "yellow",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">The backbone of global commerce</h2>
          <p className="stats-subtitle">
            Real-time metrics from our payout engine
          </p>
        </div>

        <div className="stats-grid">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div className={`stat-icon ${color}`}>
                <Icon size={28} />
              </div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
