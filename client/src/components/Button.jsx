import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, to, className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="w-full py-2 px-4 bg-green-700 hover:bg-green-600 text-white font-mono font-bold rounded-lg transition-colors border border-green-500/50 shadow-lg flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );
};

export default Button;
