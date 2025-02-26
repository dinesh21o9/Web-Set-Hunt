import React, { useState, useEffect } from "react";
import axios from "axios";

// Custom rank badge component instead of using images
const RankBadge = ({ rank }) => {
  const getBadgeStyle = () => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-yellow-900/30",
          border: "border-yellow-500",
          text: "text-yellow-400",
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
        };
      case 2:
        return {
          bg: "bg-gray-700/30",
          border: "border-gray-400",
          text: "text-gray-300",
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          ),
        };
      case 3:
        return {
          bg: "bg-amber-800/30",
          border: "border-amber-600",
          text: "text-amber-500",
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ),
        };
      default:
        return {
          bg: "bg-green-900/30",
          border: "border-green-500/70",
          text: "text-green-400",
          icon: (
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
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
          ),
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div
      className={`flex items-center justify-center ${style.bg} w-12 h-12 rounded-full border-2 ${style.border} ${style.text}`}
    >
      {rank <= 3 ? (
        <div className="flex flex-col items-center">
          {style.icon}
          <span className="font-mono font-bold text-sm">{rank}</span>
        </div>
      ) : (
        <span className="font-mono font-bold">{rank}</span>
      )}
    </div>
  );
};

// Custom LeaderTeamItem component
const LeaderTeamItem = ({ rank, teamName, score, isCurrentUser = false }) => {
  return (
    <div
      className={`w-full p-4 rounded-lg backdrop-blur-sm ${
        isCurrentUser
          ? "bg-green-900/20 border-2 border-green-500/70"
          : "bg-black/70 border border-green-500/30"
      } shadow-lg transition-all duration-300 hover:border-green-500/70`}
    >
      <div className="flex items-center gap-4">
        <RankBadge rank={rank} />

        <div className="flex-1">
          <div className="font-mono text-lg text-white">{teamName}</div>
        </div>

        <div className="bg-green-900/50 px-4 py-2 rounded-full border border-green-500/50 shadow-inner shadow-green-600/20">
          <span className="text-green-400 text-sm font-mono font-medium tracking-wider">
            {score} pts
          </span>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selfRank, setSelfRank] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `${API_BASE_URL}/api/leaderboard/current`,
          { withCredentials: true }
        );
        const userId = userResponse.data;
        setCurrentUserId(userId);

        const { data } = await axios.get(
          `${API_BASE_URL}/api/leaderboard/winners`,
          { withCredentials: true }
        );

        const sortedEntries = data.map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

        setLeaderboard(sortedEntries);

        const userTeam = sortedEntries.find((team) => team._id === userId);
        if (userTeam) {
          setSelfRank(userTeam);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-14 w-14 border-4 border-green-500 border-t-transparent rounded-full shadow-lg shadow-green-500/30"></div>
          <p className="text-green-400 font-mono mt-4">
            FETCHING LEADERBOARD...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-black p-6">
        <div className="w-full max-w-md">
          <p className="bg-red-900/30 border-2 border-red-500/70 p-6 rounded-lg text-center text-red-400 font-mono shadow-lg shadow-red-500/10">
            CONNECTION ERROR: {error}
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
              RETRY CONNECTION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-black bg-[radial-gradient(circle_at_center,rgba(0,128,0,0.1),transparent_70%)]">
      <div className="w-full max-w-2xl">
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
          <div className="text-center mb-8 border-b border-green-500/30 pb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="text-4xl font-bold text-white font-mono tracking-wider">
                LEADERBOARD
              </h2>
            </div>
            {selfRank && (
              <div className="bg-green-900/20 p-3 rounded-lg inline-block mt-4 border border-green-500/50">
                <p className="text-green-400 font-mono">
                  YOUR POSITION:{" "}
                  <span className="text-yellow-400 font-bold">
                    {selfRank.rank}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Top 5 teams */}
          <div className="space-y-4 mb-8">
            <div className="text-xs text-green-500 font-mono mb-2 ml-2">
              TOP OPERATIVES
            </div>
            {leaderboard.slice(0, 5).map((team, index) => (
              <LeaderTeamItem
                key={team.teamName || index}
                rank={team.rank}
                teamName={team.teamName}
                score={team.score ?? "0"}
                isCurrentUser={team._id === currentUserId}
              />
            ))}
          </div>

          {/* User's position if not in top 5 */}
          {selfRank &&
            !leaderboard
              .slice(0, 5)
              .some((team) => team._id === currentUserId) && (
              <div className="mt-8">
                <div className="text-xs text-green-500 font-mono mb-2 ml-2">
                  YOUR POSITION
                </div>
                <LeaderTeamItem
                  rank={selfRank.rank}
                  teamName={selfRank.teamName}
                  score={selfRank.score ?? "0"}
                  isCurrentUser={true}
                />
              </div>
            )}

          {/* Footer */}
          <div className="text-center text-xs text-green-500/50 font-mono mt-10 pt-4 border-t border-green-500/20">
            REFRESH TO UPDATE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
