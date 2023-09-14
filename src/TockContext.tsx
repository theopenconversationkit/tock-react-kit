import React, {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import { retrieveUserId } from './utils';
import { QuickReply } from './model/buttons';
import { Message } from './model/messages';

const TockStateContext: Context<TockState | undefined> = createContext<
  TockState | undefined
>(undefined);
const TockStateDispatch: Context<
  Dispatch<TockAction> | undefined
> = createContext<Dispatch<TockAction> | undefined>(undefined);

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

export interface TockState {
  quickReplies: QuickReply[];
  messages: Message[];
  userId: string;
  loading: boolean;
  sseInitializing: boolean;
}

export interface TockAction {
  type:
    | 'SET_QUICKREPLIES'
    | 'ADD_MESSAGE'
    | 'SET_LOADING'
    | 'SET_SSE_INITIALIZING'
    | 'CLEAR_MESSAGES';
  quickReplies?: QuickReply[];
  messages?: Message[];
  loading?: boolean;
  sseInitializing?: boolean;
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
    default:
      break;
  }
  return state;
};

const TockContext: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [state, dispatch]: [TockState, Dispatch<TockAction>] = useReducer(
    tockReducer,
    {
      quickReplies: [],
      messages: [],
      userId: retrieveUserId(),
      loading: false,
      sseInitializing: false,
    },
  );
  return (
    <TockStateContext.Provider value={state}>
      <TockStateDispatch.Provider value={dispatch}>
        {children}
      </TockStateDispatch.Provider>
    </TockStateContext.Provider>
  );
};

export default TockContext;
