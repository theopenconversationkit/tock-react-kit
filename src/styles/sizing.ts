interface Shape {
  width: string;
}

interface CarouselResizing {
  active?: boolean;
  marginDelta?: string;
  paddingDelta?: string;
}

export interface Sizing {
  loaderSize: string;
  borderRadius: string;
  autoCarouselResizing: CarouselResizing;
  conversation: Shape;
}

export type SizingOptions = Partial<Sizing>;
