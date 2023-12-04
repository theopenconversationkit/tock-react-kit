import { useState, useEffect } from 'react';
import { Message } from '../../../model/messages';

export default function useMessageCounter(
  messages: Message[],
  delay: number,
): number {
  const [counter, setCounter] = useState(
    () =>
      // Exempt previously displayed messages from the loading animation
      messages.filter((message) => message.alreadyDisplayed === true).length,
  );
  const targetValue = messages.length;

  useEffect(() => {
    if (counter > targetValue) {
      setCounter(targetValue);
    } else if (counter < targetValue) {
      setTimeout(() => {
        messages[counter].alreadyDisplayed = true;
        setCounter(counter + 1);
      }, delay);
    }
  }, [counter, targetValue]);

  return counter;
}
