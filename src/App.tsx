import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  const [loading, setLoading] = useState(false);

  const handleStart = () => setLoading(true);
  const handleComplete = () => setLoading(false);

  return (
    <Router>
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<PageWrapper onStart={handleStart} onComplete={handleComplete}><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper onStart={handleStart} onComplete={handleComplete}><Register /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

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
