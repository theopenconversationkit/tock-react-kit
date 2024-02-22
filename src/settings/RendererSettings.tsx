import { ReactNode } from 'react';
import { Interpolation } from '@emotion/react';
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
   * Renders <em>HTML rich text</em> in the form of <em>flow content</em>
   */
  defaultRichText: TextRenderer;
  /**
   * Renders <em>HTML rich text</em> in the form of <em>phrasing content</em>
   */
  defaultInlineRichText: TextRenderer;
  /**
   * Renders the text in a {@link PostBackButton}, in the form of <em>non-interactive phrasing content</em>
   */
  postbackButton?: TextRenderer;
  /**
   * Renders the text in a {@link UrlButton}, in the form of <em>non-interactive phrasing content</em>
   */
  urlButton?: TextRenderer;
  /**
   * Renders the text in a quick reply button, in the form of <em>non-interactable phrasing content</em>
   */
  quickReply?: TextRenderer;
  /**
   * Renders the title in a {@link Card}, in the form of <em>phrasing content</em>
   */
  cardTitle?: TextRenderer;
  /**
   * Renders the <em>HTML rich text</em> in the subtitle in a {@link Card}, in the form of <em>phrasing content</em>
   */
  cardSubtitle?: TextRenderer;
  /**
   * Renders the <em>HTML rich text</em> in a text bot message, in the form of <em>flow content</em>
   */
  botMessage?: TextRenderer;
  /**
   * Renders the text in a user message, in the form of <em>flow content</em>
   */
  userMessage?: TextRenderer;
}

export const useTextRenderer = (
  name: keyof TextRendererSettings,
  fallback: keyof TextRendererSettings &
    ('default' | 'defaultRichText' | 'defaultInlineRichText') = 'default',
): TextRenderer => {
  const textRenderers = useTockSettings().renderers.textRenderers;
  return textRenderers[name] ?? textRenderers[fallback];
};

export type ImageRenderingProps = {
  src?: string;
  alt?: string;
  css?: Interpolation<unknown>;
};

export type ImageRenderer = (props: ImageRenderingProps) => ReactNode;

export interface ImageRendererSettings {
  default: ImageRenderer;
  standalone?: ImageRenderer;
  card?: ImageRenderer;
  qrIcon?: ImageRenderer;
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
