import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Leaderboard from "../components/Leaderboard";


const handleLogout = async () => {
  await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // Important to clear cookies
  });
  window.location.href = "/login"; // Redirect to login page
};


const Lobby = () => {
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

  const initialTime = (hours * 60 + minutes) * 60 + seconds + 10;

  const [activeTab, setActiveTab] = useState("dashboard");
  // const token = sessionStorage.getItem("token");
  // const userid = sessionStorage.getItem("userid");
  // const teamid = sessionStorage.getItem("teamid");

  // axios.interceptors.request.use(function (config) {
  //   config.headers.Authorization = token;
  //   config.headers.userid = userid;
  //   config.headers.teamid = teamid;
  //   return config;
  // });

  // routes accces
  // background image
  // nit logo
  // tech logo

  return (
    <div className="bg-black absolute inset-0 flex flex-col bg-[url('/assets/finll.jpg')] bg-cover">
      <div className="py-3 left-0 right-0 bg-gradient-to-b from-green-600 to-black opacity-75 h-fit flex items-center">
        <div className="w-24 h-24 bg-[url('logo.svg')] bg-contain relative left-6"></div>
        <div className="text-3xl relative left-4 flex flex-col text-white px-5">
          <div className="font-black">TechSpardha'25</div>
          <div className="font-light text-2xl">Frontier Reimagined</div>
        </div>
        <div className="fixed w-24 h-24 right-6 bg-[url('/assets/techspartha.png')] bg-contain"></div>
      </div>
      <div className="flex flex-row grow">
        <div className="w-1/6 h-full flex items-center justify-center px-8">
          <Navbar setActiveTab={setActiveTab} />
        </div>
        <div className="w-5/6 flex items-center justify-center">
          <div className="flex-1 p-4">
            {activeTab === "dashboard" && (
              <Dashboard initialTime={initialTime} />
            )}
            {activeTab === "leaderboard" && <Leaderboard />}
            {activeTab === "team" && <h2>Team Page</h2>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
