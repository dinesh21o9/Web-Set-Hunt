import {React, useState, useEffect} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";

const time = new Date();
let hours = 21 - time.getHours();
let minutes;
let seconds;
if (time.getMinutes() > 50) {
  hours = hours - 1;
  minutes = 110 - time.getMinutes();
} else {
  minutes = 50 - time.getMinutes();
}
if (time.getSeconds() > 0) {
  minutes = minutes - 1;
  seconds = 60 - time.getSeconds();
}

const isAuthenticated = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/check", {
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

        <Route path="/lobby" element={<ProtectedRoute element={<Lobby />} />}>
          {/* <Route index element={<Dashboard initialTime={initialTime} />} />
          <Route path="leaderboard" element={<h2>Leaderboard Page</h2>} />
          <Route path="team" element={<h2>Team Page</h2>} />
          <Route path="profile" element={<h2>Profile Page</h2>} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
