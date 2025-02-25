import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeaderTeamItem } from "./LeaderTeamItem";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selfEntry, setSelfEntry] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/leaderboard/winners"
        );

        const sortedEntries = data
          .sort(
            (a, b) =>
              (b.score ?? 0) - (a.score ?? 0) ||
              new Date(b.updatedAt) - new Date(a.updatedAt)
          )
          .map((entry, index) => ({ ...entry, rank: index + 1 }));

        setLeaderboard(sortedEntries);

        const userId = localStorage.getItem("userId");
        const userEntry = sortedEntries.find((entry) =>
          entry.members.includes(userId)
        );

        setSelfEntry(userEntry || sortedEntries[0]);
        setShowUserDetails(!!userEntry);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
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

      <p className="text-white text-4xl font-semibold mb-6">
        🎉 Congratulations, You finished{" "}
        <span className="text-yellow-400">{selfEntry.rank}</span>
      </p>

      <h2 className="text-5xl font-bold text-white mb-8">🏆 Leaderboard</h2>

      {/* <div className="w-full max-w-2xl flex flex-col gap-4">
        {leaderboard.slice(0, 5).map((team, index) => (
          <LeaderTeamItem
            key={team.teamName}
            imageURL={`rank${index + 1}.png`}
            rank={team.rank}
            teamName={team.teamName}
            score={team.score ?? "0"}
          />
        ))}
      </div>

      {showUserDetails && (
        <div className="mt-8 w-full max-w-lg">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Your Position
          </h3>
          <LeaderTeamItem
            imageURL="self.png"
            rank={selfEntry.rank}
            teamName={selfEntry.teamName}
            score={selfEntry.score ?? "0"}
          />
        </div>
      )} */}
    </div>
  );
};

export default Leaderboard;
