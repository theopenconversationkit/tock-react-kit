import { RefObject, useRef, useCallback, useEffect } from 'react';
import useRefs from './useRefs';
import useMeasures, { Measure } from './useMeasures';

type CarouselReturn<T> = [
  {
    container: RefObject<T>;
    items: RefObject<HTMLElement>[];
  },
  () => void,
  () => void,
];

function getMeanX(
  previous: Measure | undefined,
  target: Measure | undefined,
): number {
  if (!previous || !target) return 0;
  return Math.round((previous.x + previous.width + target.x) / 2);
}

function setAriaAttributes(
  measures: Measure[],
  itemRefs: RefObject<HTMLElement>[],
  targetIndex: number,
  width: number,
) {
  if (width !== 0) {
    itemRefs.forEach(item => {
      const offsetLeftItem = item.current?.offsetLeft || 0;

      if (offsetLeftItem < measures[targetIndex].x || (offsetLeftItem + (item.current?.offsetWidth || 0) > measures[targetIndex].x + width)) {
        item.current?.setAttribute('aria-hidden', 'true');
        item.current?.setAttribute('tabIndex', '-1');
      } else {
        item.current?.removeAttribute('aria-hidden');
        item.current?.removeAttribute('tabIndex');
      }
    });
  }
}

function scrollStep(
  direction: 'NEXT' | 'PREVIOUS',
  container: HTMLElement | null,
  measures: Measure[],
  itemRefs: RefObject<HTMLElement>[],
) {
  if (!container) return;
  const x = container.scrollLeft;
  const width = container.clientWidth;

  if (direction === 'NEXT') {
    const targetIndex = measures.findIndex(
      (measure) => measure.x + measure.width > x + width,
    );
    container.scrollLeft = getMeanX(
      measures[targetIndex],
      measures[targetIndex - 1],
    );
    setAriaAttributes(measures, itemRefs, targetIndex, width);
  } else {
    const firstLeftHidden = measures
      .slice()
      .reverse()
      .find((measure) => measure.x < x);
    if (!firstLeftHidden) return;

    const targetIndex = measures.findIndex(
      (measure) =>
        firstLeftHidden.x - measure.x < width - firstLeftHidden.width,
    );
    container.scrollLeft = getMeanX(
      measures[targetIndex - 1],
      measures[targetIndex],
    );
    setAriaAttributes(measures, itemRefs, targetIndex, width);
  }
}

export default function useCarousel<T>(itemCount = 0): CarouselReturn<T> {
  const containerRef = useRef(null);
  const itemRefs = useRefs(itemCount);
  const measures = useMeasures(itemRefs);

  const previous = useCallback(
    () => scrollStep('PREVIOUS', containerRef.current, measures, itemRefs),
    [containerRef, measures],
  );

  const next = useCallback(
    () => scrollStep('NEXT', containerRef.current, measures, itemRefs),
    [containerRef, measures],
  );

  useEffect(() => {
    if (measures !== undefined && measures.length !== 0) {
      setAriaAttributes(measures, itemRefs, 0, (containerRef.current as HTMLElement | null)?.clientWidth || 0);
    }
  }, [measures]);

  return [
    {
      container: containerRef,
      items: itemRefs,
    },
    previous,
    next,
  ];
}
