interface Shape {
  width: string;
}

export interface Sizing {
  loaderSize: string;
  borderRadius: string;
  conversation: Shape;
}

export type SizingOptions = Partial<Sizing>;
