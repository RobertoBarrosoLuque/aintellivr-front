import { useState, useEffect, useRef } from 'react';

export const useCallTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current === null) {
      timerRef.current = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
    startTimer();
  };

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return {
    seconds,
    formattedTime: formatTime(seconds),
    startTimer,
    stopTimer,
    resetTimer,
    formatTime
  };
};
