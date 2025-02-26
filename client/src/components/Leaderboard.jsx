import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeaderTeamItem } from "./LeaderTeamItem";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selfRank, setSelfRank] = useState(0);

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

        const rankFinder = sortedEntries.find((team) => team._id === userId);

        const rank = rankFinder.rank;
        if (rank > 0) {
          setSelfRank(rank);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-white text-4xl text-center mt-10">
        Leaderboard is updating...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-black to-gray-900 min-h-screen p-6">
      <h2 className="text-5xl font-bold text-white mb-8">🏆 Leaderboard</h2>

      {selfRank && (
        <p className="text-white text-4xl font-semibold mb-6">
          Your position is <span className="text-yellow-400">{selfRank}</span>
        </p>
      )}

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {leaderboard.slice(0, 5).map((team, index) => (
          <LeaderTeamItem
            key={team.teamName || index}
            imageURL={`rank${index + 1}.png`}
            rank={team.rank}
            teamName={team.teamName}
            score={team.score ?? "0"}
          />
        ))}
      </div>

      {selfRank &&
        !leaderboard.slice(0, 5).some((team) => team._id === currentUserId) && (
          <div className="mt-8 w-full max-w-lg">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Your Position
            </h3>
            <LeaderTeamItem
              imageURL="self.png"
              rank={selfRank.rank}
              teamName={selfRank.teamName}
              score={selfRank.score ?? "0"}
            />
          </div>
        )}
    </div>
  );
};

export default Leaderboard;
