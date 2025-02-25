import React from "react";


const handleLogout = async () => {
  await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // Important to clear cookies
  });
  window.location.href = "/login"; // Redirect to login page
};


const Lobby = () => {
  return <div>Hello From Lobby</div>;
};

export default Lobby;
