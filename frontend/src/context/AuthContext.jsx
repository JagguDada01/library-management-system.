import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }
      try {
        const result = await getCurrentUser();
        if (active) {
          setUser(result.user);
        }
      } catch (error) {
        localStorage.removeItem("token");
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  async function login(formData) {
    const result = await loginUser(formData);
    localStorage.setItem("token", result.token);
    setUser(result.user);
    return result.user;
  }

  async function register(formData) {
    const result = await registerUser(formData);
    localStorage.setItem("token", result.token);
    setUser(result.user);
    return result.user;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
