import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          withCredentials: true,
        });
        setProfileData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [API_BASE_URL]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-red-400">
        <p className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">{error}</p>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-yellow-400">
        <p className="bg-yellow-900/20 border border-yellow-500 p-4 rounded-lg text-center">
          No profile data available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h3 className="text-xl font-semibold text-green-400 flex items-center gap-2">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Profile Information
      </h3>

      <div className="mt-6 w-full max-w-lg bg-black/50 p-6 rounded-lg border border-green-600/30 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold text-white">{profileData.teamLeaderName}</h4>
            <p className="text-green-400 font-medium">Team: {profileData.teamName}</p>
          </div>
          <div className="bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
            <span className="text-green-400 text-sm font-medium">Score: {profileData.score}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-300">
          {[
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: profileData.email },
            { icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", text: `+${profileData.mobileNo}` },
            { icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4m0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", text: `Roll No: ${profileData.rollNo}` },
          ].map(({ icon, text }, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
