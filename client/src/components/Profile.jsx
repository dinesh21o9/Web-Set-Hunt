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
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-14 w-14 border-4 border-green-500 border-t-transparent rounded-full shadow-lg shadow-green-500/30"></div>
          <p className="text-green-400 font-mono mt-4">FETCHING PROFILE...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-black p-6">
        <div className="w-full max-w-md">
          <p className="bg-red-900/30 border-2 border-red-500/70 p-6 rounded-lg text-center text-red-400 font-mono shadow-lg shadow-red-500/10">
            {error}
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-white font-mono border border-red-400/30 shadow-lg shadow-red-500/20 flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black p-6">
        <div className="w-full max-w-md">
          <p className="bg-yellow-900/30 border-2 border-yellow-500/70 p-6 rounded-lg text-center text-yellow-400 font-mono shadow-lg shadow-yellow-500/10">
            No profile data available. Access denied.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-black bg-[radial-gradient(circle_at_center,rgba(0,128,0,0.1),transparent_70%)]">
      <div className="w-full max-w-xl">
        {/* Terminal-like header */}
        <div className="bg-green-900/30 border-t-2 border-l-2 border-r-2 border-green-500/50 rounded-t-lg p-3 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mr-10 font-mono text-green-400 flex-1 text-center text-sm">
            WEB SET HUNT 2025
          </div>
        </div>

        {/* Main content */}
        <div className="backdrop-blur-sm bg-black/70 border-2 border-green-500/50 p-8 rounded-b-lg shadow-lg shadow-green-500/20">
          {/* Header with animated typing effect */}
          <h3 className="text-2xl font-mono text-green-400 mb-8 text-center border-b border-green-500/30 pb-4 flex items-center justify-center gap-3">
            <svg
              className="mb-1 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            USER PROFILE
          </h3>

          {/* Profile info */}
          <div className="space-y-8">
            {/* Name and team section */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold text-white font-mono">
                  {profileData.teamLeaderName}
                </h4>
                <p className="text-green-400 font-mono mt-1">
                  Team: {profileData.teamName}
                </p>
              </div>
              <div className="bg-green-900/50 px-4 py-2 rounded-full border-2 border-green-500/50 shadow-inner shadow-green-600/20">
                <span className="text-green-400 text-sm font-mono font-medium tracking-wider">
                  Score: {profileData.score}
                </span>
              </div>
            </div>

            {/* Details section */}
            <div className="space-y-6 font-mono text-gray-300">
              {[
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  label: "EMAIL",
                  text: profileData.email,
                },
                {
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  label: "CONTACT",
                  text: `${profileData.mobileNo}`,
                },
                {
                  icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4m0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
                  label: "ROLL NUMBER",
                  text: `${profileData.rollNo}`,
                },
              ].map(({ icon, label, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-green-900/10 p-4 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-colors"
                >
                  <div className="bg-green-900/50 p-3 rounded-full border border-green-500/30">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={icon}
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-green-500 mb-1">{label}</p>
                    <p className="text-white tracking-wider">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-green-500/80 font-mono mt-6 pt-4 border-t border-green-500/20 font-bold">
              IN CASE OF ANY ISSUE PLEASE CONTACT THE ORGANISING TEAM.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
