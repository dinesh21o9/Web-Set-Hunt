import React, { useEffect, useState } from "react";

const Countdown = ({ hours, minutes, seconds }) => {
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="text-white text-2xl text-center p-4">
      {formatTime(Math.floor(time / 3600))}:
      {formatTime(Math.floor((time % 3600) / 60))}:{formatTime(time % 60)}
    </div>
  );
};

export default Countdown;
