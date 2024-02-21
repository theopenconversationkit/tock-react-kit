import React from 'react';
import { Interpolation } from '@emotion/react';
import { useTockSettings } from '../TockContext';

export type ImageRenderingProps = {
  src?: string;
  alt?: string;
  css?: Interpolation<unknown>;
};

export type ImageRenderer = (props: ImageRenderingProps) => React.ReactNode;

export interface ImageRendererSettings {
  default: ImageRenderer;
  image?: ImageRenderer;
  card?: ImageRenderer;
  qrIcon?: ImageRenderer;
}

export interface RendererSettings {
  imageRenderers: ImageRendererSettings;
}

export const useImageRenderer = (
  name: keyof ImageRendererSettings,
): ImageRenderer => {
  const imageRenderers = useTockSettings().renderers.imageRenderers;
  return imageRenderers[name] ?? imageRenderers.default;
};
