import { arrayBufferToBase64, base64ToUint8Array } from './utils';
import { Message } from './model/messages';

/**
 * Pluggable strategy for serializing/encrypting the message history
 * persisted to `localStorage`, and for reversing that operation when
 * reloading the history.
 *
 * `useTock` uses {@link createDefaultHistorySerialization} by default. When
 * `LocalStorageSettings.encryptionKey` is set, it instead uses
 * {@link createEncryptedHistorySerialization}. A consumer can provide a fully
 * custom implementation via `LocalStorageSettings.historyEncryption` to
 * replace either built-in serialization mechanism entirely (e.g. to use a
 * different cipher, or delegate to a server-side/native encryption API).
 */
export interface HistorySerialization {
  encrypt: (history: Message[]) => Promise<string>;
  decrypt: (history: string | null) => Promise<Message[] | null>;
}

/**
 * Encrypts the given message history using AES-GCM, deriving the encryption
 * key from the provided `encryptionKey` factory (SHA-256 hash of the key
 * string). If no `encryptionKey` is provided, the history is returned as
 * plain (unencrypted) JSON.
 * @param history - the message history to encrypt
 * @param encryptionKey - optional function returning the raw encryption key
 * @returns the serialized (and possibly encrypted) history, ready for storage
 */
export async function encrypt(
  history: Message[],
  encryptionKey?: () => string,
): Promise<string> {
  const payload = JSON.stringify(history);

  if (!encryptionKey) {
    return payload;
  }

  const keyHash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(encryptionKey()),
  );
  const key = await crypto.subtle.importKey(
    'raw',
    keyHash,
    { name: 'AES-GCM' },
    false,
    ['encrypt'],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    new TextEncoder().encode(payload),
  );
  const encryptedBytes = new Uint8Array(encrypted);
  const authTag = encryptedBytes.slice(-16);
  const cipherText = encryptedBytes.slice(0, -16);

  return [
    'v1',
    arrayBufferToBase64(iv),
    arrayBufferToBase64(authTag),
    arrayBufferToBase64(cipherText),
  ].join('.');
}

/**
 * Decrypts a message history previously produced by {@link encrypt}.
 * Falls back to plain JSON parsing for backward compatibility with
 * history stored before encryption support was introduced.
 * @param history - the serialized (and possibly encrypted) history, or null if absent
 * @param encryptionKey - optional function returning the raw encryption key
 * @returns the decrypted message history, or null if `history` is null
 */
export async function decrypt(
  history: string | null,
  encryptionKey?: () => string,
): Promise<Message[] | null> {
  if (history == null) {
    return null;
  }

  if (!encryptionKey) {
    return JSON.parse(history);
  }

  if (!history.startsWith('v1.')) {
    // Backward compatibility: history was stored unencrypted (plain JSON)
    return JSON.parse(history);
  }

  const parts = history.split('.');
  if (parts.length !== 4) {
    throw new Error('Unsupported encrypted history format');
  }

  const [, ivBase64, authTagBase64, encryptedBase64] = parts;

  if (!ivBase64 || !authTagBase64 || !encryptedBase64) {
    throw new Error('Invalid encrypted history format');
  }

  const iv = base64ToUint8Array(ivBase64);
  const authTag = base64ToUint8Array(authTagBase64);
  const encrypted = base64ToUint8Array(encryptedBase64);

  const keyHash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(encryptionKey()),
  );

  const key = await crypto.subtle.importKey(
    'raw',
    keyHash,
    {
      name: 'AES-GCM',
    },
    false,
    ['decrypt'],
  );

  const encryptedWithAuthTag = new Uint8Array(
    encrypted.length + authTag.length,
  );

  encryptedWithAuthTag.set(encrypted);
  encryptedWithAuthTag.set(authTag, encrypted.length);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encryptedWithAuthTag,
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}

/**
 * Builds the default {@link HistorySerialization} implementation, which
 * serializes the history as plain JSON.
 */
export function createDefaultHistorySerialization(): HistorySerialization {
  return {
    encrypt: async (history) => JSON.stringify(history),
    decrypt: async (history) => (history == null ? null : JSON.parse(history)),
  };
}

/**
 * Builds an AES-GCM {@link HistorySerialization}. The encryption key is
 * derived with SHA-256 and the persisted payload keeps the existing `v1`
 * format. Its decrypt operation also accepts pre-existing plain JSON history.
 *
 * @param encryptionKey - function returning the raw encryption key
 */
export function createEncryptedHistorySerialization(
  encryptionKey: () => string,
): HistorySerialization {
  return {
    encrypt: (history) => encrypt(history, encryptionKey),
    decrypt: (history) => decrypt(history, encryptionKey),
  };
}
