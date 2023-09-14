import { Button } from './buttons';

export type Message = TextMessage | Card | Carousel | Widget | Image;

export enum MessageType {
  message = 'message',
  card = 'card',
  carousel = 'carousel',
  widget = 'widget',
  image = 'image',
}

interface MessageBase {
  type: MessageType;
  alreadyDisplayed?: boolean;
  metadata?: Record<string, string>;
}

export interface TextMessage extends MessageBase {
  author: 'bot' | 'user';
  message: string;
  type: MessageType.message;
  buttons?: Button[];
}

export interface Card extends MessageBase {
  imageUrl?: string;
  imageAlternative?: string;
  title: string;
  subTitle?: string;
  buttons?: Button[];
  type: MessageType.card;
}

export interface Carousel extends MessageBase {
  cards: Card[];
  type: MessageType.carousel;
}

export interface Widget extends MessageBase {
  widgetData: WidgetPayload;
  type: MessageType.widget;
}

export interface WidgetPayload {
  data: Record<string, unknown>;
  type: string;
}

export interface Image extends MessageBase {
  url?: string;
  title: string;
  type: MessageType.image;
  alternative?: string;
}
