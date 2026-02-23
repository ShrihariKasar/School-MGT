import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login, loading } = useAuth();

  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    await login(role);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-pulse text-slate-500">
          Initializing System...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 bg-gradient-to-br from-slate-200 via-slate-300 to-emerald-200">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[120px] top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] bottom-[-200px] right-[-200px]" />

      {/* Card */}
      <div className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-white/60 to-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

        <div className="rounded-3xl bg-white backdrop-blur-xl p-10 transition-all duration-300">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
              School Management
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Secure access to your dashboard
            </p>
          </div>

          {/* Role Toggle */}
          <div className="relative flex bg-slate-200 rounded-xl p-1 mb-8 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-lg transition-all duration-300 ${
                role === "admin"
                  ? "left-1 bg-slate-900"
                  : "left-1/2 bg-emerald-600"
              }`}
            />
            <button
              onClick={() => setRole("admin")}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition align-middle flex items-center justify-center gap-2 ${
                role === "admin" ? "text-white" : "text-slate-600"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setRole("staff")}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition align-middle flex items-center justify-center gap-2 ${
                role === "staff" ? "text-white" : "text-slate-600"
              }`}
            >
              Staff
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-6">

            {/* Username */}
            <div className="relative">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-slate-300 bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition"
              />
              <label className={`absolute left-4 transition-all duration-200 ${
                username
                  ? "top-2 text-xs text-slate-900"
                  : "top-4 text-sm text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-slate-900"
              }`}>
                Username
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 pr-14 rounded-xl border border-slate-300 bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition"
              />
              <label className={`absolute left-4 transition-all duration-200 ${
                password
                  ? "top-2 text-xs text-slate-900"
                  : "top-4 text-sm text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-slate-900"
              }`}>
                Password
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-900 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={submitting}
            className="mt-8 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-70 align-middle flex items-center justify-center gap-2"
          >
            {submitting ? "Signing In..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-xs text-slate-400 text-center mt-8">
            © {new Date().getFullYear()} School Management System
          </p>

        </div>
      </div>
    </div>
  );
}