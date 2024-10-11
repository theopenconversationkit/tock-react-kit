/**
 * Interface specified by [tock-bot-connector-web-model](https://github.com/theopenconversationkit/tock/tree/master/bot/connector-web-model/src/main/kotlin/ai/tock/bot/connector/web/WebConnectorResponse.kt)
 */
export interface BotConnectorResponse {
  responses: BotConnectorMessage[];
  metadata: Record<string, string>;
}

export interface BotConnectorMessage {
  version: '1';

  text?: string;
  buttons?: BotConnectorButton[];
  card?: BotConnectorCard;
  carousel?: BotConnectorCarousel;
  widget?: BotConnectorWidget;
  image?: BotConnectorImage;
  deepLink?: string;
}

export interface BotConnectorCard {
  title?: string;
  subTitle?: string;
  file?: WebMediaFile;
  buttons: BotConnectorButton[];
}

export interface WebMediaFile {
  url: string;
  name: string;
  type: string;
  description?: string;
}

export interface BotConnectorCarousel {
  cards: BotConnectorCard[];
}

export interface BotConnectorWidget {
  data: unknown;
}

export interface BotConnectorImage {
  file: WebMediaFile;
  title: string;
}

export type BotConnectorButton =
  | BotConnectorQuickReply
  | BotConnectorPostbackButton
  | BotConnectorUrlButton;

interface BotConnectorUrlButton {
  type: 'web_url' | undefined;
  title: string;
  url: string;
  imageUrl?: string;
  target?: string;
  windowFeatures?: string;
}

interface BotConnectorPostbackButton {
  type: 'postback';
  title: string;
  payload: string;
  imageUrl: string;
}

interface BotConnectorQuickReply {
  type: 'quick_reply';
  title: string;
  payload: string;
  nlpText: string;
  imageUrl: string;
}
