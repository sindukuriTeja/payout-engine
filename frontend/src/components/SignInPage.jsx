import { useState } from "react";

export default function SignInPage({ onSignIn, onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        onSignIn({ email, name: email.split("@")[0] });
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 animate-fade-in-scale">
        
        {/* Left Side: Illustration & Marketing */}
        <div className="md:w-1/2 bg-slate-900 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-black text-xl">P</div>
              <span className="text-2xl font-black tracking-tight">Payout Engine</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              The infrastructure for <span className="text-indigo-400">absolute trust</span>.
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              Join thousands of businesses sending secure, blockchain-mirrored payouts worldwide.
            </p>

            <div className="space-y-6">
              {[
                "Immutable on-chain audit trails",
                "Atomic tax compliance & reporting",
                "Near-instant global settlements"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center text-xs">✓</div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-16 border-t border-white/10 mt-16">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" alt="" />
                ))}
              </div>
              <p className="text-sm text-slate-400 font-medium">
                <span className="text-white font-bold">50k+</span> merchants already trust us
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500 mb-10">Enter your credentials to access your dashboard.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center space-x-3">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-black">!</span>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
                </div>
                <input
                  type="password"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-3 ml-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-5 h-5 rounded-md border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-sm font-medium text-slate-500 cursor-pointer">Keep me signed in</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in to Dashboard"
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-400 bg-white px-4">Or continue with</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-3 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5" alt="" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </button>
            </div>

            <p className="mt-12 text-center text-slate-500 font-medium">
              New to Payout Engine?{" "}
              <button onClick={onSwitchToSignUp} className="text-indigo-600 font-black hover:underline">Create a free account</button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
