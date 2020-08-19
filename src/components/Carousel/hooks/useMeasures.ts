import { RefObject, useEffect, useState } from 'react';

export interface Measure {
  width: number;
  height: number;
  x: number;
  y: number;
}

const measureElement = (element: HTMLElement | null): Measure => ({
  width: element?.clientWidth || 0,
  height: element?.clientHeight || 0,
  x: element?.offsetLeft || 0,
  y: element?.offsetTop || 0,
});

export default function useMeasures(refs: RefObject<HTMLElement>[]): Measure[] {
  const [measures, setMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    const nextMeasures = refs.map((ref) => measureElement(ref.current));
    setMeasures(nextMeasures);
  }, [refs]);

  return measures;
}
