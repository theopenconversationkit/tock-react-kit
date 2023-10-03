import TockThemeButtonStyle from './tockThemeButtonStyle';
import TockThemeCardStyle from './tockThemeCardStyle';
import TockThemeInputStyle from './tockThemeInputStyle';

export interface Overrides {
  buttons?: Partial<TockThemeButtonStyle>;
  card?: Partial<TockThemeCardStyle>;
  chatInput?: Partial<TockThemeInputStyle>;
  carouselContainer?: string;
  carouselItem?: string;
  carouselArrow?: string;
  messageBot?: string;
  messageUser?: string;
  quickReply?: string;
  quickReplyImage?: string;
  chat?: string;
  quickReplyArrow?: string;
}
