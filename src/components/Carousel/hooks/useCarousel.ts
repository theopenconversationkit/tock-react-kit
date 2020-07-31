import {
  RefObject,
  useRef,
  useCallback
} from 'react'
import useRefs from './useRefs'
import useMeasures, { Measure } from './useMeasures'

type Ref = RefObject<HTMLElement>
type Refs = Array<Ref>

type CarouselScrollReturn<T> = [
  {
    container: RefObject<T>,
    items: Refs,
  },
  (() => void),
  (() => void)
]

function scrollStep(
  direction: 1 | -1,
  container: HTMLElement | null,
  measures: Measure[]
) {
  if (!container) return;
  const x = container.scrollLeft
  const width = container.clientWidth

  if (direction === 1) {
    const rightMeasure = measures.find(measure => measure.x + measure.width > x + width)
    container.scrollLeft = rightMeasure?.x || 0
  } else {
    const leftMeasure = measures.find(measure => measure.x + width >= x)
    container.scrollLeft = leftMeasure?.x || 0
  }
}

export default function useCarousel<T>(itemCount: number = 0) : CarouselScrollReturn<T> {
  const containerRef = useRef(null);
  const itemRefs = useRefs(itemCount);
  const measures = useMeasures(itemRefs);

  const previous = useCallback(() =>
    scrollStep(
      -1,
      containerRef.current,
      measures
    ),
    [containerRef, measures]
  )

  const next = useCallback(() =>
    scrollStep(
      1,
      containerRef.current,
      measures
    ),
    [containerRef, measures]
  )

  return [
    {
      container: containerRef,
      items: itemRefs,
    },
    previous,
    next
  ]
}
