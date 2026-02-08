import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login, loading } = useAuth();

  const [role, setRole] = useState("admin");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* ===== LEFT: Branding Section ===== */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">School Management System</h1>
        <p className="text-slate-300 text-center max-w-sm">
          Manage students, staff, attendance, and school operations with a
          modern, intelligent dashboard designed for administrators and
          teachers.
        </p>
      </div>

      {/* ===== RIGHT: Login Form ===== */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Select your role to continue
          </p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole("admin")}
              className={`py-2 rounded-lg border text-sm font-medium transition ${
                role === "admin"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Admin
            </button>

            <button
              onClick={() => setRole("staff")}
              className={`py-2 rounded-lg border text-sm font-medium transition ${
                role === "staff"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Staff
            </button>
          </div>

          {/* Fake Inputs (UI only for now) */}
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          {/* Login Button */}
          <button
            onClick={() => login(role)}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-xs text-slate-400 text-center mt-6">
            © {new Date().getFullYear()} School ERP System
          </p>
        </div>
      </div>
    </div>
  );
}