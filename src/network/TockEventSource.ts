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
  private currentUrl: string | null;
  private eventSource: EventSource | null;
  private retryDelay: number;
  private retryTimeoutId: number;
  private retryOnPingTimeoutId?: number;
  private retryOnPingTimeoutMs: number;
  onResponse: (botResponse: BotConnectorResponse) => void;
  onStateChange: (state: number) => void;

  constructor({ retryOnPingTimeoutMs }: { retryOnPingTimeoutMs: number }) {
    this.initialized = false;
    this.retryDelay = INITIAL_RETRY_DELAY;
    this.retryOnPingTimeoutMs = retryOnPingTimeoutMs;
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
    const url = `${endpoint}/sse?userid=${userId}`;
    this.onStateChange(EventSource.CONNECTING);
    this.currentUrl = url;
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
      this.scheduleRetryWatchdog('open');
      resolve();
    });
    this.eventSource.addEventListener('error', () => {
      this.eventSource?.close();
      this.retry(url, resolve, reject);
    });
    this.eventSource.addEventListener('message', (e) => {
      this.scheduleRetryWatchdog('message');
      this.onResponse(JSON.parse(e.data));
    });
    this.eventSource.addEventListener('ping', () => {
      this.scheduleRetryWatchdog('ping');
    });
  }

  private retry(url: string, resolve: () => void, reject: () => void) {
    const retryDelay = this.retryDelay;
    this.retryDelay = Math.min(
      MAX_RETRY_DELAY,
      retryDelay + RETRY_DELAY_INCREMENT,
    );

    this.onStateChange(EventSource.CONNECTING);

    this.retryTimeoutId = window.setTimeout(async () => {
      switch (await getSseStatus(url)) {
        case SseStatus.UNSUPPORTED:
          reject();
          this.close();
          break;
        case SseStatus.SUPPORTED:
          this.tryOpen(url, resolve, reject);
          break;
        case SseStatus.SERVER_UNAVAILABLE:
          this.retry(url, resolve, reject);
          break;
      }
    }, retryDelay);
  }

  /**
   * Set a watchdog timeout to trigger a retry if the server is not responding
   */
  private scheduleRetryWatchdog(reason: string) {
    window.clearTimeout(this.retryOnPingTimeoutId);
    this.retryOnPingTimeoutId = window.setTimeout(() => {
      this.triggerRetryWatchdog(reason);
    }, this.retryOnPingTimeoutMs);
  }

  /**
   * Trigger a retry if the watchdog timeout is reached
   */
  public triggerRetryWatchdog(reason: string): void {
    const url = this.currentUrl;
    if (!url) {
      console.warn(
        'TockEventSource::triggerRetryWatchdog called without an active SSE connection',
      );
      return;
    }
    console.log(
      `TockEventSource::triggerRetryWatchdog (timeout: ${this.retryOnPingTimeoutMs}ms, reason: ${reason})`,
    );
    this.close();
    new Promise((resolve: (value?: unknown) => void, reject) => {
      this.retry(url, resolve, reject);
    }).catch((e) =>
      console.warn(
        'TockEventSource::triggerRetryWatchdog failed to restart SSE connection',
        e,
      ),
    );
  }

  close() {
    window.clearTimeout(this.retryTimeoutId);
    window.clearTimeout(this.retryOnPingTimeoutId);
    this.eventSource?.close();
    this.eventSource = null;
    this.initialized = false;
    this.onStateChange(EventSource.CLOSED);
  }
}
