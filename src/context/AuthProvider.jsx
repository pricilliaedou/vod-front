import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("authToken");
    const u = localStorage.getItem("user");
    if (t) {
      setToken(t);
      if (u && u !== "undefined" && u !== "null") {
        try {
          setUser(JSON.parse(u));
        } catch (e) {
          console.error("AuthContext: user JSON parse failed:", e);
          localStorage.removeItem("user");
        }
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const isAuthenticated = !!token;
  const login = (t, u) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("authToken", t);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [token, user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
