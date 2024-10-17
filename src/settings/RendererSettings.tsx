import { AriaAttributes, ComponentType, DOMAttributes } from 'react';
import { useTockSettings } from './TockSettingsContext';
import { ButtonRenderers } from './ButtonRenderers';
import { RendererRegistry } from './RendererRegistry';

export interface TextRendererProps {
  text: string;
}

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
export type TextRenderer = ComponentType<TextRendererProps>;

export interface TextRenderers extends RendererRegistry {
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
   *
   * <p>If left unspecified, falls back to {@link #default}
   */
  userContent?: TextRenderer;
}

export const useTextRenderer = (name: keyof TextRenderers): TextRenderer => {
  const textRenderers = useTockSettings().renderers.textRenderers;
  return getRendererOrDefault('TextRenderer', textRenderers, name);
};

export interface ImageRendererProps
  extends AriaAttributes,
    DOMAttributes<HTMLElement | SVGElement> {
  src?: string;
  alt?: string;
  className?: string;
}

export type ImageRenderer = ComponentType<ImageRendererProps>;

export interface ImageRenderers extends RendererRegistry {
  default: ImageRenderer;
  standalone?: ImageRenderer;
  card?: ImageRenderer;
  buttonIcon?: ImageRenderer;
}

export interface MessageRenderers {
  error?: ComponentType;
}

export interface RendererSettings {
  buttonRenderers: ButtonRenderers;
  imageRenderers: ImageRenderers;
  messageRenderers: MessageRenderers;
  textRenderers: TextRenderers;
}

export const useImageRenderer = (name: keyof ImageRenderers): ImageRenderer => {
  const imageRenderers = useTockSettings().renderers.imageRenderers;
  return getRendererOrDefault('ImageRenderer', imageRenderers, name);
};

export const useButtonRenderer = <K extends keyof ButtonRenderers>(
  name: K,
): undefined extends ButtonRenderers[K]
  ? NonNullable<ButtonRenderers[K]> | ButtonRenderers['default']
  : ButtonRenderers[K] => {
  const buttonRenderers = useTockSettings().renderers.buttonRenderers;
  return getRendererOrDefault('ButtonRenderer', buttonRenderers, name);
};

function getRendererOrDefault<
  R extends RendererRegistry,
  K extends keyof R & string,
  V = undefined extends R[K] ? NonNullable<R[K]> | R['default'] : R[K],
>(type: string, renderers: R, name: K): V {
  return (getRenderer(type, renderers, name) ??
    getRenderer(type, renderers, 'default')) as V;
}

function getRenderer<R extends RendererRegistry, K extends keyof R & string>(
  type: string,
  renderers: R,
  name: K,
): R[K] {
  const renderer = renderers[name] as ComponentType & R[K];
  if (renderer && !renderer.displayName) {
    // giving the renderer a pretty name like "ImageRenderer(standalone)"
    renderer.displayName = `${type}(${renderer.name?.length ? renderer.name : name})`;
  }
  return renderer;
}
