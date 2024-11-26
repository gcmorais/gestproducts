import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Spinner from "./components/spinner/spinner";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [loading, setLoading] = useState(false);

  const handleStart = () => setLoading(true);
  const handleComplete = () => setLoading(false);

  return (
    <Router>
      {loading && <Spinner />}
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper onStart={handleStart} onComplete={handleComplete}>
              <AuthProvider>
                <Login />
              </AuthProvider>
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper onStart={handleStart} onComplete={handleComplete}>
              <AuthProvider>
                <Register />
              </AuthProvider>
            </PageWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <PageWrapper onStart={handleStart} onComplete={handleComplete}>
              <AuthProvider>
                <Home />
              </AuthProvider>
            </PageWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PageWrapper({ children, onStart, onComplete }: any) {
  const location = useLocation();

  useEffect(() => {
    onStart();
    const timeout = setTimeout(() => {
      onComplete();
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  return children;
}

export default App;
