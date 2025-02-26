import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isAuthenticated = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ element }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setAuth(authenticated);
    };

    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby" element={<ProtectedRoute element={<Lobby />} />} />
      </Routes>
    </div>
  );
};

export default App;
