import { useEffect, useState } from 'react';

type TimeData = {
  days: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  hasEnded?: boolean;
};

export function useCountDown(expirationDate: Date, pad: boolean = false) {
  const calculateTimeLeft = () => {
    const difference = expirationDate.getTime() - new Date().getTime();

    const time: TimeData = difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0, hasEnded: true };

    if (pad) {
      (["days", "hours", "minutes", "seconds"] as const).forEach((key) => {
        time[key] = String(time[key]).padStart(2, "0");
      });
    }

    return time;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.values(newTimeLeft).every((v) => Number(v) === 0)) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [expirationDate]);

  return timeLeft;
}
