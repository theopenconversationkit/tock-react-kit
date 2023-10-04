import { PartialDeep } from 'type-fest';
import TockAccessibility from './TockAccessibility';
import TockLocalStorage from './TockLocalStorage';
import { TockConfig } from './TockContext';

export interface TockOptions extends PartialDeep<TockConfig> {
  // An initial message to send to the backend to trigger a welcome sequence
  openingMessage?: string;
  // An optional function supplying extra HTTP headers for chat requests.
  // Extra headers must be explicitly allowed by the server's CORS settings.
  extraHeadersProvider?: () => Promise<Record<string, string>>;
  timeoutBetweenMessage?: number;
  widgets?: any;
  disableSse?: boolean;
  accessibility?: TockAccessibility;
  localStorageHistory?: TockLocalStorage;
}

export default TockOptions;
