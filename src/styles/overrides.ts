import TockThemeInputStyle from './tockThemeInputStyle';
import TockThemeCardStyle from './tockThemeCardStyle';

export interface Overrides {
  card?: Partial<TockThemeCardStyle>;
  chatInput?: Partial<TockThemeInputStyle>;
  carouselContainer?: string;
  carouselItem?: string;
  carouselArrow?: string;
  messageBot?: string;
  messageUser?: string;
  quickReply?: string;
  chat?: string;
}
