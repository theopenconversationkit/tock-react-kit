import { useRef, RefObject, useEffect, DependencyList } from 'react';

export default function useScrollBehaviour(
  deps: DependencyList,
): RefObject<HTMLDivElement> {
  const container: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = container;
    if (!current) return;
    current.scrollTop = current.scrollHeight;
    return;
  }, deps);
  return container;
}
