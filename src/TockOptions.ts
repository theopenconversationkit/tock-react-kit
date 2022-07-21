import TockAccessibility from 'TockAccessibility';
import TockLocalStorage from 'TockLocalStorage';

export interface TockOptions {
  // An initial message to send to the backend to trigger a welcome sequence
  openingMessage?: string;
  // An optional function supplying extra HTTP headers for chat requests.
  // Extra headers must be explicitly allowed by the server's CORS settings.
  extraHeadersProvider?: () => Promise<Record<string, string>>;
  timeoutBetweenMessage?: number;
  widgets?: any;
  disableSse?: boolean;
  accessibility?: TockAccessibility;
  /**
   * @deprecated since version 22.3.1
   */
  localStorage?: boolean;
  localStorageHistory?: TockLocalStorage;
}

export default TockOptions;
