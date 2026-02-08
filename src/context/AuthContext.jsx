import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER FROM LOCAL STORAGE ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("school_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* ================= LOGIN ================= */
  const login = (role) => {
    const newUser = {
      role,
      name: role === "admin" ? "Principal" : "Teacher",
    };

    localStorage.setItem("school_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("school_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ================= CUSTOM HOOK ================= */
export const useAuth = () => useContext(AuthContext);