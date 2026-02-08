import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      {/* Left: Page Title */}
      <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
        Dashboard
      </h1>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium text-slate-700 capitalize">
            {user?.role}
          </span>
          <span className="text-xs text-slate-400">Logged in</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
          {user?.role?.charAt(0).toUpperCase()}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}