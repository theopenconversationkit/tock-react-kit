import { Context, createContext, Dispatch, Reducer, useContext } from 'react';
import { QuickReply } from './model/buttons';
import { Message } from './model/messages';

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
  userId: string;
  loading: boolean;
  sseInitializing: boolean;
  metadata: Record<string, string>;
  error: boolean;
}

export interface TockAction {
  type:
    | 'SET_QUICKREPLIES'
    | 'ADD_MESSAGE'
    | 'SET_METADATA'
    | 'SET_LOADING'
    | 'SET_SSE_INITIALIZING'
    | 'CLEAR_MESSAGES'
    | 'SET_ERROR';
  quickReplies?: QuickReply[];
  messages?: Message[];
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
