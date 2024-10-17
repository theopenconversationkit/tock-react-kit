import TockAccessibility from './TockAccessibility';
import TockLocalStorage from './TockLocalStorage';
import { TockOptionalSettings } from './settings/TockSettings';
import PostInitContext from './PostInitContext';

export interface TockOptions extends TockOptionalSettings {
  // a callback that will be executed once the chat is able to send and receive messages
  afterInit?: (context: PostInitContext) => Promise<void>;
  // An initial message to send to the backend to trigger a welcome sequence
  // This message will be sent after the afterInit callback runs
  openingMessage?: string;
  // An optional function supplying extra HTTP headers for chat requests.
  // Extra headers must be explicitly allowed by the server's CORS settings.
  extraHeadersProvider?: () => Promise<Record<string, string>>;
  timeoutBetweenMessage?: number;
  widgets?: { [id: string]: (props: unknown) => JSX.Element };
  disableSse?: boolean;
  accessibility?: TockAccessibility;
  localStorageHistory?: TockLocalStorage;
}

export default TockOptions;
