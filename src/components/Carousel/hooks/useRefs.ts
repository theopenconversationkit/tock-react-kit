import { RefObject, useState, useEffect, createRef } from 'react';

type Refs = RefObject<HTMLElement>[];

export default function useRefs(count: number): Refs {
  const [refs, setRefs] = useState<Refs>([]);

  useEffect(() => {
    const initialRefs = Array.from(Array(count)).map(() =>
      createRef<HTMLElement>(),
    );
    setRefs(initialRefs);
  }, []);

  useEffect(() => {
    setRefs((refs) =>
      Array.from(Array(count)).map((_, i) => refs[i] || createRef()),
    );
  }, [count]);

  return refs;
}
