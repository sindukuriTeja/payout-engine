export default function MerchantSelector({ merchants, selectedId, onChange }) {
  return (
    <div className="merchant-selector">
      <label className="merchant-selector-label">Select Merchant</label>
      <select
        className="merchant-select"
        value={selectedId || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {merchants.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} — {m.email}
          </option>
        ))}
      </select>
    </div>
  );
}
