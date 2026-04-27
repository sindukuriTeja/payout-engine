import { WalletIcon } from "./Icons";

function formatINR(paise) {
  const rupees = Math.floor(paise / 100);
  const paisePart = paise % 100;
  return `₹${rupees.toLocaleString("en-IN")}.${String(paisePart).padStart(2, "0")}`;
}

export default function BalanceCard({ label, paise, color, icon: Icon }) {
  return (
    <div className={`balance-card ${color}`}>
      <p className="balance-label">
        {Icon && <Icon size={16} />}
        {label}
      </p>
      <p className="balance-amount">{formatINR(paise)}</p>
      <p className="balance-sub">{paise.toLocaleString()} paise</p>
    </div>
  );
}
