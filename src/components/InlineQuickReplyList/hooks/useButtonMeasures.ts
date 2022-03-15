import { RefObject, useEffect, useState } from 'react';

export interface Measure {
  width: number;
  height: number;
  x: number;
  y: number;
}

const measureElement = (element: HTMLButtonElement | null): Measure => ({
  width: element?.offsetWidth || element?.clientWidth || 0,
  height: element?.offsetHeight || element?.clientHeight || 0,
  x: element?.offsetLeft || 0,
  y: element?.offsetTop || 0,
});

export default function useButtonMeasures(
  refs: RefObject<HTMLButtonElement>[],
): Measure[] {
  const [measures, setMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    const nextMeasures = refs.map((ref) => {
      return measureElement(ref.current);
    });
    setMeasures(nextMeasures);
  }, [refs]);

  return measures;
}
