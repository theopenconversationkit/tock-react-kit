import { EventSourceParserStream } from 'eventsource-parser/stream';
import { BotConnectorResponse } from '../model/responses';

const INITIAL_RETRY_DELAY = 0;
const RETRY_DELAY_INCREMENT = 1000;
const MAX_RETRY_DELAY = 15000;

/**
 * Connection state codes, mirroring the DOM `EventSource.CONNECTING/OPEN/CLOSED`
 */
export const TockSseState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSED: 2,
} as const;

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

interface GlobalSseCounter {
  tockReactKitActiveSseConnections?: number;
}

function getSseStatus(response: Response) {
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
}

export class TockEventSource {
  private initialized: boolean;
  private currentUrl: string | null;
  private abortController: AbortController | null;
  private retryDelay: number;
  private retryTimeoutId: number;
  private retryOnPingTimeoutId?: number;
  private readonly retryOnPingTimeoutMs: number;
  onResponse: (botResponse: BotConnectorResponse) => void;
  onStateChange: (state: number) => void;

  constructor({ retryOnPingTimeoutMs }: { retryOnPingTimeoutMs: number }) {
    this.initialized = false;
    this.retryDelay = INITIAL_RETRY_DELAY;
    this.retryOnPingTimeoutMs = retryOnPingTimeoutMs;
    this.currentUrl = null;
    this.abortController = null;
    this.retryTimeoutId = -1;
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
  open(endpoint: string, userId: string | null): Promise<void> {
    const url = `${endpoint}/sse${userId == null ? '' : `?userid=${userId}`}`;
    this.onStateChange(TockSseState.CONNECTING);
    this.currentUrl = url;
    return new Promise<void>((resolve, reject): void => {
      this.tryOpen(url, resolve, reject);
    });
  }

  /**
   * Opens a single fetch-based SSE connection attempt and streams messages from it.
   */
  private tryOpen(url: string, resolve: () => void, reject: () => void) {
    const abortController = new AbortController();
    this.abortController = abortController;

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        const sseStatus = getSseStatus(response);

        if (sseStatus == SseStatus.SUPPORTED && response.body) {
          this.onStateChange(TockSseState.OPEN);
          this.initialized = true;
          this.retryDelay = INITIAL_RETRY_DELAY;
          this.scheduleRetryWatchdog('open');
          resolve();

          (globalThis as GlobalSseCounter).tockReactKitActiveSseConnections =
            +(
              (globalThis as GlobalSseCounter)
                .tockReactKitActiveSseConnections ?? 0
            ) + 1;

          this.readEventStream(response.body)
            .catch((e) => {
              if (!abortController.signal.aborted) {
                console.error(
                  'TockEventSource error while reading SSE stream',
                  e,
                );
              }
            })
            .then(() => {
              (
                globalThis as GlobalSseCounter
              ).tockReactKitActiveSseConnections =
                +(
                  (globalThis as GlobalSseCounter)
                    .tockReactKitActiveSseConnections ?? 0
                ) - 1;
              if (!abortController.signal.aborted) {
                this.retry(url, resolve, reject);
              }
            });
        } else if (sseStatus === SseStatus.UNSUPPORTED) {
          reject();
          this.close();
        } else {
          this.retry(url, resolve, reject);
        }
      })
      .catch(() => {
        // The server is not answering (network error), unless we aborted this attempt ourselves
        if (!abortController.signal.aborted) {
          this.retry(url, resolve, reject);
        }
      });
  }

  private async readEventStream(body: ReadableStream<Uint8Array>) {
    const reader = body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new EventSourceParserStream())
      .getReader();

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value.event === 'ping') {
        this.scheduleRetryWatchdog('ping');
      } else {
        this.scheduleRetryWatchdog('message');
        this.onResponse(JSON.parse(value.data));
      }
    }
  }

  private retry(url: string, resolve: () => void, reject: () => void) {
    const retryDelay = this.retryDelay;
    this.retryDelay = Math.min(
      MAX_RETRY_DELAY,
      retryDelay + RETRY_DELAY_INCREMENT,
    );

    this.onStateChange(TockSseState.CONNECTING);

    this.retryTimeoutId = window.setTimeout(() => {
      this.tryOpen(url, resolve, reject);
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
    this.abortController?.abort();
    this.abortController = null;
    this.initialized = false;
    this.onStateChange(TockSseState.CLOSED);
  }
}
