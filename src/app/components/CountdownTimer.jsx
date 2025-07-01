"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const targetDate = new Date("2025-06-08T17:45:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeLeft(remaining);

      if (
        remaining.days <= 0 &&
        remaining.hours <= 0 &&
        remaining.minutes <= 0 &&
        remaining.seconds <= 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  function getTimeRemaining(endTime) {
    const difference = endTime - Date.now();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="relative lg:flex items-center h-[160px]">
      <div className="lg:w-[200px] text-center">
        <h1 className="text-[32px]">Flash Sale</h1>
      </div>
      <div
        id="center"
        className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold flex gap-4 text-white"
      >
        <div className="w-[60px] md:w-[120px]  h-[80px] md:h-[100px] bg-red-500 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-4xl">{timeLeft.days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="w-[60px] md:w-[120px]  h-[80px] md:h-[100px] bg-red-500 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-4xl">{timeLeft.hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="w-[60px] md:w-[120px]  h-[80px] md:h-[100px] bg-red-500 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-4xl">{timeLeft.minutes}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="w-[60px] md:w-[120px]  h-[80px] md:h-[100px] bg-red-500 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-4xl">{timeLeft.seconds}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
}
