import { useState } from "react";

export default function SignUpPage({ onSignUp, onSwitchToSignIn, onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSignUp({ 
        email: formData.email, 
        name: formData.name,
        company: formData.company 
      });
      setIsLoading(false);
    }, 1500);
  };

  const benefits = [
    { icon: "🎁", title: "Free Tier", desc: "1,000 free payouts monthly" },
    { icon: "⚡", title: "Instant Access", desc: "Start sending in minutes" },
    { icon: "📊", title: "Real-time Ops", desc: "Live dashboard tracking" },
    { icon: "🔧", title: "Dev First", desc: "Full API & Sandbox" },
    { icon: "💬", title: "24/7 Support", desc: "Payment experts on call" },
    { icon: "🔒", title: "SOC 2 Ready", desc: "Bank-grade security" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-all font-bold group z-50"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Home</span>
      </button>

      <div className="max-w-6xl w-full bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-slate-100 animate-fade-in-scale">
        
        {/* Right Side: Marketing Content */}
        <div className="md:w-1/2 bg-slate-900 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-xl">P</div>
              <span className="text-2xl font-black tracking-tight">Payout Engine</span>
            </div>

            <h2 className="text-4xl font-black mb-10 leading-tight">
              Start building with the <span className="text-emerald-400">future of payments</span>.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-12 border-t border-white/10 mt-12">
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10">
              <p className="text-slate-300 italic mb-4 leading-relaxed">
                "The blockchain mirroring provides the level of transparency our auditors have been demanding for years."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm">Sarah Chen</div>
                  <div className="text-xs text-slate-500">CTO, NexaFlow Systems</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Signup Form */}
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 mb-8">Join the platform and start sending payouts today.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center space-x-3">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-black">!</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3 ml-1 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 mt-0.5 rounded-md border-slate-200 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm font-medium text-slate-500 leading-snug cursor-pointer">
                  I agree to the <a href="#" className="text-emerald-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-600 font-bold hover:underline">Privacy Policy</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Free Account"
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-slate-500 font-medium">
              Already have an account?{" "}
              <button onClick={onSwitchToSignIn} className="text-emerald-600 font-black hover:underline">Sign in instead</button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
