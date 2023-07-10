import React, { useState, useEffect } from "react";
import "./StopWatch.css";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const stopWatchTime = (milliseconds) => {
    const minutes = Math.floor((milliseconds / 60000) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const millisecondsPart = Math.floor((milliseconds / 10) % 100);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}:${(
      "0" + millisecondsPart
    ).slice(-2)}`;
  };

  const handleStart = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setTime(0);
    if (running) {
      setRunning(false);
    }
  };

  return (
    <div>
      <div className="cont-1">
        <h1>Stop Watch</h1>
        <div className="stop-watch-container">
          <div className="timer">
            {/* for time field */}
            <span>{stopWatchTime(time)}</span>
          </div>
          <div className="controls">
            {/* for control buttons */}
            <button id="startBtn" onClick={handleStart}>
              {running ? "Pause" : time > 0 ? "Resume" : "Start"}
            </button>
            <button
              id="resetBtn"
              onClick={handleReset}
              disabled={!running && time === 0}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
