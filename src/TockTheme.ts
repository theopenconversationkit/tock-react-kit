export interface TockTheme {
  fontFamily?: string;
  fontSize?: string;
  userColor?: string;
  botColor?: string;
  cardColor?: string;
  inputColor?: string;
  borderRadius?: string;
  conversationWidth?: string;
  postbackButtonBackColor?: string;
  postbackButtonRadius?: string;
  postbackButtonColor?: string;
  styles?: {
    card?: string;
    carouselItem?: string;
    carouselArrow?: string;
    messageBot?: string;
    messageUser?: string;
    quickReply?: string;
    chat?: string;
    postbackButton?: string;
  };
}

export default TockTheme;
