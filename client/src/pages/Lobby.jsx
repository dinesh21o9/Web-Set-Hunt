import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import DemoDashboard from "../components/DemoDashboard"; 
import Leaderboard from "../components/Leaderboard";
import Profile from "../components/Profile";
import { ToastContainer, toast } from "react-toastify";
import Sponsors from "../components/Sponsors";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Lobby = () => {
  const navigate = useNavigate();

  const calculateTimeRemaining = () => {
    const time = new Date();
    let hours;
    if (time.getHours() <= 2) {
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
  const [clickCount, setClickCount] = useState(1);
  const [isDemoActive, setIsDemoActive] = useState(false);

  const handleSecretClick = () => {
    setClickCount((prev) => prev + 1);
    console.log(clickCount);
    if (clickCount === 7) {
      toast("aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMVJKbHVFTmxqMFpNUDRCa1l6Rm5fRTE2NmhfeDE1andTP3VzcD1zaGFyaW5n");
      setClickCount(1);
    }
  };

  const toggleDemo = () => {
    setIsDemoActive(!isDemoActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-fixed bg-cover bg-black bg-center text-white ">
      <div className="fixed inset-0 opacity-10 bg-black/80 z-0 "></div>

      <header className="relative z-10 py-4 px-6 bg-black/90 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="navbar/tslogo.png" className="w-72 h-18" />
            <span> </span>
            <img src="cross.png" className="w-10 h-10" />
            <img src="sponsors/languifyy.png" className="w-50 h-10" />
          </div>
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

      <main className="relative z-10 flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-sm shadow-2xl overflow-hidden border border-green-600/30">
            <div className="bg-green-700/75 py-4 px-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">
                {activeTab === "dashboard" && "Event Dashboard"}
                {activeTab === "leaderboard" && "Competition Leaderboard"}
                {activeTab === "profile" && "User Profile"} 
                {activeTab === "sponsors" && "Sponsors"}
              </h2>
              <button
                className={`px-4 py-2 rounded-xl text-white border border-green-600/30 
                  ${isDemoActive ? 'bg-red-600 text-black' : 'bg-green-700'} hover:bg-opacity-80`}                             
                onClick={toggleDemo}
              >
                {isDemoActive ? "Disable Demo" : "Enable Demo"}
              </button>
            </div>
            <div className="p-4 md:p-6 justify-center items-center">
              {activeTab === "dashboard" && (
                isDemoActive ? <DemoDashboard onDemoComplete={() => setIsDemoActive(false)}/> : <Dashboard initialTime={initialTime} />
              )}
              {activeTab === "leaderboard" && <Leaderboard />}
              {activeTab === "profile" && <Profile />} 
              {activeTab === "sponsors" && <Sponsors />}
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
      <footer className="relative z-10 py-3 bg-black/70 border-t border-green-600/30 text-center text-sm">
        <div className="flex items-center justify-center max-w-7xl mx-auto relative">
          <p>
            © 2025 TechSpardha - Microbus - National Institute of Technology,
            Kurukshetra
          </p>
          <img
            src="hmd.png"
            className="absolute items-center right-4 bottom-1 h-5 w-9 bg-white hover:text-white cursor-pointer"
            onClick={handleSecretClick}
          />
        </div>
      </footer>
    </div>
  );
};

export default Lobby;
