import React from 'react'
import axios from 'axios'
import { Navbar } from './lobby/Navbar';
import { Outlet } from 'react-router-dom';
import '../css/Lobby.scss';

export const Lobby = () => {
  const token = sessionStorage.getItem('token');
  const userid = sessionStorage.getItem('userid');
  const teamid = sessionStorage.getItem('teamid')
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization =  token; 
    config.headers.userid = userid;
    config.headers.teamid = teamid;
    return config;
  });
  return (
    <div className="lobby absolute inset-0 flex flex-col ">
      <div className='topbar py-3 left-0 right-0 bg-gradient-to-b from-blue-800 to-black-800 opacity-75 h-fit'>
        <div className="nit-logo-container size-24 object-contain relative left-6"></div>
        <div className="tech-theme-container text-3xl relative left-4">
          <div className="techname-container font-black">TechSpardha’24</div>
          <div className="tech-theme-container font-light text-2xl">Infinite Imagination</div>
        </div>
        <div className="fixed micro-logo-container w-24 h-24 right-6"></div>
      </div>
      <div className="flex flex-row grow">
          <div className='w-1/6 h-full flex items-center justify-center px-8'>
              <Navbar/>
          </div>
          <div className='w-5/6 flex items-center justify-center'>
              <Outlet/>
          </div>
      </div>
    </div>
  )
}
