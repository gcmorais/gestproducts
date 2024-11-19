import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ImageBox from "../../components/ImageBox/ImageBox";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      await register(
        email,
        fullname,
        username,
        password,
        confirmPassword,
        navigate
      );
    } catch (err: any) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-2xl bg-white shadow-lg">
        <ImageBox />

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <Header
            text="Already have an account?"
            description="Sign-in"
            linkTo="/"
          />
          <main className="flex flex-col space-y-6 w-full px-10">
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-4 p-2 bg-[#220B57] text-white rounded-md hover:bg-[#3b1a77] transition-colors disabled:bg-gray-400"
              onClick={handleRegister}
              disabled={
                !email ||
                !fullname ||
                !username ||
                !password ||
                !confirmPassword
              }
            >
              Register
            </Button>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Register;
