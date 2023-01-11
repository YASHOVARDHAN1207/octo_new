import React, { useState, useEffect } from "react";

function RandomCounter({ min, max, interval }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(Math.floor(Math.random() * (max - min + 1)) + min);
    }, interval);
    return () => clearInterval(timer);
  }, [min, max, interval]);

  return (
    <div>
      <span>{count}</span>
    </div>
  );
}

export default RandomCounter;
