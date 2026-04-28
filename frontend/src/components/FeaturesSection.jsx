import { useEffect, useRef, useState } from "react";
import { LockIcon, DatabaseIcon, KeyIcon, RepeatIcon, FileTextIcon, SpeedIcon } from "./Icons";

const features = [
  {
    title: "Money as Integers",
    description: "All amounts stored as BigInteger paise. No floating-point errors, no rounding issues. Complete financial integrity.",
    icon: DatabaseIcon,
  },
  {
    title: "Concurrency Control",
    description: "SELECT FOR UPDATE locking prevents race conditions. Two simultaneous payouts? Exactly one succeeds.",
    icon: LockIcon,
  },
  {
    title: "Idempotency Keys",
    description: "Merchant-scoped UUID keys with 24h TTL. Duplicate requests return the same result safely.",
    icon: KeyIcon,
  },
  {
    title: "State Machine",
    description: "Enforced state transitions: PENDING → PROCESSING → COMPLETED/FAILED. No backward transitions allowed.",
    icon: RepeatIcon,
  },
  {
    title: "Append-Only Ledger",
    description: "Immutable ledger entries. Balance is always derivable from the complete audit trail.",
    icon: FileTextIcon,
  },
  {
    title: "Exponential Backoff",
    description: "Automatic retries with 30s → 60s → 120s backoff. Self-healing system that survives failures.",
    icon: SpeedIcon,
  },
];

function FeatureCard({ title, description, icon: Icon, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`feature-card ${visible ? "feature-card-visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="feature-icon">
        <Icon size={24} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features-section">
      <div className="features-container">
        <div
          ref={headerRef}
          className={`features-header ${headerVisible ? "features-header-visible" : ""}`}
        >
          <h2 className="features-title">Built for reliability</h2>
          <p className="features-subtitle">
            Enterprise-grade infrastructure with every detail designed for financial integrity
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ title, description, icon }, index) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              icon={icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
