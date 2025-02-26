import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Leaderboard from "./Leaderboard";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = ({ initialTime = 0 }) => {
  const [imageURL, setImageURL] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionNumber, setquestionNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [endTimeReached, setEndTimeReached] = useState(false);

  // Function to calculate time remaining until 2:00 AM
  const calculateTimeUntilEnd = () => {
    const now = new Date();
    const endTime = new Date();

    // Set end time to specified hour and minute
    endTime.setHours(2, 0, 0, 0);

    // If current time is already past the end time, set end time to next day
    if (now > endTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate time difference in seconds
    return Math.floor((endTime - now) / 1000);
  };

  // Function to fetch test data
  const fetchTestData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/dashboard/contest/1`,
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

  // Timer effect for starting test
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

  // Effect for monitoring test end time
  useEffect(() => {
    if (testStarted && !testCompleted && !endTimeReached) {
      const checkEndTime = setInterval(() => {
        const timeRemaining = calculateTimeUntilEnd();

        // Show remaining time in console (optional)
        console.log(`Time remaining until test ends: ${timeRemaining} seconds`);

        // End test when time reaches 0
        if (timeRemaining <= 0) {
          setEndTimeReached(true);
          setTestCompleted(true);
          clearInterval(checkEndTime);
        }
      }, 1000);

      return () => clearInterval(checkEndTime);
    }
  }, [testStarted, testCompleted, endTimeReached]);

  useEffect(() => {
    if (testStarted && !testCompleted) {
      fetchTestData();
    }
  }, [testStarted, testCompleted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/dashboard/contest/1`,
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

  // Add a component to display remaining time until test ends
  const RemainingTime = () => {
    const [endRemaining, setEndRemaining] = useState(calculateTimeUntilEnd());

    useEffect(() => {
      const timer = setInterval(() => {
        const remaining = calculateTimeUntilEnd();
        setEndRemaining(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(endRemaining / 3600);
    const minutes = Math.floor((endRemaining % 3600) / 60);
    const seconds = endRemaining % 60;

    return (
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full justify-center">
        <span className="animate-pulse text-green-500">●</span>
        <span className="text-sm md:text-base">
          Test ends in: {hours}h {minutes}m {seconds}s
        </span>
      </div>
    );
  };

  if (testCompleted) return <Leaderboard />;

  // Show timer countdown before test starts
  if (time > 0) {
    return (
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full justify-center">
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
    return <div className="text-white text-2xl text-center">Loading...</div>;
  }

  // Show test content
  return (
    <div className="flex flex-col justify-center items-center h-screen p-8 gap-4">
      <RemainingTime />
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
