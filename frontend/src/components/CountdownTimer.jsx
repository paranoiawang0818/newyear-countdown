import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);

  // Target date: 2026-02-17 00:00:00
  const targetDate = new Date('2026-02-17T00:00:00').getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isFinished) {
    return null;
  }

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700">
      <div className="text-5xl md:text-7xl font-bold text-accent mb-2 tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm md:text-lg text-gray-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white animate-float">
        🎉 距离 2026 新年还有 🎉
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <TimeUnit value={timeLeft.days} label="天" />
        <TimeUnit value={timeLeft.hours} label="时" />
        <TimeUnit value={timeLeft.minutes} label="分" />
        <TimeUnit value={timeLeft.seconds} label="秒" />
      </div>
    </div>
  );
};

export default CountdownTimer;
