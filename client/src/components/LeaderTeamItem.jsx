import React from "react";

export const LeaderTeamItem = ({ imageURL, rank, teamName, score }) => {
  imageURL = `/leaderboard/${imageURL}`;

  return (
    <div className="relative flex items-center w-full max-w-2xl h-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 px-4 py-2">
      {/* Rank Image */}
      <div className="flex items-center justify-center w-12 h-12 bg-blue-800 rounded-full shadow-md">
        <img className="w-10 h-10" src={imageURL} alt="Rank" />
      </div>
      
      {/* Rank Number */}
      <span className="ml-4 text-white text-lg font-bold w-10 text-center">{rank}</span>
      
      {/* Team Name */}
      <span className="flex-1 text-white text-lg font-semibold truncate text-center">
        {teamName}
      </span>
      
      {/* Score */}
      <span className="text-blue-200 text-lg font-bold w-16 text-right">
        {score}
      </span>
    </div>
  );
};
