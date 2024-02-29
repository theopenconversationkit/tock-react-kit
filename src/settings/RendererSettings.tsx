import { HTMLAttributes, ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useTockSettings } from '../TockContext';

/**
 * Renders text into React content.
 *
 * <p>A renderer can be restricted in the kind of HTML nodes it emits depending on the
 * context in which it is invoked. Most text renderers should only emit <em>phrasing content</em> that
 * is also <em>non-interactive</em>. However, some contexts allow <em>interactive phrasing content</em>,
 * or even any <em>flow content</em>.
 *
 * <p>Some renderers are expected to handle <em>rich text</em>, that is text that already contains HTML formatting.
 * Such rich text renderers may strip HTML tags or attributes that are deemed dangerous to add to the DOM.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content flow content
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content phrasing content
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content interactable content
 * @see https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html dangers of arbitrary HTML rendering
 */
export type TextRenderer = (text: string) => ReactNode;

export interface TextRendererSettings {
  /**
   * Renders regular text in the form of <em>non-interactive phrasing content</em>
   */
  default: TextRenderer;
  /**
   * Renders <em>HTML-formatted text</em> in the form of <em>flow content</em>
   */
  html: TextRenderer;
  /**
   * Renders <em>HTML-formatted text</em> in the form of <em>phrasing content</em>
   */
  htmlPhrase: TextRenderer;
  /**
   * Renders text written by a user
   */
  userContent?: TextRenderer;
}

export const useTextRenderer = (
  name: keyof TextRendererSettings = 'default',
): TextRenderer => {
  const textRenderers = useTockSettings().renderers.textRenderers;
  return textRenderers[name] ?? textRenderers.default;
};

export type ImageRenderingProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  css?: Interpolation<Theme>;
};

export type ImageRenderer = (props: ImageRenderingProps) => ReactNode;

export interface ImageRendererSettings {
  default: ImageRenderer;
  standalone?: ImageRenderer;
  card?: ImageRenderer;
  buttonIcon?: ImageRenderer;
}

export interface RendererSettings {
  imageRenderers: ImageRendererSettings;
  textRenderers: TextRendererSettings;
}

export const useImageRenderer = (
  name: keyof ImageRendererSettings,
): ImageRenderer => {
  const imageRenderers = useTockSettings().renderers.imageRenderers;
  return imageRenderers[name] ?? imageRenderers.default;
};
