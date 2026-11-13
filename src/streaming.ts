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
 * A frame is correlated to a request (`TOCK_REQUEST_ID`) that this client is not
 * handling, so it must be ignored. The rule is stable for the whole lifetime of a
 * stream: a correlated frame is accepted only while its request is in flight here.
 *
 * It is deliberately NOT gated on `inFlightRequestIds.size > 0`: otherwise an idle
 * tab (no request in flight) would accept a foreign tab's partial frames, then start
 * rejecting the rest the moment it sends its own question — leaving an orphan
 * provisional bubble that is never finalized nor recorded. For the same reason, a late
 * frame arriving after the local request completed (success or error — the id is then
 * removed from the in-flight set) is treated as foreign and dropped, so it cannot
 * revive a closed/errored request.
 *
 * Frames without a request identifier (e.g. notifications) always pass.
 */
export const isFrameOfOtherRequest = (
  botResponse: BotConnectorResponse,
  inFlightRequestIds: ReadonlySet<string>,
): boolean => {
  const requestId = botResponse.metadata?.TOCK_REQUEST_ID;
  return !!requestId && !inFlightRequestIds.has(requestId);
};

export const newRequestId = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
