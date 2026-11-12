import { BotConnectorResponse } from './model/responses';

type Metadata = Record<string, string> | undefined;

/**
 * Streaming contract of the Tock web connector (metadata of a response envelope):
 * - `TOCK_STREAM_RESPONSE=true`: the message replaces the one with the same `RESPONSE_ID`;
 * - `TOCK_STREAM_PARTIAL=true`: transient frame of an answer being generated (never counted, never recorded);
 * - `TOCK_STREAM_REPLACE=<actionId>`: the final message that replaces the streamed bubble, the others are added;
 * - `TOCK_STREAM_DISCARD=true`: the streamed bubble must be removed;
 * - `TOCK_REQUEST_ID`: identifier sent by the client with the question, echoed on every frame.
 */
export const isPartialFrame = (metadata: Metadata): boolean =>
  metadata?.TOCK_STREAM_PARTIAL === 'true';

export const isDiscardFrame = (metadata: Metadata): boolean =>
  metadata?.TOCK_STREAM_DISCARD === 'true';

/** True for the frames of the contract that designates (or removes) the streamed bubble. */
export const usesStreamContract = (metadata: Metadata): boolean =>
  isPartialFrame(metadata) ||
  isDiscardFrame(metadata) ||
  metadata?.TOCK_STREAM_REPLACE !== undefined;

/** Metadata of a message that must not behave as the streamed bubble (stream flags removed). */
export const withoutStreamFlags = (
  metadata: Record<string, string> | undefined,
): Record<string, string> | undefined => {
  if (!metadata) return metadata;
  const {
    TOCK_STREAM_RESPONSE: _response,
    TOCK_STREAM_PARTIAL: _partial,
    TOCK_STREAM_REPLACE: _replace,
    TOCK_STREAM_DISCARD: _discard,
    TOCK_STREAM_MODE: _mode,
    TOCK_STREAM_KEEP: _keep,
    ...rest
  } = metadata;
  return rest;
};

/** Parses TOCK_STREAM_KEEP: a non-negative integer, otherwise undefined. */
export const parseKeep = (value: string | undefined): number | undefined =>
  value !== undefined && /^\d+$/.test(value) ? Number(value) : undefined;

/**
 * A frame belongs to another request than the ones in flight in this client
 * (frames without request identifier, e.g. notifications, always pass).
 */
export const isFrameOfOtherRequest = (
  botResponse: BotConnectorResponse,
  inFlightRequestIds: ReadonlySet<string>,
): boolean => {
  const requestId = botResponse.metadata?.TOCK_REQUEST_ID;
  return (
    !!requestId &&
    inFlightRequestIds.size > 0 &&
    !inFlightRequestIds.has(requestId)
  );
};

export const newRequestId = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
