import React, { useState, useEffect } from "react";
import "./App.css";

function CountdownTimer() {
  const [minutes, setMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(0);
    setMinutes("");
  };

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    setMinutes(value);
    if (!isNaN(value) && value !== "") {
      setTimeLeft(value * 60);
    } else {
      setTimeLeft(0);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="countdown-container">
      <h1 className="title">Countdown Timer</h1>
      <input
        type="text"
        placeholder="Enter minutes.."
        value={minutes}
        onChange={handleMinutesChange}
        className="input"
      />
      <div className="button-container">
        <button onClick={handleStart} className="button">
          Start
        </button>
        <button onClick={handlePause} className="button">
          Pause
        </button>
        <button onClick={handleStop} className="button">
          Stop
        </button>
      </div>
      <h2 className="timer-display">{formatTime(timeLeft)}</h2>
    </div>
  );
}

export default CountdownTimer;
