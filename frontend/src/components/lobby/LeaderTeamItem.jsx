import React from 'react'
import '../../css/Lobby.scss'

export const LeaderTeamItem = ({imageURL, rank, teamName, score}) => {
  const containerStyle = {
    position: 'relative',
    height: '48px',
    width: '800px',
    clipPath: 'polygon(0% 0%, 48% 0%, 50% 10%, 52% 0%, 100% 0%, 100% 100%, 0% 100%)',
  };

  const rankImgContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(0% 10%, 0% 90%, 10% 90%, 5% 10%)',
    backgroundColor: 'rgba(1,41,102,255)',
  };

  const dividerLeft = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(5% 10%, 10% 90%, 11% 90%, 6% 10%)',
    backgroundColor: 'transparent',
  };

  const rankContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(6% 10%, 11% 90%, 20% 90%, 15% 10%)',
    backgroundColor: 'rgba(5,167,255,255)',
  };

  const dividerCenterLeft = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(15% 10%, 20% 90%, 21% 90%, 16% 10%)',
    backgroundColor: 'transparent',
  };

  const teamNameTopBorder = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(13% 0%, 16% 10%, 87% 10%, 90% 0%)',
    backgroundColor: 'rgba(5,167,255,255)',
  }
  
  const teamNameContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(16% 10%, 21% 90%, 82% 90%, 87% 10%)',
    backgroundColor: 'rgba(4,70,121,255)',
  };

  const teamNameBottomBorder = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(21% 90%, 18% 100%, 85% 100%, 82% 90%)',
    backgroundColor: 'rgba(5,167,255,255)',
  }

  const dividerRight = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(87% 10%, 82% 90%, 83% 90%, 88% 10%)',
    backgroundColor: 'transparent',
    
  };

  const scoreContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(88% 10%, 83% 90%, 100% 90%, 100% 10%)',
    backgroundColor: 'rgba(5,167,255,255)',
  }

  const parentStyle = {
    position: 'relative',
    width: '100%',
    height: '100px', // Adjust the height as needed
    backgroundColor: 'transparent', // Add a background color for visibility
  };

  const childStyle1 = {
    position: 'absolute',
    left: '13%',
    top: '20%',
    transform: 'translate(-50%, -50%)', // Center the div vertically
    backgroundColor: 'transparent',
    width: '30px',
    height: '30px',
    color: 'rgba(4,70,121,255)',
  };

  const childStyle2 = {
    position: 'absolute',
    left: '50%',
    top: '20%',
    transform: 'translate(-50%, -50%)', // Center the div vertically
    backgroundColor: 'transparent',
    width: '400px',
    height: '30px',
  };

  const childStyle3 = {
    position: 'absolute',
    left: '93%',
    top: '20%',
    transform: 'translate(-50%, -50%)', // Center the div vertically
    backgroundColor: 'transparent',
    width: '30px',
    height: '30px',
    color: 'rgba(4,70,121,255)',
  };
  imageURL = "/assets/leaderboard/" + imageURL;

  
  return (
    <div className='leaderboard-card h-5/6 justify-self-center m-1' >
      <div style={containerStyle}>
        <div style={rankImgContainer} className='pl-2'><img className='w-10 h-10 bg-cover' src={imageURL} alt="" /></div>
        <div style={dividerLeft}></div>
        <div style={rankContainer} className=''></div>
        <div style={dividerCenterLeft}></div>
        <div style={teamNameTopBorder}></div>
        <div style={teamNameContainer} className='pt-1'></div>
        <div style={teamNameBottomBorder}></div>
        <div style={dividerRight}></div>
        <div style={scoreContainer}></div>
        <div style={parentStyle}>
            <div style={childStyle1}>{rank}</div>
            <div style={childStyle2}>{teamName}</div>
            <div style={childStyle3}>{score}</div>
            </div>
      </div>
    </div>
  )
}