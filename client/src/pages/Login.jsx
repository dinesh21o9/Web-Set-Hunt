import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || data.status === false) {
        console.log(data);
        throw new Error(data.message || "Logging in failed");
      }

      toast("Logged in successfully!");
      navigate("/lobby");
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-mono min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="border border-green-600 max-w-md w-full space-y-8 bg-black/90 p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Log In
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
                         opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm 
                         opacity-75 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <ToastContainer />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                     text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {/* <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Don't have an account? Register Now.
            </button>
          </div> */}
          <p className="text-sm text-center text-green-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Register Now.
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
