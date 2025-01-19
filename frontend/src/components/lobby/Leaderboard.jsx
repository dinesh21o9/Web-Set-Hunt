import React, { useState, useEffect, useId } from 'react';
import { LeaderTeamItem } from './LeaderTeamItem';
import axios from 'axios';

export const Leaderboard = () => {
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [hideUserDetails, setHideUserDetails] = useState(true);
  const [selfEntry, setSelfEntry] = useState([]);

  
  const hideUserPosition = () => {
    setHideUserDetails(!hideUserDetails);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://wsh.vistaran.tech/api/leaderboard/winners');
        const sortedEntries = response.data.sort((a, b) => {
          if (a.score ?? 0 !== b.score ?? 0) {
            if(b.score ?? 0 > a.score ?? 0) {
              return 1;
            } 
            return -1;
          }
          if(b.updatedAt < a.updatedAt) {
            return 1;
          }
          return -1;
        });
        setLeaderboardEntries(sortedEntries);
        for (let i = 0; i < sortedEntries.length; i++) {
          sortedEntries[i].maxProgress = i + 1;
        }
        console.log(sortedEntries);
        let userId = localStorage.getItem('userId');
        const userDetails = response.data.filter(entry => entry.members.includes(userId));
        if((userDetails.length > 0 && hideUserDetails) || (userDetails.length == 0 && !hideUserDetails)) {
          hideUserPosition();
        }
        setSelfEntry(userDetails[0] ?? response.data[0]);
        console.log(userDetails);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); 

  if (isLoading) {
    return <div className=' text-white text-4xl'>Leaderboard is updating...</div>;
  }

  return (
    <div>
      <div className='leaderboard-container flex flex-col justify-center relative'>
      <div><p className='final-score text-4xl mb-6 mt-6 text-white'>Congratulations, You finished {selfEntry.maxProgress}</p></div>
        <div className="leader-heading">
          <h2 className="text-4xl font-bold text-center text-white mb-8">Leaderboard</h2>
        </div>
        <div className="leaderboard-content flex flex-col justify-center items-center">
          <LeaderTeamItem imageURL="rank1.png" rank="1" teamName={leaderboardEntries[0].teamName} score={leaderboardEntries[0].score ?? "0"}/>
          <LeaderTeamItem imageURL="rank2.png" rank="2" teamName={leaderboardEntries[1].teamName} score={leaderboardEntries[1].score ?? "0"}/>
          <LeaderTeamItem imageURL="rank3.png" rank="3" teamName={leaderboardEntries[2].teamName} score={leaderboardEntries[2].score ?? "0"}/>
          <LeaderTeamItem imageURL="rank4.png" rank="4" teamName={leaderboardEntries[3].teamName} score={leaderboardEntries[3].score ?? "0"}/>
          <LeaderTeamItem imageURL="rank5.png" rank="5" teamName={leaderboardEntries[4].teamName} score={leaderboardEntries[4].score ?? "0"}/>
        </div>
        <div className={`self-heading text-xl font-bold text-white mt-2 ${
            hideUserDetails ? 'hidden' : ''
          }`}>
            Your Position
        </div>
        <div className={`self-content flex flex-col justify-center items-center ${
            hideUserDetails ? 'hidden' : ''
          }`}>
          <LeaderTeamItem imageURL="self.png" rank={selfEntry.maxProgress} teamName={selfEntry.teamName} score={selfEntry.score ?? "0"}/>
        </div>
      </div>

  {/* <div className="leader-heading">
    <h2 className="text-4xl font-bold text-center text-white">Leaderboard</h2>
  </div>
  <div className="leaderboard-content mx-8">
    <div className="flex justify-between mt-9 leader-winners">
      <div className="leader-card bg-green-500 w-40 h-32 flex justify-center items-center first-pos rounded-lg shadow-lg">
        {leaderboardEntries.teams[1].teamName}
      </div>
      <div className="leader-card bg-green-500 w-40 h-32 flex justify-center items-center second-pos rounded-lg shadow-lg">
        {leaderboardEntries.teams[0].teamName}
      </div>
      <div className="leader-card bg-green-500 w-40 h-32 flex justify-center items-center third-pos rounded-lg shadow-lg">
        {leaderboardEntries.teams[2].teamName}
      </div>
    </div>
    <br />
    <div className="leader-rank mt-16">
      <div className="leader-card fourth-pos bg-green-500 h-12 flex justify-center items-center rounded-lg shadow-lg">
        {leaderboardEntries.teams[3].teamName}
      </div>
      <div className="leader-card fifth-pos bg-green-500 h-12 mt-6 flex justify-center items-center rounded-lg shadow-lg">
        {leaderboardEntries.teams[4].teamName}
      </div>
    </div>
    <br />
    <div className="leader-self-position">
      <div className="self-heading text-xl font-bold text-white mb-4">Your Position</div>
      <div className="leader-card self-position bg-green-500 h-12 flex justify-center items-center rounded-lg shadow-lg">
        {leaderboardEntries.teams[5].teamName}
      </div>
    </div>
  </div> */}
</div>

  )
}


