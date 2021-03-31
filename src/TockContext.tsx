import React, {
  Dispatch,
  ReactNode,
  Reducer,
  useReducer,
  createContext,
  Context,
  useContext,
} from 'react';
import { retrieveUserId } from './utils';

export const TockStateContext: Context<TockState | undefined> = createContext<
  TockState | undefined
>(undefined);
export const TockStateDispatch: Context<
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

export class QuickReply {
  label: string;
  payload?: string;
  nlpText?: string;
  imageUrl?: string;

  constructor(
    label: string,
    payload: string,
    nlpText?: string,
    imageUrl?: string,
  ) {
    this.label = label;
    this.payload = payload;
    this.nlpText = nlpText;
    this.imageUrl = imageUrl;
  }
}

export class PostBackButton {
  label: string;
  payload?: string;
  imageUrl?: string;

  constructor(label: string, payload: string, imageUrl?: string) {
    this.label = label;
    this.payload = payload;
    this.imageUrl = imageUrl;
  }
}

export class UrlButton {
  label: string;
  url: string;
  imageUrl?: string;

  constructor(label: string, url: string, imageUrl?: string) {
    this.label = label;
    this.url = url;
    this.imageUrl = imageUrl;
  }
}

export type Button = QuickReply | PostBackButton | UrlButton;

export enum MessageType {
  message = 'message',
  card = 'card',
  carousel = 'carousel',
  widget = 'widget',
}

export interface Message {
  type: MessageType;
}

export interface TextMessage extends Message {
  author: 'bot' | 'user';
  message: string;
  type: MessageType.message;
  buttons?: Button[];
}

export interface Card extends Message {
  imageUrl?: string;
  title: string;
  subTitle?: string;
  buttons?: Button[];
  type: MessageType.card;
}

export interface Carousel extends Message {
  cards: Card[];
  type: MessageType.carousel;
}

export interface Widget extends Message {
  widgetData: WidgetData;
  type: MessageType.widget;
}

export interface WidgetData {
  data: any;
  type: string;
}

export interface TockState {
  quickReplies: QuickReply[];
  messages: (Message | Card | Carousel | Widget)[];
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
  messages?: (Message | Card | Carousel | Widget)[];
  loading?: boolean;
  sseInitializing?: boolean;
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
