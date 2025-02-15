import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(120); // Assuming a default value of 120 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimeUp = () => {
    // Implementation of handleTimeUp
  };

  return <div>{timeRemaining}</div>;
};

export default Timer;
