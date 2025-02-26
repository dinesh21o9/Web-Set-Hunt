import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Leaderboard from "../components/Leaderboard";
import Profile from "../components/Profile";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Lobby = () => {
  const navigate = useNavigate();

  const calculateTimeRemaining = () => {
    const time = new Date();
    let hours;
    if (time.getHours() <= 0) {
      hours = -1;
    } else {
      hours = 21 - time.getHours();
    }
    let minutes = 0 - time.getMinutes();

    if (minutes < 0) {
      hours = hours - 1;
      minutes = 60 + minutes;
    }

    return (hours * 60 + minutes) * 60 - time.getSeconds();
  };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [initialTime, setInitialTime] = useState(calculateTimeRemaining());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recalculate time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setInitialTime(calculateTimeRemaining());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      navigate("/landing");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // style={{ backgroundImage: "url('/background.png')" }}
  return (
    <div className="min-h-screen flex flex-col bg-fixed bg-cover bg-black bg-center text-white ">
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 opacity-10 bg-black/80 z-0 "></div>

      {/* Header Section */}
      <header className="relative z-10 py-4 px-6 bg-black/90 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left side - Logos and Title */}
          <div className="flex items-center gap-4">
            <img src="navbar/tslogo.jpg" className="w-72 h-18" />
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-4">
            <Navbar
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              onLogout={handleLogout}
              isMobile={isMobile}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-sm shadow-2xl overflow-hidden border border-green-600/30">
            {/* Content Header */}
            <div className="bg-green-700/75 py-4 px-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">
                {activeTab === "dashboard" && "Event Dashboard"}
                {activeTab === "leaderboard" && "Competition Leaderboard"}
                {activeTab === "profile" && "User Profile"}{" "}
                {/* Changed from team to profile */}
              </h2>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6 justify-center items-center">
              {activeTab === "dashboard" && (
                <Dashboard initialTime={initialTime} />
              )}
              {activeTab === "leaderboard" && <Leaderboard />}
              {activeTab === "profile" && <Profile />}{" "}
              {/* Display Profile component */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-3 bg-black/70 border-t border-green-600/30 text-center text-sm">
        <div className="flex items-center justify-center max-w-7xl mx-auto relative">
          <p>
            © 2025 TechSpardha - Microbus - National Institute of Technology,
            Kurukshetra
          </p>
          <img
            src="hmd.png"
            className="absolute items-center right-4 bottom-1 h-5 w-9 bg-white"
          />
        </div>
      </footer>
    </div>
  );
};

export default Lobby;
