"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [initialTime, setInitialTime] = useState(90);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentParticipant, setCurrentParticipant] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 0) {
        setTimeLeft(initialTime);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [initialTime, isRunning, timeLeft]);

  function secondsToHms(d: number) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    if(s === 0) {
     return `Done!`;
    }

    const hDisplay = h > 0 ? h + " hr " : "";
    const mDisplay = m > 0 ? m + " min " : "";
    const sDisplay = s > 0 ? s + " s" : "";


    return hDisplay + mDisplay + sDisplay;
  }

  function backgroundColor(
    isRunning: boolean,
    timeLeft: number,
    initialTime: number
  ) {
    switch (true) {
      case isRunning && timeLeft / initialTime > 0.5:
        return "bg-green-800";
      case isRunning && timeLeft / initialTime > 0.25:
        return "bg-yellow-700";
      case isRunning && timeLeft / initialTime > 0.1:
        return "bg-red-800";
      default:
        return "bg-gray-900";
    }
  }

  return (
    <main>
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-6 ${backgroundColor(
          isRunning,
          timeLeft,
          initialTime
        )}`}
      >
        <div className="text-2xl font-semibold">Daily Timer</div>

        <div className="text-6xl font-bold">{secondsToHms(timeLeft)}</div>

        <div className="flex gap-4">
          {/* Start */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsRunning(!isRunning);
              if (isRunning) {
              } else {
                setIsRunning(true);
              }
            }}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          {/* Reset */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setTimeLeft(initialTime);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
