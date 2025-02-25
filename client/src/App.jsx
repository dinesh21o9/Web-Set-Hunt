import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";


const isAuthenticated = () => {
  // return localStorage.getItem("token") !== null;
  return true;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
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
