import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Leaderboard from "./Leaderboard";

const Dashboard = ({ initialTime = 0 }) => {
  const [imageURL, setImageURL] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionNumber, setquestionNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [time, setTime] = useState(initialTime);

  // Function to fetch test data
  const fetchTestData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/contest/1",
        { withCredentials: true }
      );
      setImageURL(response.data.question.queUrl);
      setquestionNumber(response.data.question.queNo);

      if (response.data.question.queUrl === "testcompleted") {
        setTestCompleted(true);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (time <= 0 && !testStarted) {
      setTestStarted(true);
    }
  }, [time, testStarted]);

  useEffect(() => {
    if (testStarted && !testCompleted) {
      fetchTestData();
    }
  }, [testStarted, testCompleted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/dashboard/contest/1",
        { answer },
        { withCredentials: true }
      );

      if (response.data.status) {
        toast(response.data.message);

        if (
          response.data.question &&
          response.data.question.queUrl === "testcompleted"
        ) {
          setTestCompleted(true);
        } else {
          fetchTestData();
          setAnswer("");
        }
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Error submitting answer. Please try again.");
    }
  };

  if (testCompleted) return <Leaderboard />;

  // Show timer countdown before test starts
  if (time > 0) {
    return (
      <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
        <span className="animate-pulse text-green-500">●</span>
        <span className="text-sm md:text-base">
          {Math.floor(time / 3600)} hrs {Math.floor((time % 3600) / 60)} mins
          remaining
        </span>
      </div>
    );
  }

  // Show loading while fetching question
  if (isLoading) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  // Show test content
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
              {questionNumber}
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
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
