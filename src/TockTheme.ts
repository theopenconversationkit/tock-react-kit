import TockThemeInputStyle from './TockThemeInputStyle';
import TockThemeCardStyle from './TockThemeCardStyle';

export interface TockTheme {
  fontFamily?: string;
  fontSize?: string;
  userColor?: string;
  botColor?: string;
  cardColor?: string;
  inputColor?: string;
  borderRadius?: string;
  conversationWidth?: string;
  loaderSize?: string,
  styles?: {
    card?: TockThemeCardStyle;
    carouselContainer?: string;
    carouselItem?: string;
    carouselArrow?: string;
    messageBot?: string;
    messageUser?: string;
    chatInput?: TockThemeInputStyle;
    quickReply?: string;
    chat?: string;
  };
}

export default TockTheme;
