import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";

const Dashboard = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [imageURL, setImageURL] = useState("");
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [teamJoined, setTeamJoined] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("teamCode") ?? "" !== "") {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/dashboard/contest/1"
          );
          setImageURL(response.data.question.queUrl);
          setCount(response.data.question.queNo);
          if (response.data.question.queUrl === "testcompleted")
            setTestCompleted(true);
        } catch (error) {
          setAnswer(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTeamJoined(false);
      }
    };
    fetchData();
    const timer = setInterval(
      () => setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [testStarted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/dashboard/contest/1",
        { answer }
      );
      response.data.message === "Answer is correct"
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
      if (response.data.question.queUrl === "testcompleted")
        setTestCompleted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (testCompleted) return <Leaderboard />;

  if (!teamJoined) {
    return (
      <div className="text-center p-8 text-white text-4xl w-full max-w-md flex flex-col rounded-lg bg-white/10 gap-12">
        Join the team to start Web Set Hunt
      </div>
    );
  }

  if (isLoading) return <div className="text-white text-2xl">Loading...</div>;
  if (time > 0) {
    return (
      <Countdown
        hours={Math.floor(time / 3600)}
        minutes={Math.floor((time % 3600) / 60)}
        seconds={time % 60}
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen p-8">
      <div className="flex bg-black/30 p-6 rounded-2xl shadow-lg w-full max-w-5xl gap-8">
        <div className="flex-2">
          {imageURL && (
            <img
              className="rounded-lg shadow-lg object-cover w-full"
              src={imageURL}
              alt="Question"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="text-yellow-400 text-2xl font-bold flex justify-between">
            <span>HUNT No:</span>
            <span className="bg-gray-700 px-4 py-2 rounded-full text-yellow-300 text-xl">
              {count === 7 ? "?" : count}
            </span>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-white text-lg">Your Answer</label>
            <input
              type="text"
              className="p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-400 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
