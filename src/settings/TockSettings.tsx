import React from 'react';
import { ImageRenderingProps, RendererSettings } from './RendererSettings';

export interface LocalStorageSettings {
  prefix?: string;
}

export interface TockSettings {
  localStorage: LocalStorageSettings;
  locale?: string;
  renderers: RendererSettings;
}

export const defaultSettings: TockSettings = {
  localStorage: {},
  renderers: {
    imageRenderers: {
      default: ({ src, alt, css }: ImageRenderingProps): React.ReactNode => (
        <img src={src} alt={alt} css={css} />
      ),
    },
    textRenderers: {
      default: (text: string): React.ReactNode => text,
    },
  },
};
