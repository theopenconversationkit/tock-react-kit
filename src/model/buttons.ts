export class QuickReply {
  label: string;
  payload?: string;
  nlpText?: string;
  imageUrl?: string;

  constructor(
      label: string,
      payload: string,
      nlpText?: string,
      imageUrl?: string,
  ) {
    this.label = label;
    this.payload = payload;
    this.nlpText = nlpText;
    this.imageUrl = imageUrl;
  }
}

export class PostBackButton {
  label: string;
  payload?: string;
  imageUrl?: string;
  style?: string;

  constructor(
      label: string,
      payload: string,
      imageUrl?: string,
      style?: string,
  ) {
    this.label = label;
    this.payload = payload;
    this.imageUrl = imageUrl;
    this.style = style;
  }
}

export class UrlButton {
  label: string;
  url: string;
  imageUrl?: string;
  target?: string;
  windowFeatures?: string;
  style?: string;

  constructor(
      label: string,
      url: string,
      imageUrl?: string,
      target?: string,
      windowFeatures?: string,
      style?: string,
  ) {
    this.label = label;
    this.url = url;
    this.imageUrl = imageUrl;
    this.target = target;
    this.windowFeatures = windowFeatures;
    this.style = style;
  }
}

export type Button = QuickReply | PostBackButton | UrlButton;
