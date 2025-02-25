import React from "react";
import clsx from "clsx";

export const Navbar = ({ setActiveTab, activeTab, onLogout }) => {
  const navItems = [
    { name: "Dashboard", key: "dashboard", icon: "dashboard.svg" },
    { name: "Leaderboard", key: "leaderboard", icon: "leaderboard.svg" },
    { name: "Team", key: "team", icon: "profile.svg" },
  ];
  
  return (
    <div className="flex items-center gap-3">
      {/* Navigation Items */}
      <div className="flex items-center bg-white backdrop-blur-sm rounded-full px-2 py-1 shadow-lg gap-2">
        {navItems.map(({ name, key, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={clsx(
              "relative flex items-center justify-center p-2 rounded-full transition-all duration-300",
              activeTab === key 
                ? "bg-green-300 text-black" 
                : "text-black hover:bg-gray-200"
            )}
            title={name}
          >
            <img 
              className="w-6 h-6" 
              src={`navbar/${icon}`} 
              alt={name} 
            />
            <span className="ml-2 hidden md:block">{name}</span>
          </button>
        ))}
      </div>
      
      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="flex items-center justify-center p-2 rounded-full bg-white hover:bg-red-500 transition-all duration-300"
        title="Logout"
      >
        <img 
          className="w-6 h-6" 
          src="navbar/logout.svg" 
          alt="Logout" 
        />
      </button>
    </div>
  );
};

export default Navbar;