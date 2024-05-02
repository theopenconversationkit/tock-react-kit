import { ComponentType } from 'react';

export interface RendererRegistry {
  default: NonNullable<ComponentType<unknown>>;
}
