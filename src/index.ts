import _TockOptions from './TockOptions';
import _TockTheme from './styles/theme';

export { default as ThemeProvider } from './styles/tockThemeProvider';
export { default as Card, CardContainer, CardOuter } from './components/Card';
export { default as Carousel } from './components/Carousel';
export { default as Chat } from './components/Chat';
export { default as ChatInput } from './components/ChatInput';
export { default as Container } from './components/Container';
export { default as Loader } from './components/Loader';
export { default as Conversation } from './components/Conversation';
export { default as Image } from './components/Image';
export {
  default as MessageBot,
  MessageContainer,
  Message,
} from './components/MessageBot';
export { default as MessageUser } from './components/MessageUser';
export { default as QuickReply } from './components/QuickReply';
export { default as QuickReplyList } from './components/QuickReplyList';
export { renderChat } from './renderChat';
export { default as TockContext } from './TockContext';
export { default as useTock } from './useTock';
export { default as createTheme } from './styles/createTheme';
export type TockTheme = _TockTheme;
export type TockOptions = _TockOptions;
