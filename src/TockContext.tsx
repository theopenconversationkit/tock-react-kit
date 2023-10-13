import React, {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import deepmerge from 'deepmerge';
import { PartialDeep } from 'type-fest';
import { retrieveUserId } from './utils';
import { QuickReply } from './model/buttons';
import { Message } from './model/messages';

export const TockSettingsContext: Context<
  TockSettings | undefined
> = createContext<TockSettings | undefined>(undefined);

export const TockStateContext: Context<TockState | undefined> = createContext<
  TockState | undefined
>(undefined);
export const TockStateDispatch: Context<
  Dispatch<TockAction> | undefined
> = createContext<Dispatch<TockAction> | undefined>(undefined);

export const useTockSettings: () => TockSettings = () => {
  const settings = useContext(TockSettingsContext);
  if (!settings) {
    throw new Error('useTockSettings must be used in a TockContext');
  }
  return settings;
};

export const useTockState: () => TockState = () => {
  const state: TockState | undefined = useContext(TockStateContext);
  if (!state) {
    throw new Error('useTockState must be used in a TockContext');
  }
  return state;
};

export const useTockDispatch: () => Dispatch<TockAction> = () => {
  const dispatch: Dispatch<TockAction> | undefined = useContext(
    TockStateDispatch,
  );
  if (!dispatch) {
    throw new Error('useTockDispatch must be used in a TockContext');
  }
  return dispatch;
};

export interface LocalStorageSettings {
  prefix?: string;
}

export interface TockSettings {
  localStorage: LocalStorageSettings;
}

export interface TockState {
  quickReplies: QuickReply[];
  messages: Message[];
  userId: string;
  loading: boolean;
  sseInitializing: boolean;
  metadata: Record<string, string>;
}

export interface TockAction {
  type:
    | 'SET_QUICKREPLIES'
    | 'ADD_MESSAGE'
    | 'SET_METADATA'
    | 'SET_LOADING'
    | 'SET_SSE_INITIALIZING'
    | 'CLEAR_MESSAGES';
  quickReplies?: QuickReply[];
  messages?: Message[];
  loading?: boolean;
  sseInitializing?: boolean;
  metadata?: Record<string, string>;
}

const tockReducer: Reducer<TockState, TockAction> = (
  state: TockState,
  action: TockAction,
): TockState => {
  switch (action.type) {
    case 'SET_QUICKREPLIES':
      if (action.quickReplies) {
        return {
          ...state,
          quickReplies: action.quickReplies,
        };
      }
      break;
    case 'ADD_MESSAGE':
      if (action.messages) {
        return {
          ...state,
          messages: [...state.messages, ...action.messages],
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
    default:
      break;
  }
  return state;
};

const defaultSettings: TockSettings = {
  localStorage: {},
};

const TockContext: (props: {
  children?: ReactNode;
  settings?: PartialDeep<TockSettings>;
}) => JSX.Element = ({
  children,
  settings = {},
}: {
  children?: ReactNode;
  settings: PartialDeep<TockSettings>;
}) => {
  const mergedSettings = deepmerge(defaultSettings, settings);
  const [state, dispatch]: [TockState, Dispatch<TockAction>] = useReducer(
    tockReducer,
    {
      quickReplies: [],
      messages: [],
      userId: retrieveUserId(mergedSettings.localStorage.prefix),
      loading: false,
      sseInitializing: false,
      metadata: {},
    },
  );
  return (
    <TockSettingsContext.Provider value={mergedSettings}>
      <TockStateContext.Provider value={state}>
        <TockStateDispatch.Provider value={dispatch}>
          {children}
        </TockStateDispatch.Provider>
      </TockStateContext.Provider>
    </TockSettingsContext.Provider>
  );
};

export default TockContext;
