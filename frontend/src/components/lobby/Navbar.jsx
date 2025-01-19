import React from 'react';
import '../../css/Lobby.scss';
import {useLocation} from 'react-router-dom';
import clsx from 'clsx';

export const Navbar = () => {

  const { pathname } = useLocation();

  const pathArray = pathname.split("/"); 

  const currentPath = pathArray[pathArray.length - 1];

  const handleLogout = () => {

    // Clear local storage
    localStorage.clear();

    // Delete cookies (if any)
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="navbar flex flex-col gap-5 mb-2 py-4 items-center justify-between border-1 rounded-2xl text-white px-2 ">
      <div className="logo-container flex flex-col">
        <div className="logo flex flex-col w-14 h-14 m-4 mt-2 object-contain"><img src="/assets/micro.png" alt="" /></div>
      </div>
      <div className="nav-item-container flex flex-col justify-between items-center gap-3">
       <div className='flex items-center relative group'>
       <div className={clsx( currentPath === "lobby" ? "bg-white scale-110" : "bg-transparent scale-100 ","nav-item transition-all ease-in-out group-hover:scale-110 group-hover:bg-white items-center justify-center b rounded-full p-2 dashboard flex flex-col")}>
          <a href="/lobby">
            <img className='w-8 h-8' src="/assets/navbar/homeIcon.png" alt="" />
          </a>
        </div>
        <span className={clsx('text-2xl font-bold absolute transition duration-300 ease-linear opacity-0 group-hover:opacity-100 group-hover:translate-x-24',currentPath === 'lobby' ? "opacity-100 translate-x-24" : "opacity-0 translate-x-0")}>Dashboard</span>
       </div>
        <div className='flex items-center relative group'>
       <div className={clsx( currentPath === "profile" ? "bg-white scale-110" : "bg-transparent scale-100 ","nav-item transition-all ease-in-out group-hover:scale-110 group-hover:bg-white items-center justify-center b rounded-full p-2 dashboard flex flex-col")}>
          <a href="/lobby/profile">
            <img className='w-8 h-8' src="/assets/navbar/profileIcon.png" alt="" />
          </a>
        </div>
        <span className={clsx('text-2xl font-bold absolute transition duration-300 ease-linear opacity-0 group-hover:opacity-100 group-hover:translate-x-24',currentPath === 'profile' ? "opacity-100 translate-x-24" : "opacity-0 translate-x-0")}>Profile</span>
        </div>
        <div className='flex items-center relative group'>
       <div className={clsx( currentPath === "leaderboard" ? "bg-white scale-110" : "bg-transparent scale-100 ","nav-item transition-all ease-in-out group-hover:scale-110 group-hover:bg-white items-center justify-center b rounded-full p-2 dashboard flex flex-col")}>
          <a href="/lobby/leaderboard">
          <img className='w-8 h-8' src="/assets/navbar/leaderboardIcon.png" alt="" />
          </a>
        </div>
        <span className={clsx('text-2xl font-bold absolute transition duration-300 ease-linear opacity-0 group-hover:opacity-100 group-hover:translate-x-24',currentPath === 'leaderboard' ? "opacity-100 translate-x-24" : "opacity-0 translate-x-0")}>Leaderboard</span>
        </div>
        <div className='flex items-center relative group'>
       <div className={clsx( currentPath === "team" ? "bg-white scale-110" : "bg-transparent scale-100 ","nav-item transition-all ease-in-out group-hover:scale-110 group-hover:bg-white items-center justify-center b rounded-full p-2 dashboard flex flex-col")}>
          <a href="/lobby/team">
          <img className='w-8 h-8' src="/assets/navbar/teamIcon.png" alt="" />
          </a>
        </div>
        <span className={clsx('text-2xl font-bold absolute transition duration-300 ease-linear opacity-0 group-hover:opacity-100 group-hover:translate-x-24',currentPath === 'team' ? "opacity-100 translate-x-24" : "opacity-0 translate-x-0")}>Team</span>
        </div>
        <div className='flex items-center relative group'>
        <div className="nav-item transition-all ease-in-out hover:scale-110 group-hover:bg-white items-center justify-center b rounded-full p-2 logout-container flex flex-col">
        <div className="logout flex flex-col">
          <button onClick={handleLogout}>
            <img className='w-8 h-8' src="/assets/navbar/logoutIcon.png" alt="" />
          </button>
        </div>
      </div>
        <span className={clsx('text-2xl font-bold absolute transition duration-300 ease-linear opacity-0 group-hover:opacity-100 group-hover:translate-x-24',currentPath === 'logout' ? "opacity-100 translate-x-24" : "opacity-0 translate-x-0")}>Logout</span>
        </div>
       
      </div>
      
    </div>
  );
};
