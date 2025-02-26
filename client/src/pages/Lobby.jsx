import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Leaderboard from "../components/Leaderboard";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Lobby = () => {
  const navigate = useNavigate();

  const calculateTimeRemaining = () => {
    const time = new Date();
    let hours = 14 - time.getHours();
    let minutes = 45 - time.getMinutes();

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
            <div className="w-16 h-16 bg-[url('logo.svg')] bg-contain bg-no-repeat bg-center"></div>
            <div>
              <h1 className="font-black text-2xl md:text-3xl tracking-wide">
                TechSpardha'25
              </h1>
              <p className="font-light text-lg md:text-xl italic text-green-200">
                Frontier Reimagined
              </p>
            </div>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-4">
            <Navbar
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              onLogout={handleLogout}
              isMobile={isMobile}
            />

            {/* Tech Spardha Logo */}
            <div className="hidden md:block w-16 h-16 bg-[url('/assets/techspartha.png')] bg-contain bg-no-repeat bg-center"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-sm shadow-2xl overflow-hidden border border-green-600/30">
            {/* Content Header */}
            <div className="bg-green-600 py-4 px-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">
                {activeTab === "dashboard" && "Event Dashboard"}
                {activeTab === "leaderboard" && "Competition Leaderboard"}
                {activeTab === "team" && "Team Management"}
              </h2>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6">
              {activeTab === "dashboard" && (
                <Dashboard initialTime={initialTime} />
              )}
              {activeTab === "leaderboard" && <Leaderboard />}
              {activeTab === "team" && (
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    Team Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/50 p-4 rounded-lg border border-green-600/20">
                      <h4 className="text-lg font-medium mb-2">Team Members</h4>
                      {/* Placeholder for team member list */}
                      <p className="text-gray-300">
                        Team members will be displayed here
                      </p>
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg border border-green-600/20">
                      <h4 className="text-lg font-medium mb-2">Team Stats</h4>
                      {/* Placeholder for team stats */}
                      <p className="text-gray-300">
                        Team statistics will be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-3 bg-black/70 border-t border-green-600/30 text-center text-sm">
        <div className="max-w-7xl mx-auto">
          <p>
            © 2025 TechSpardha - National Institute of Technology, Kurukshetra
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Lobby;
