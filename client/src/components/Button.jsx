import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, to, className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`font-mono bg-green-600 text-white px-5 py-2 rounded-md font-semibold 
                  shadow-md transition-transform duration-300 
                  hover:scale-110 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
