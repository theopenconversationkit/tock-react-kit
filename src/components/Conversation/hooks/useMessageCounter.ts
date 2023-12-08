import { useState, useEffect } from 'react';
import { Message } from '../../../model/messages';

export default function useMessageCounter(
  messages: Message[],
  delay: number,
  skipDelay: (message: Message) => boolean,
): number {
  const [counter, setCounter] = useState(0);
  const targetValue = messages.length;
  const shouldDisplayNow = (m: Message) => m.alreadyDisplayed || skipDelay(m);
  const advance = () => {
    setCounter((c) => {
      // always increment the counter by at least one
      do {
        messages[c].alreadyDisplayed = true;
        c++;
      } while (c < targetValue && shouldDisplayNow(messages[c]));
      return c;
    });
  };

  if (counter > targetValue) {
    setCounter(targetValue);
  } else if (counter < targetValue && shouldDisplayNow(messages[counter])) {
    advance();
  }

  useEffect(() => {
    if (counter < targetValue) {
      const id = setTimeout(advance, delay);
      return () => clearTimeout(id);
    }
    return;
  }, [counter, targetValue]);

  return counter;
}
