import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, fullname: string, username: string, password: string, confirmPassword: string, navigate: Function) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://localhost:7280/api/auth/login",
        { username, password }
      );

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      throw new Error("Invalid credentials or server error.");
    }
  };

  const register = async (
    email: string,
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string,
    navigate: Function
  ) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }
  
      const response = await axios.post(
        "https://localhost:7280/api/auth/register",
        {
          email,
          fullname,
          username,
          password,
          confirmPassword
        }
      );
  
      if (response.data) {
        alert("Account created successfully! Please log in.");
        navigate("/");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw new Error(error.response?.data?.message || "Server error during registration.");
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
