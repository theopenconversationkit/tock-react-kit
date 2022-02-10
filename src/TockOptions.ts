import TockAccessibility from "TockAccessibility";

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
}

export default TockOptions;
