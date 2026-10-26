import { act, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import TockContext from './TockContext';
import useTock from './useTock';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const ENDPOINT = 'https://example.com/io/web';

function openSseResponse(signal?: AbortSignal | null): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      signal?.addEventListener('abort', () =>
        controller.error(new DOMException('Aborted', 'AbortError')),
      );
    },
  });
  return new Response(body, { status: 200 });
}

const TockConsumer = () => {
  useTock();
  return null;
};

describe('useTock SSE lifecycle', () => {
  let fetchMock: Mock;
  let sseSignals: AbortSignal[];
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    sseSignals = [];
    fetchMock = vi.fn((url: string, init?: RequestInit) => {
      if (url.startsWith(`${ENDPOINT}/sse`)) {
        sseSignals.push(init!.signal!);
        return Promise.resolve(openSseResponse(init?.signal));
      }
      return Promise.resolve(new Response('{}', { status: 200 }));
    });
    vi.stubGlobal('fetch', fetchMock);
    container = document.createElement('div');
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    vi.unstubAllGlobals();
  });

  const activeSseConnections = () => sseSignals.filter((s) => !s.aborted);

  it('WHEN no component uses useTock THEN no SSE connection is opened', async () => {
    await act(async () => {
      root.render(<TockContext endpoint={ENDPOINT} />);
    });

    expect(sseSignals).toHaveLength(0);
  });

  it('WHEN several components use useTock THEN a single SSE connection is opened', async () => {
    await act(async () => {
      root.render(
        <TockContext endpoint={ENDPOINT}>
          <TockConsumer />
          <TockConsumer />
          <TockConsumer />
        </TockContext>,
      );
    });

    expect(sseSignals).toHaveLength(1);
    expect(activeSseConnections()).toHaveLength(1);
  });

  it('WHEN rendered in StrictMode THEN a single SSE connection remains active', async () => {
    const { StrictMode } = await import('react');
    await act(async () => {
      root.render(
        <StrictMode>
          <TockContext endpoint={ENDPOINT}>
            <TockConsumer />
            <TockConsumer />
          </TockContext>
        </StrictMode>,
      );
    });

    expect(activeSseConnections()).toHaveLength(1);
  });

  it('WHEN some but not all consumers unmount THEN the SSE connection stays open, and closes with the last one', async () => {
    let setCount: (count: number) => void = () => {};
    const Consumers = () => {
      const [count, set] = useState(2);
      setCount = set;
      return (
        <>
          {Array.from({ length: count }, (_, i) => (
            <TockConsumer key={i} />
          ))}
        </>
      );
    };
    await act(async () => {
      root.render(
        <TockContext endpoint={ENDPOINT}>
          <Consumers />
        </TockContext>,
      );
    });
    expect(activeSseConnections()).toHaveLength(1);

    await act(async () => setCount(1));
    expect(sseSignals).toHaveLength(1);
    expect(activeSseConnections()).toHaveLength(1);

    await act(async () => setCount(0));
    expect(activeSseConnections()).toHaveLength(0);

    await act(async () => setCount(1));
    expect(sseSignals).toHaveLength(2);
    expect(activeSseConnections()).toHaveLength(1);
  });
});
