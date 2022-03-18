import { RefObject, useRef, useCallback } from 'react';
import useButtonRefs from './useButtonRefs';
import useButtonMeasures, { Measure } from './useButtonMeasures';

type CarouselQuickReplyReturn<T> = [
  {
    container: RefObject<T>;
    items: RefObject<HTMLButtonElement>[];
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

function scrollStep(
  direction: 'NEXT' | 'PREVIOUS',
  container: HTMLButtonElement | null,
  measures: Measure[],
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
  }
}

export default function useCarouselQuickReply<T>(
  itemCount = 0,
): CarouselQuickReplyReturn<T> {
  const containerRef = useRef(null);
  const itemRefs = useButtonRefs(itemCount);
  const measures = useButtonMeasures(itemRefs);

  const previous = useCallback(
    () => scrollStep('PREVIOUS', containerRef.current, measures),
    [containerRef, measures],
  );

  const next = useCallback(
    () => scrollStep('NEXT', containerRef.current, measures),
    [containerRef, measures],
  );

  return [
    {
      container: containerRef,
      items: itemRefs,
    },
    previous,
    next,
  ];
}
