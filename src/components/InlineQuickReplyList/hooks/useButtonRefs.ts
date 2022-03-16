import { RefObject, useState, useEffect, createRef } from 'react';

type Refs = RefObject<HTMLButtonElement>[];

export default function useButtonRefs(count: number): Refs {
  const [refs, setRefs] = useState<Refs>([]);

  useEffect(() => {
    const initialRefs = Array.from(Array(count)).map(() =>
      createRef<HTMLButtonElement>(),
    );
    setRefs(initialRefs);
  }, []);

  useEffect(() => {
    setRefs((refs) =>
      Array.from({length: count}, (_, i) => refs[i] || createRef()),
    );
  }, [count]);

  return refs;
}
