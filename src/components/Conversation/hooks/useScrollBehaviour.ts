import { useRef, RefObject, useEffect, DependencyList } from 'react';

export default function useScrollBehaviour<E extends HTMLElement>(
  deps: DependencyList,
): RefObject<E> {
  const container: RefObject<E> = useRef<E>(null);
  useEffect(() => {
    const { current } = container;
    if (!current) return;
    current.scrollTop = current.scrollHeight;
    return;
  }, deps);
  return container;
}
