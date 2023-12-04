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

  constructor(label: string, payload: string, imageUrl?: string) {
    this.label = label;
    this.payload = payload;
    this.imageUrl = imageUrl;
  }
}

export class UrlButton {
  label: string;
  url: string;
  imageUrl?: string;
  target?: string;

  constructor(label: string, url: string, imageUrl?: string, target?: string) {
    this.label = label;
    this.url = url;
    this.imageUrl = imageUrl;
    this.target = target;
  }
}

export type Button = QuickReply | PostBackButton | UrlButton;
