import { useState, useEffect } from "react";

interface Props {
  duration: number; // Duration value in seconds
  onComplete: () => void; // Callback function to call when the countdown is complete
}

const CountdownTimer: React.FC<Props> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-orange-500">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountdownTimer;
