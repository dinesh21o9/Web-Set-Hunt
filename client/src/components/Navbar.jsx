import React from "react";
import clsx from "clsx";

export const Navbar = ({ setActiveTab }) => {
  const navItems = [
    { name: "Dashboard", key: "dashboard", icon: "homeIcon.png" },
    { name: "Leaderboard", key: "leaderboard", icon: "leaderboardIcon.png" },
    { name: "Team", key: "team", icon: "teamIcon.png" },
  ];

  return (
    <div className="fixed left-0 top-auto bottom-12 h-2/3 w-20 flex flex-col gap-6 py-6 items-center bg-black text-white shadow-lg">
      {/* Logo */}
      <div className="w-16 h-16">
        <img src="micro.png" alt="Logo" className="object-contain" />
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-6">
        {navItems.map(({ name, key, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="relative flex items-center justify-center p-3 rounded-full transition-all duration-300 hover:bg-gray-500/50"
          >
            <img className="w-9 h-9" src={`navbar/${icon}`} alt={name} />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="relative flex items-center justify-center p-3 rounded-full transition-all duration-300 hover:bg-red-500">
          <img className="w-9 h-9" src="navbar/logoutIcon.png" alt="Logout" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
