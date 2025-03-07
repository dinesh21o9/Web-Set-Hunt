import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    email: "",
    rollNo: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;

    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("All fields are required");
      return;
    }

    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!mobilePattern.test(formData.mobileNo)) {
      toast.error("Invalid mobile number (10 digits required)");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          teamName: formData.teamName,
          teamLeaderName: formData.teamLeaderName,
          email: formData.email,
          rollNo: formData.rollNo,
          mobileNo: formData.mobileNo,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.status === false) {
        throw new Error(data.msg || "Registration failed");
      }

      toast.success("Registration successful!");
      navigate("/lobby");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cover bg-center" style={{
      backgroundImage: `url('background.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative font-mono min-h-screen w-full flex items-center justify-center  px-4 gap-6">
        {/* Instructions Box */}
        <div className="max-w-md w-full bg-black/90 p-6 rounded-xl shadow-lg space-y-4 border  border-green-600">
          <h2 className="text-center text-3xl font-bold text-white">
            Instructions 📢
          </h2>
          <ul className="text-green-300 space-y-3 text-sm">
            <li>
              📝 Not registered in the Microbus Google Form? Oops, do that
              first! 🚀
            </li>
            <li>
              🌍 External participants? Hold your horses! Register in the Google
              Form first! 🏇
            </li>
            <li>
              👬 Each team has exactly 2 members. Only the leader should
              register! If both register, well... disqualified! 💀
            </li>
            <li>
              🎥 The other member can join a Google Meet with the leader or
              participate together in the event! 🤝
            </li>
            <li>
              🧩 The questions are rebus puzzles! Search the internet, find
              clues, and solve them! 🕵️‍♂️
            </li>
            <li>
              🔡 Answers are NOT case-sensitive, so don't stress about
              capitalization! 🔤
            </li>
            <li>
              📊 Keep an eye on the leaderboard! Check your position and plan
              your strategy! 📈
            </li>
            <li>
              ⏳ Speed matters! If scores are tied, the faster team wins!
              Tick-tock! ⏰
            </li>
            <li>🤐 Don’t share your solutions! You want to win, right? 😉</li>
            <li>
              📌 Only those who registered in the Google Form will be evaluated.
              Others? Sorry, buddy. 🤷‍♂️
            </li>
            <li>
              🤖 No ChatGPT allowed! We tried it, and well... let’s just say it
              failed spectacularly. 😂
            </li>
          </ul>
        </div>

        <div className="max-w-md w-full bg-black/90 p-6 rounded-xl shadow-lg space-y-6 border border-green-600">
          <h2 className="text-center text-3xl font-bold text-white">
            Create Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white">
                Team Name
              </label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
              opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Team Leader Name
              </label>
              <input
                id="teamLeaderName"
                name="teamLeaderName"
                type="text"
                value={formData.teamLeaderName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
              opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
              opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-white">
                  Roll Number
                </label>
                <input
                  id="rollNo"
                  name="rollNo"
                  type="text"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
                opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-white">
                  Mobile Number
                </label>
                <input
                  id="mobileNo"
                  name="mobileNo"
                  type="text"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
                opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
              opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
              opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <ToastContainer />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md shadow-sm 
            hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="text-sm text-center text-green-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
