import { RefObject, useState, useEffect, useCallback } from 'react';

export default function useArrowVisibility(
  ref: RefObject<HTMLElement>,
  itemRefs: RefObject<HTMLElement>[],
): [boolean, boolean] {
  const [visibility, setVisibility] = useState<[boolean, boolean]>([
    false,
    true,
  ]);

  const computeVisibility = useCallback(() => {
    if (!ref.current) return;
    const { scrollLeft = 0, clientWidth = 0, scrollWidth = 0 } = ref.current;
    const leftVisibility = scrollLeft > 0;
    const rightVisibility = scrollLeft + clientWidth < scrollWidth;
    if (visibility[0] !== leftVisibility || visibility[1] !== rightVisibility) {
      setVisibility([leftVisibility, rightVisibility]);
    }
  }, [ref.current, visibility, setVisibility]);

  useEffect(computeVisibility, [itemRefs]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('resize', computeVisibility);
    ref.current.addEventListener('scroll', computeVisibility);
    return () => {
      ref.current?.removeEventListener('resize', computeVisibility);
      ref.current?.removeEventListener('scroll', computeVisibility);
    };
  }, [ref.current, visibility]);

  return visibility;
}
