import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import {
  Button as ButtonData,
  PostBackButton as PostBackButtonData,
  QuickReply as QuickReplyData,
  UrlButton as UrlButtonData,
  UrlButton,
} from '../model/buttons';

import { RendererRegistry } from './RendererRegistry';

export interface BaseButtonRendererProps<B extends ButtonData> {
  buttonData: B;
  /**
   * The default content for the button, based on the {@link #buttonData}
   */
  children: ReactNode;
}

export type ButtonRendererProps<B extends ButtonData> = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  BaseButtonRendererProps<B>;

export type ButtonRenderer<
  B extends ButtonData,
  P extends BaseButtonRendererProps<B> = ButtonRendererProps<B>,
> = ComponentType<P>;

export type UrlButtonRendererProps = BaseButtonRendererProps<UrlButton> &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export type UrlButtonRenderer = ButtonRenderer<
  UrlButtonData,
  UrlButtonRendererProps
>;

export type PostBackButtonRenderer = ButtonRenderer<PostBackButtonData>;

export type QuickReplyButtonRenderer = ButtonRenderer<QuickReplyData>;

export interface ButtonRenderers extends RendererRegistry {
  default: ButtonRenderer<ButtonData>;
  url: UrlButtonRenderer;
  postback?: PostBackButtonRenderer;
  quickReply?: QuickReplyButtonRenderer;
}
