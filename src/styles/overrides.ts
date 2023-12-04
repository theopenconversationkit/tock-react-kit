import { Interpolation } from '@emotion/react';
import TockThemeButtonStyle from './tockThemeButtonStyle';
import TockThemeCardStyle from './tockThemeCardStyle';
import TockThemeInputStyle from './tockThemeInputStyle';

export interface Overrides {
  buttons?: Partial<TockThemeButtonStyle>;
  card?: Partial<TockThemeCardStyle>;
  chatInput?: Partial<TockThemeInputStyle>;
  carouselContainer: Interpolation<unknown>;
  carouselItem: Interpolation<unknown>;
  carouselArrow: Interpolation<unknown>;
  messageBot: Interpolation<unknown>;
  messageUser: Interpolation<unknown>;
  quickReply: Interpolation<unknown>;
  quickReplyImage: Interpolation<unknown>;
  chat: Interpolation<unknown>;
  quickReplyArrow: Interpolation<unknown>;
}
