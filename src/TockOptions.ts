export interface TockOptions {
  // An initial message to send to the backend to trigger a welcome sequence
  openingMessage?: string;
  timeoutBetweenMessage?: number;
  widgets?: any;
}

export default TockOptions;
