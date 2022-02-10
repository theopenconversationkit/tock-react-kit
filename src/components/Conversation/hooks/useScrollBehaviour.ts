import { useRef, RefObject, useEffect, DependencyList } from 'react';

export default function useScrollBehaviour(
  deps: DependencyList,
): RefObject<HTMLUListElement> {
  const container: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const { current } = container;
    if (!current) return;
    current.scrollTop = current.scrollHeight;
    return;
  }, deps);
  return container;
}
