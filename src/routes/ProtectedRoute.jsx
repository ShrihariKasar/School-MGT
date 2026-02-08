import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();

  /* ===== SHOW LOADING WHILE AUTH IS CHECKING ===== */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  /* ===== NOT LOGGED IN ===== */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ===== WRONG ROLE ===== */
  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/staff"}
        replace
      />
    );
  }

  /* ===== ACCESS GRANTED ===== */
  return children;
}