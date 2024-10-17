import { BotConnectorResponse } from '../model/responses';
import {
  EventSourceMessage,
  EventStreamContentType,
  fetchEventSource,
} from '@microsoft/fetch-event-source';

class RetriableError extends Error {}
class FatalError extends Error {}

const INITIAL_RETRY_DELAY = 0;
const RETRY_DELAY_INCREMENT = 1000;
const MAX_RETRY_DELAY = 15000;

export class TockEventSource {
  private initialized: boolean;
  private abortController: AbortController;
  private retryDelay: number;
  onResponse: (botResponse: BotConnectorResponse) => void;
  onStateChange: (state: number) => void;

  constructor() {
    this.initialized = false;
    this.retryDelay = INITIAL_RETRY_DELAY;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Opens an SSE connection to the given web connector endpoint
   *
   * @param endpoint the base endpoint URL, to which '/sse' will be added to form the full SSE endpoint URL
   * @param userId the locally-generated userId (will be ignored if the backend relies on cookies instead)
   * @returns a promise that gets resolved when the connection is open
   * and gets rejected if the connection fails or this event source is closed
   */
  open(endpoint: string, userId: string): Promise<void> {
    this.onStateChange(EventSource.CONNECTING);
    this.abortController = new AbortController();
    return new Promise<void>((resolve, reject): void => {
      fetchEventSource(`${endpoint}/sse?userid=${userId}`, {
        signal: this.abortController.signal,
        onopen: async (response) => {
          if (
            response.ok &&
            response.headers
              .get('content-type')
              ?.includes(EventStreamContentType)
          ) {
            this.onStateChange(EventSource.OPEN);
            this.initialized = true;
            resolve();
            return;
          } else if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage: (e: EventSourceMessage) => {
          if (e.event === 'message') {
            this.onResponse(JSON.parse(e.data));
          }
        },
        onerror: (err) => {
          if (err instanceof FatalError) {
            throw err; // rethrow to stop the operation
          } else {
            const retryDelay = this.retryDelay;
            this.retryDelay = Math.min(
              MAX_RETRY_DELAY,
              retryDelay + RETRY_DELAY_INCREMENT,
            );
            return retryDelay;
          }
        },
      })
        .catch((e) => console.error(e))
        .finally(() => {
          reject();
          this.onStateChange(EventSource.CLOSED);
          this.initialized = false;
        });
    });
  }

  close() {
    this.abortController?.abort();
    this.initialized = false;
  }
}
