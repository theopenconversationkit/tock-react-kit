import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { BotConnectorResponse } from '../model/responses';
import {
  GlobalSseCounter,
  TockEventSource,
  TockSseState,
} from './TockEventSource';

/**
 * Builds a fake SSE `Response` whose body is a controllable `ReadableStream`.
 * If `signal` is provided, aborting it errors the stream, emulating a real
 * fetch's behavior when its `AbortController` is aborted.
 */
function sseResponse(
  chunks: string[],
  {
    status = 200,
    keepOpen = false,
    signal,
  }: { status?: number; keepOpen?: boolean; signal?: AbortSignal } = {},
): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      if (!keepOpen) {
        controller.close();
      } else {
        signal?.addEventListener('abort', () => {
          controller.error(new DOMException('Aborted', 'AbortError'));
        });
      }
    },
  });
  return new Response(status === 204 ? null : body, { status });
}

function sseMessage(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

describe('TockEventSource', () => {
  let fetchMock: Mock;
  let source: TockEventSource;

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(async () => {
    source?.close();
    await vi.waitFor(() =>
      expect(
        (globalThis as GlobalSseCounter).tockReactKitActiveSseConnections ?? 0,
      ).toBe(0),
    );
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('opens the connection and forwards parsed messages', async () => {
    const botResponse = { responses: [] } as unknown as BotConnectorResponse;
    fetchMock.mockImplementationOnce((_url, init) =>
      Promise.resolve(
        sseResponse([sseMessage(botResponse)], {
          keepOpen: true,
          signal: init?.signal,
        }),
      ),
    );

    source = new TockEventSource({ retryOnPingTimeoutMs: 30000 });
    const onStateChange = vi.fn();
    const onResponse = vi.fn();
    source.onStateChange = onStateChange;
    source.onResponse = onResponse;

    const initialActiveConnections =
      (globalThis as GlobalSseCounter).tockReactKitActiveSseConnections ?? 0;

    const openPromise = source.open('https://example.com', 'user-1');
    await vi.waitFor(() => expect(source.isInitialized()).toBe(true));
    await openPromise;

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/sse?userid=user-1',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(onStateChange).toHaveBeenCalledWith(TockSseState.OPEN);
    await vi.waitFor(() =>
      expect(onResponse).toHaveBeenCalledWith(botResponse),
    );

    // Verify active connections counter is incremented
    expect(
      (globalThis as GlobalSseCounter).tockReactKitActiveSseConnections,
    ).toBe(initialActiveConnections + 1);
  });

  it('resets the retry watchdog when a named "ping" event is received', async () => {
    const retryOnPingTimeoutMs = 5000;
    fetchMock.mockImplementationOnce((_url, init) =>
      Promise.resolve(
        sseResponse(['event: ping\ndata:\n\n'], {
          keepOpen: true,
          signal: init?.signal,
        }),
      ),
    );

    source = new TockEventSource({ retryOnPingTimeoutMs });
    source.onStateChange = vi.fn();
    source.onResponse = vi.fn();
    const watchdogSpy = vi.spyOn(source, 'triggerRetryWatchdog');

    source.open('https://example.com', 'user-1').catch(() => {});
    await vi.waitFor(() => expect(source.isInitialized()).toBe(true));
    // wait for the ping to be processed before advancing the watchdog clock
    await vi.advanceTimersByTimeAsync(0);

    // Advancing just short of the timeout should not trigger the watchdog,
    // since receiving the 'ping' event should have rescheduled it.
    await vi.advanceTimersByTimeAsync(retryOnPingTimeoutMs - 100);
    expect(watchdogSpy).not.toHaveBeenCalled();
  });

  it('rejects and stops without retrying on a 4XX status (except 429)', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(sseResponse([], { status: 404 })),
    );

    source = new TockEventSource({ retryOnPingTimeoutMs: 30000 });
    const onStateChange = vi.fn();
    source.onStateChange = onStateChange;
    source.onResponse = vi.fn();

    const openPromise = source.open('https://example.com', 'user-1');
    await expect(openPromise).rejects.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(source.isInitialized()).toBe(false);
    expect(onStateChange).toHaveBeenLastCalledWith(TockSseState.CLOSED);
  });

  it('retries with increasing backoff on network errors / 5XX / 429, then succeeds', async () => {
    fetchMock
      .mockImplementationOnce(() => Promise.reject(new TypeError('network')))
      .mockImplementationOnce(() =>
        Promise.resolve(sseResponse([], { status: 503 })),
      )
      .mockImplementationOnce(() =>
        Promise.resolve(sseResponse([], { status: 429 })),
      )
      .mockImplementationOnce((_url, init) =>
        Promise.resolve(
          sseResponse([], { keepOpen: true, signal: init?.signal }),
        ),
      );

    source = new TockEventSource({ retryOnPingTimeoutMs: 30000 });
    source.onStateChange = vi.fn();
    source.onResponse = vi.fn();

    const openPromise = source.open('https://example.com', 'user-1');

    // 1st attempt fails immediately (retryDelay starts at 0)
    await vi.advanceTimersByTimeAsync(0);
    // 2nd attempt scheduled after 1000ms, 3rd after 2000ms
    await vi.advanceTimersByTimeAsync(1000);
    await vi.advanceTimersByTimeAsync(2000);

    await openPromise;
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(source.isInitialized()).toBe(true);
  });

  it('aborts the in-flight connection on close()', async () => {
    let observedSignal: AbortSignal | undefined;
    fetchMock.mockImplementationOnce((_url, init) => {
      observedSignal = init?.signal;
      return Promise.resolve(
        sseResponse([], { keepOpen: true, signal: init?.signal }),
      );
    });

    source = new TockEventSource({ retryOnPingTimeoutMs: 30000 });
    source.onStateChange = vi.fn();
    source.onResponse = vi.fn();

    source.open('https://example.com', 'user-1').catch(() => {});
    await vi.waitFor(() => expect(source.isInitialized()).toBe(true));

    source.close();

    expect(observedSignal?.aborted).toBe(true);
    expect(source.isInitialized()).toBe(false);
    // Give the aborted stream's rejection a chance to be handled; it must
    // not trigger a retry (no extra fetch call).
    await vi.advanceTimersByTimeAsync(20000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
