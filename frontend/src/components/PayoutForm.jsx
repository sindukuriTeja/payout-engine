import { useState } from "react";
import { createPayout } from "../api";
import { SendIcon, CheckIcon, AlertIcon } from "./Icons";

export default function PayoutForm({ merchantId, onSuccess, isLoggedIn, onNavigateToLogin }) {
  const [amountRupees, setAmountRupees] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const previewPaise = parseInt(amountRupees, 10) > 0
    ? (parseInt(amountRupees, 10) * 100).toLocaleString()
    : null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      onNavigateToLogin();
      return;
    }
    setMessage(null);

    const rupees = parseInt(amountRupees, 10);
    if (!rupees || rupees <= 0) {
      setMessage({ type: "error", text: "Enter a valid amount in rupees" });
      return;
    }
    if (!bankAccountId.trim()) {
      setMessage({ type: "error", text: "Enter a bank account ID" });
      return;
    }

    const amountPaise = rupees * 100;

    setSubmitting(true);
    try {
      const { status, data } = await createPayout(
        merchantId,
        amountPaise,
        bankAccountId.trim()
      );

      if (status === 201) {
        setMessage({
          type: "success",
          text: `Payout created — ${data.id.slice(0, 8)}... (₹${rupees.toLocaleString("en-IN")})`,
        });
        setAmountRupees("");
        setBankAccountId("");
        onSuccess();
      } else {
        setMessage({ type: "error", text: data.error || "Payout failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error — is the backend running?" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card relative overflow-hidden">
      <div className="form-header">
        <h3 className="form-title">
          <SendIcon size={20} />
          Create Payout
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Amount (INR)</label>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 5000"
                value={amountRupees}
                onChange={(e) => setAmountRupees(e.target.value)}
                className="form-input"
              />
              {previewPaise && (
                <p className="form-hint">= {previewPaise} paise</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Bank Account ID</label>
              <input
                type="text"
                placeholder="e.g. HDFC00012345"
                value={bankAccountId}
                onChange={(e) => setBankAccountId(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={submitting} className="btn btn-primary">
              {submitting ? (
                <>Processing...</>
              ) : (
                <>
                  <SendIcon size={18} />
                  Submit Payout
                </>
              )}
            </button>
          </div>

          {message && (
            <div className={`form-message ${message.type}`}>
              {message.type === "success" ? <CheckIcon size={18} /> : <AlertIcon size={18} />}
              {message.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
