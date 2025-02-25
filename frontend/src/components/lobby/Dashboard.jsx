import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import "../../css/CountDown.scss"
import { Leaderboard} from './Leaderboard';
import axios from 'axios'; // Import axios for making HTTP requests

import "../../css/Dashboard.scss";
import toast from 'react-hot-toast';

export const Dashboard = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [imageURL, setImageURL] = useState(''); // State to store image URL
  const [answer, setAnswer] = useState(''); // State to store user's answer
  const [count, setCount] = useState(''); // State to store user's answer
  const [rank, setRank] = useState('');
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [teamJoined, setTeamJoined] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  let timer;

  useEffect(() => {
    // Fetch image URL from backend
    const fetchData = async () => {
      if((localStorage.getItem('teamCode') ?? "" != "")) {
        try {
          const response = await axios.get('https://wsh.vistaran.tech/api/dashboard/contest/1')
          console.log(response.data.question);
          setImageURL(response.data.question.queUrl);
          setCount(response.data.question.queNo);
          if(response.data.question.queUrl === "testcompleted") {
            setTestCompleted(true);
          }
          setIsLoading(false);
        } catch(error) {
          setAnswer(error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setTeamJoined(false);
      }
    }
    fetchData();                           
    timer = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted]);

  const handleSubmit = async event => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send user's answer to the backend
      const response = await axios.put('https://wsh.vistaran.tech/api/dashboard/contest/1', {
        answer: answer // Send the user's answer in the request body
      });
      
      // Handle the response from the backend
      console.log(response.data); // Log the response data
      // You can handle the response data as needed, e.g., display a message to the user
      console.log(response.data.message)
      if(response.data.message === "Answer is correct") {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
      if(response.data.question.queUrl === "testcompleted") {
        setTestCompleted(true);
        console.log("c")
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if(count===7){
    setCount('?');
  }

  const containerStyle = {
    position: 'relative',
    height: '40px',
    width: '100%',
    clipPath: 'polygon(0% 0%, 48% 0%, 50% 10%, 52% 0%, 100% 0%, 100% 100%, 0% 100%)',
  };

  const ruleContentTopBorder = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(8% 0%, 11% 10%, 89% 10%, 92% 0%)',
    backgroundColor: 'rgba(5,167,255,255)',
  }
  
  const ruleContentContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(11% 10%, 6% 90%, 94% 90%, 89% 10%)',
    backgroundColor: 'rgba(4,70,121,255)',
  };

  const ruleContentBottomBorder = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(6% 90%, 3% 100%, 97% 100%, 94% 90%)',
    backgroundColor: 'rgba(5,167,255,255)',
  }


  if(testCompleted) {
    return (
      <div>
        <div className='test-completed'><Leaderboard/></div>
      </div>
    );
  }

  if (!teamJoined) {
    return (
      <div className="p-8 text-white text-4xl w-full max-w-md flex flex-col rounded-lg backdrop-blur-md bg-white bg-opacity-5 gap-12 -translate-x-10 -translate-y-5">
        To start Web Set Hunt,<br/>Join the team
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(time > 0) {
    return (
      <Countdown hours={Math.floor(time / 3600)} minutes={Math.floor((time % 3600) / 60)} seconds={time % 60} />
    );
  }

  return (
    <>
      
        <div className="q-container relative ">
          <div className="box bg-black/30">
            <div className="left">
              {imageURL && <img id="question-image" src={imageURL} alt="" />} {/* Display image if URL is available */}
            </div>
            <div className="right">
              <div className="top">
                <div className="top_left shrink-2">HUNT No:</div>
                <div className="top_right bg-slate-600">
                  <div>{count}</div>
                </div>
              </div>
              <div className="bottom">
                <form onSubmit={handleSubmit}>
                  <label>Your Answer</label>
                  <input
                    type="text"
                    placeholder="Your Answer"
                    value={answer}
                    className="focus:ring-1 focus:ring-sky-400"
                    onChange={event => setAnswer(event.target.value)} // Update answer state on input change
                  />
                  <button type="submit" className='text-slate-200 bg-slate-700 hover:bg-slate-400 hover:text-black transition-all ease-linear font-medium'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};
