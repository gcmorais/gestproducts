import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate

interface User {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  hashPassword: string;
  saltPassword: string;
  categories: any[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, fullname: string, username: string, password: string, confirmPassword: string, navigate: Function) => void;
  logout: () => void;
  token: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const tokenPayload = JSON.parse(atob(storedToken.split(".")[1])); 
          const userId = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          const response = await axios.get(`https://localhost:7280/api/User/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log("Token not found in local storage");
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://localhost:7280/api/auth/login", { username, password });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
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

      const response = await axios.post("https://localhost:7280/api/auth/register", {
        email,
        fullname,
        username,
        password,
        confirmPassword,
      });

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
    setUser(null);
    navigate("/"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, token, user }}>
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
