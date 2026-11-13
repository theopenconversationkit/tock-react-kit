import { Context, createContext, Dispatch, Reducer, useContext } from 'react';
import { QuickReply } from './model/buttons';
import { Message, MessageType } from './model/messages';
import { parseKeep } from './streaming';

export const TockStateContext: Context<TockState | undefined> = createContext<
  TockState | undefined
>(undefined);
export const TockStateDispatch: Context<Dispatch<TockAction> | undefined> =
  createContext<Dispatch<TockAction> | undefined>(undefined);

export const useTockState: () => TockState = () => {
  const state: TockState | undefined = useContext(TockStateContext);
  if (!state) {
    throw new Error('useTockState must be used in a TockContext');
  }
  return state;
};

export const useTockDispatch: () => Dispatch<TockAction> = () => {
  const dispatch: Dispatch<TockAction> | undefined =
    useContext(TockStateDispatch);
  if (!dispatch) {
    throw new Error('useTockDispatch must be used in a TockContext');
  }
  return dispatch;
};

export interface TockState {
  quickReplies: QuickReply[];
  messages: Message[];
  userId: string | null;
  loading: boolean;
  sseInitializing: boolean;
  metadata: Record<string, string>;
  error: boolean;
}

export interface TockAction {
  type:
    | 'SET_QUICKREPLIES'
    | 'ADD_MESSAGE'
    | 'UPDATE_MESSAGE'
    | 'DISCARD_STREAMED_MESSAGE'
    | 'SET_METADATA'
    | 'SET_LOADING'
    | 'SET_SSE_INITIALIZING'
    | 'CLEAR_MESSAGES'
    | 'SET_ERROR';
  quickReplies?: QuickReply[];
  messages?: Message[];
  responseId?: string;
  loading?: boolean;
  sseInitializing?: boolean;
  metadata?: Record<string, string>;
  error?: boolean;
}

export const tockReducer: Reducer<TockState, TockAction> = (
  state: TockState,
  action: TockAction,
): TockState => {
  switch (action.type) {
    case 'SET_QUICKREPLIES':
      if (action.quickReplies) {
        return {
          ...state,
          quickReplies: action.quickReplies,
          error: !!action.error,
        };
      }
      break;
    case 'ADD_MESSAGE':
      if (action.messages) {
        return {
          ...state,
          messages: [...state.messages, ...action.messages],
          error: !!action.error,
        };
      }
      break;

    case 'UPDATE_MESSAGE':
      if (action.messages) {
        let messageAlreadyExists = false;

        const newMessages = state.messages.map((current) => {
          // Search if a streamed message with the same responseId already exists
          const incoming = action.messages?.find((m) => {
            const exists =
              m.metadata?.RESPONSE_ID === current.metadata?.RESPONSE_ID &&
              m.metadata?.TOCK_STREAM_RESPONSE === 'true' &&
              current.metadata?.TOCK_STREAM_RESPONSE === 'true';

            if (exists) {
              messageAlreadyExists = true;
            }

            return exists;
          });

          // If the message already exists, replace it with the new message,
          // or append the fragment to it when the server streams deltas
          if (incoming) {
            if (
              incoming.metadata?.TOCK_STREAM_MODE === 'delta' &&
              current.type === MessageType.message &&
              incoming.type === MessageType.message
            ) {
              // Desynchronized stream: wait for the final response
              if (current.metadata?.TOCK_STREAM_DESYNC === 'true') {
                return current;
              }
              const keep = parseKeep(incoming.metadata?.TOCK_STREAM_KEEP);
              if (keep === undefined || keep > current.message.length) {
                return {
                  ...current,
                  metadata: { ...current.metadata, TOCK_STREAM_DESYNC: 'true' },
                };
              }
              return {
                ...incoming,
                message: current.message.slice(0, keep) + incoming.message,
              };
            }
            return incoming;
          }

          // Else return the original message
          return current;
        });

        // If the message is new, add it to the messages
        // We can have multiple messages with the same responseId, but we only want to add the last one (chunks when streaming is disabled)
        if (!messageAlreadyExists) {
          const messagesToAdd: Message[] = [];
          const seenResponseIds = new Set<string>();

          for (let i = action.messages.length - 1; i >= 0; i--) {
            const message = action.messages[i];
            const responseId = message.metadata?.RESPONSE_ID;
            const isStreamedResponse = message.metadata?.TOCK_STREAM_RESPONSE;

            if (responseId && isStreamedResponse === 'true') {
              if (!seenResponseIds.has(responseId)) {
                seenResponseIds.add(responseId);
                messagesToAdd.push(message);
              }
            } else {
              messagesToAdd.push(message);
            }
          }

          messagesToAdd.reverse();

          newMessages.push(...messagesToAdd);
        }

        return {
          ...state,
          messages: newMessages,
          error: !!action.error,
        };
      }
      break;
    case 'DISCARD_STREAMED_MESSAGE':
      if (action.responseId) {
        return {
          ...state,
          messages: state.messages.filter(
            (m) =>
              !(
                m.metadata?.RESPONSE_ID === action.responseId &&
                m.metadata?.TOCK_STREAM_RESPONSE === 'true'
              ),
          ),
        };
      }
      break;
    case 'SET_LOADING':
      if (action.loading != undefined) {
        return {
          ...state,
          loading: action.loading,
        };
      }
      break;
    case 'SET_SSE_INITIALIZING':
      if (action.sseInitializing != undefined) {
        return {
          ...state,
          sseInitializing: action.sseInitializing,
          error: !!action.error,
        };
      }
      break;
    case 'CLEAR_MESSAGES':
      if (state.messages) {
        return {
          ...state,
          messages: [],
        };
      }
      break;
    case 'SET_METADATA':
      if (action.metadata != undefined) {
        return {
          ...state,
          metadata: action.metadata,
        };
      }
      break;
    case 'SET_ERROR':
      return {
        ...state,
        error: !!action.error,
      };
    default:
      break;
  }
  return state;
};
