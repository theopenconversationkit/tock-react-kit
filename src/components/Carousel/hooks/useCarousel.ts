import {
  RefObject,
  useRef,
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import useRefs from './useRefs';
import useMeasures, { Measure } from './useMeasures';

type CarouselItem = {
  refObject: RefObject<HTMLLIElement>;
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
};

type CarouselReturn<T> = [
  {
    container: RefObject<T>;
    items: CarouselItem[];
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

function setHiddenItems(
  measures: Measure[],
  carouselItems: CarouselItem[],
  targetIndex: number,
  width: number,
) {
  if (width !== 0) {
    carouselItems.forEach((item) => {
      const offsetLeftItem = item.refObject.current?.offsetLeft || 0;

      if (
        offsetLeftItem < measures[targetIndex].x ||
        offsetLeftItem + (item.refObject.current?.offsetWidth || 0) >
          measures[targetIndex].x + width
      ) {
        item.setIsHidden(true);
      } else {
        item.setIsHidden(false);
      }
    });
  }
}

function scrollStep(
  direction: 'NEXT' | 'PREVIOUS',
  container: HTMLElement | null,
  measures: Measure[],
  carouselItems: CarouselItem[],
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
    setHiddenItems(measures, carouselItems, targetIndex, width);
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
    setHiddenItems(measures, carouselItems, targetIndex, width);
  }
}

export default function useCarousel<T>(itemCount = 0): CarouselReturn<T> {
  const containerRef = useRef(null);
  const itemRefs = useRefs(itemCount);
  const measures = useMeasures(itemRefs);
  const carouselItems: CarouselItem[] = Array.from(
    Array(itemCount),
  ).map<CarouselItem>((_, i) => {
    const [isHidden, setIsHidden] = useState(false);
    return Object.create({ refObject: itemRefs[i++], isHidden, setIsHidden });
  });

  const previous = useCallback(
    () => scrollStep('PREVIOUS', containerRef.current, measures, carouselItems),
    [containerRef, measures],
  );

  const next = useCallback(
    () => scrollStep('NEXT', containerRef.current, measures, carouselItems),
    [containerRef, measures],
  );

  useEffect(() => {
    if (measures !== undefined && measures.length !== 0) {
      setHiddenItems(
        measures,
        carouselItems,
        0,
        (containerRef.current as HTMLElement | null)?.clientWidth || 0,
      );
    }
  }, [measures]);

  return [
    {
      container: containerRef,
      items: carouselItems,
    },
    previous,
    next,
  ];
}
