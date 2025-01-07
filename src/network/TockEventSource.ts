import { BotConnectorResponse } from '../model/responses';

const INITIAL_RETRY_DELAY = 0;
const RETRY_DELAY_INCREMENT = 1000;
const MAX_RETRY_DELAY = 15000;

enum SseStatus {
  /**
   * The server is not answering, or answering with a 1XX, 3XX, 429, or 5XX HTTP status code
   */
  SERVER_UNAVAILABLE = -1,
  /**
   * The server is answering with a 4XX HTTP status code, except 429 (rate limit)
   */
  UNSUPPORTED = 0,
  /**
   * The server is answering with a 2XX HTTP status code
   */
  SUPPORTED = 1,
}

async function getSseStatus(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return SseStatus.SUPPORTED;
    } else if (
      response.status >= 400 &&
      response.status < 500 &&
      response.status !== 429
    ) {
      return SseStatus.UNSUPPORTED;
    } else {
      return SseStatus.SERVER_UNAVAILABLE;
    }
  } catch (_) {
    return SseStatus.SERVER_UNAVAILABLE;
  }
}

export class TockEventSource {
  private initialized: boolean;
  private eventSource: EventSource | null;
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
    const url = `${endpoint}/sse?userid=${userId}`;
    return new Promise<void>((resolve, reject): void => {
      this.tryOpen(url, resolve, reject);
    });
  }

  private tryOpen(url: string, resolve: () => void, reject: () => void) {
    this.eventSource = new EventSource(url);
    this.eventSource.addEventListener('open', () => {
      this.onStateChange(EventSource.OPEN);
      this.initialized = true;
      this.retryDelay = INITIAL_RETRY_DELAY;
      resolve();
    });
    this.eventSource.addEventListener('error', () => {
      this.eventSource?.close();
      this.retry(url, reject, resolve);
    });
    this.eventSource.addEventListener('message', (e) => {
      this.onResponse(JSON.parse(e.data));
    });
  }

  private retry(url: string, reject: () => void, resolve: () => void) {
    const retryDelay = this.retryDelay;
    this.retryDelay = Math.min(
      MAX_RETRY_DELAY,
      retryDelay + RETRY_DELAY_INCREMENT,
    );
    setTimeout(async () => {
      switch (await getSseStatus(url)) {
        case SseStatus.UNSUPPORTED:
          reject();
          this.close();
          break;
        case SseStatus.SUPPORTED:
          this.tryOpen(url, resolve, reject);
          break;
        case SseStatus.SERVER_UNAVAILABLE:
          this.retry(url, reject, resolve);
          break;
      }
    }, retryDelay);
  }

  close() {
    this.eventSource?.close();
    this.eventSource = null;
    this.initialized = false;
    this.onStateChange(EventSource.CLOSED);
  }
}
