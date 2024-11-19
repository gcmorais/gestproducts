import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ImageBox from "../../components/ImageBox/ImageBox";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-2xl bg-white shadow-lg">
        <ImageBox />
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <Header
            text="Don’t have an account?"
            description="Get Register Now."
            linkTo="/register"
          />
          <main className="flex flex-col space-y-6 w-full px-10">
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-4 p-2 bg-[#220B57] text-white rounded-md hover:bg-[#3b2277] transition"
              onClick={handleLogin}
              disabled={!email || !password}
            >
              Log In
            </Button>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
