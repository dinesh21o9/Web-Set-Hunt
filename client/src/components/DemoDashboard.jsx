import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import demoImage from "../../public/0.jpg"; // Adjust the path as needed

const DemoDashboard = ({ onDemoComplete }) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const correctAnswer = "humayun"; // Sample correct answer

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!answer.trim()) {
      toast("Input required to proceed with decryption");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ans = answer.toLowerCase();
      if (ans === correctAnswer) {
        toast("Correct Answer! Redirecting...");
        setTimeout(() => {
            onDemoComplete(); // ✅ This updates isDemoActive in parent component
          }, 1500);
      } else {
        toast("Incorrect Answer! Try again.");
      }
      setIsSubmitting(false); // Allow another submission
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-black">
      <div className="w-full max-w-5xl">
        {/* Terminal-like header */}
        <div className="bg-green-900/30 border-t-2 border-l-2 border-r-2 border-green-500/50 rounded-t-lg p-3 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-green-400 flex-1 text-center text-sm">
            DEMO DECRYPTION CHALLENGE
          </div>
        </div>

        {/* Main content */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" />
        <div className="backdrop-blur-sm bg-black/70 border-2 border-green-500/50 p-8 rounded-b-lg shadow-lg shadow-green-500/20">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl text-yellow-400 font-mono font-bold tracking-wider">DEMO PROBLEM</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image Placeholder */}
            <div className="md:col-span-2 bg-black/60 rounded-lg border border-green-500/30 shadow-lg overflow-hidden">
              <div className="relative pt-6 pb-6">
                <img className="w-full object-cover mt-6 mb-6" src={demoImage} alt="Encrypted Data" />
              </div>
            </div>

            {/* Answer Input Form */}
            <div className="md:col-span-1">
              <div className="bg-green-900/10 p-6 rounded-lg border border-green-500/50 shadow-lg h-full flex flex-col">
                <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
                  <label className="text-green-400 font-mono text-sm mb-2 block">
                    ENTER YOUR ANSWER
                  </label>
                  <input
                    type="text"
                    className="mt-5 w-full p-3 bg-black border-2 border-green-500/50 rounded-lg text-green-400 font-mono focus:outline-none focus:border-green-400"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-green-800 hover:bg-green-700 text-white font-mono font-bold rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-green-500/50 font-mono mt-8 pt-4 border-t border-green-500/20">
            SECURE CONNECTION • {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
