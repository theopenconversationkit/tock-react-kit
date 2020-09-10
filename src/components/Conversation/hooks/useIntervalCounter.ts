import { useState, useEffect } from 'react';

export default function useIntervalCounter(
  initialValue: number,
  targetValue: number,
  delay: number,
) : number {
  const [counter, setCounter] = useState(initialValue)

  useEffect(() => {
    if (counter > targetValue) {
      setCounter(targetValue)
    } else if (counter < targetValue) {
      setTimeout(() => {
        setCounter(counter + 1);
      }, delay);
    }
  }, [counter, targetValue]);
  
  return counter
}
