import { MerchantIcon, PayoutIcon, BalanceIcon, ProcessingIcon } from "./Icons";

function formatINR(paise) {
  if (paise == null) return "—";
  const rupees = Math.floor(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export default function StatsBar({ merchants, payouts, balance }) {
  const totalPayouts = payouts?.length || 0;
  const processingCount = payouts?.filter(p => p.status === "PROCESSING").length || 0;
  const completedCount = payouts?.filter(p => p.status === "COMPLETED").length || 0;
  const failedCount = payouts?.filter(p => p.status === "FAILED").length || 0;

  const stats = [
    {
      label: "Total Merchants",
      value: merchants?.length || 0,
      icon: MerchantIcon,
      color: "indigo",
    },
    {
      label: "Total Payouts",
      value: totalPayouts,
      icon: PayoutIcon,
      color: "blue",
    },
    {
      label: "Available Balance",
      value: formatINR(balance?.available_balance_paise),
      icon: BalanceIcon,
      color: "green",
    },
    {
      label: "Processing",
      value: processingCount,
      icon: ProcessingIcon,
      color: "yellow",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="stat-card">
          <div className={`stat-icon ${color}`}>
            <Icon size={22} />
          </div>
          <div className="stat-content">
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
