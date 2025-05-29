'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    let dest = new Date("mar 31, 2024 23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      let diff = dest - now;

      if (diff <= 0) {
        const nextMonthDate = new Date();
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        if (nextMonthDate.getMonth() === 0) {
          nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
        }
        dest = nextMonthDate.getTime();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start justify-center w-full gap-1">
      <div className="timer">
        <div>
          <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">
            {timeLeft.days}
          </h3>
        </div>
      </div>
      <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">:</h3>
      <div className="timer">
        <div>
          <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">
            {timeLeft.hours}
          </h3>
        </div>
      </div>
      <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">:</h3>
      <div className="timer">
        <div>
          <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">
            {timeLeft.minutes}
          </h3>
        </div>
      </div>
      <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">:</h3>
      <div className="timer">
        <div>
          <h3 className="text-center text-black text-3xl font-normal font-manrope leading-normal">
            {timeLeft.seconds}
          </h3>
        </div>
      </div>
    </div>
  );
} 