import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  googleLoginCustomer
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("fixora-user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("fixora-user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem("fixora-token", res.data.token);
    localStorage.setItem("fixora-user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const register = async (payload) => {
    const res = await registerUser(payload);
    localStorage.setItem("fixora-token", res.data.token);
    localStorage.setItem("fixora-user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const googleLogin = async (googleToken) => {
    const res = await googleLoginCustomer(googleToken);
    localStorage.setItem("fixora-token", res.data.token);
    localStorage.setItem("fixora-user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("fixora-token");
    localStorage.removeItem("fixora-user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
