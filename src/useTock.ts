import { Dispatch, useCallback } from 'react';
import {
  Button,
  Card,
  Carousel,
  Message,
  MessageType,
  PostBackButton,
  QuickReply,
  TextMessage,
  TockAction,
  TockState,
  UrlButton,
  useTockDispatch,
  useTockState,
  WidgetData,
} from './TockContext';
import { Sse } from './Sse';

export interface UseTock {
  messages: Message[];
  quickReplies: QuickReply[];
  loading: boolean;
  addMessage: (
    message: string,
    author: 'bot' | 'user',
    buttons?: Button[],
  ) => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: { label: string; url?: string }[],
  ) => void;
  addCarousel: (cards: Card[]) => void;
  addWidget: (widgetData: WidgetData) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
  sendQuickReply: (button: Button) => Promise<void>;
  sendAction: (button: Button) => Promise<void>;
  sendReferralParameter: (referralParameter: string) => void;
  sseInitPromise: Promise<void>;
  sseInitializing: boolean;
  sendOpeningMessage: (msg: string) => void;
}

function mapButton(button: any): Button {
  if (button.type === 'web_url') {
    return new UrlButton(button.title, button.url, button.imageUrl);
  } else if (button.type === 'postback') {
    return new PostBackButton(button.title, button.payload, button.imageUrl);
  } else if (button.type === 'quick_reply') {
    return new QuickReply(
      button.title,
      button.payload,
      button.nlpText,
      button.imageUrl,
    );
  } else {
    return new UrlButton(button.title, button.url, button.imageUrl);
  }
}

function mapCard(card: any): Card {
  return {
    title: card.title,
    subTitle: card.subTitle,
    imageUrl: card.file ? card.file.url : null,
    buttons: card.buttons.map((button: any) => mapButton(button)),
    type: MessageType.card,
  } as Card;
}

const useTock: (
  tockEndPoint: string,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
) => UseTock = (
  tockEndPoint: string,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
) => {
  const {
    messages,
    quickReplies,
    userId,
    loading,
    sseInitializing,
  }: TockState = useTockState();
  const dispatch: Dispatch<TockAction> = useTockDispatch();

  const startLoading: () => void = () => {
    dispatch({
      type: 'SET_LOADING',
      loading: true,
    });
  };

  const stopLoading: () => void = () => {
    dispatch({
      type: 'SET_LOADING',
      loading: false,
    });
  };

  const handleBotResponse: (botResponse: any) => void = ({
    responses,
  }: any) => {
    if (Array.isArray(responses) && responses.length > 0) {
      const lastMessage: any = responses[responses.length - 1];
      if (lastMessage.buttons && lastMessage.buttons.length > 0) {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: (lastMessage.buttons || [])
            .filter((button: any) => button.type === 'quick_reply')
            .map(mapButton),
        });
      } else {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: [],
        });
      }
      dispatch({
        type: 'ADD_MESSAGE',
        messages: responses.map(({ text, card, carousel, widget }: any) => {
          if (widget) {
            return {
              widgetData: widget,
              type: MessageType.widget,
            };
          } else if (text) {
            return {
              author: 'bot',
              message: text,
              type: MessageType.message,
              buttons: (lastMessage.buttons || [])
                .filter((button: any) => button.type !== 'quick_reply')
                .map(mapButton),
            } as Message;
          } else if (card) {
            return mapCard(card);
          } else {
            return {
              cards: carousel.cards.map(mapCard),
              type: MessageType.carousel,
            } as Carousel;
          }
        }),
      });
    }
  };

  const handleBotResponseIfSseDisabled: (botResponse: any) => void = (
    botResponse: any,
  ) => {
    if (!Sse.isEnable()) {
      handleBotResponse(botResponse);
    }
  };

  const addMessage: (
    message: string,
    author: 'bot' | 'user',
    buttons?: Button[],
  ) => void = useCallback(
    (message: string, author: 'bot' | 'user', buttons?: Button[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            author,
            message,
            type: MessageType.message,
            buttons: buttons,
          } as TextMessage,
        ],
      }),
    [],
  );

  const getExtraHeaders: () => Promise<Record<string, string>> =
    extraHeadersProvider ?? (async () => ({}));

  const clearMessages: () => void = useCallback(
    () =>
      dispatch({
        type: 'CLEAR_MESSAGES',
      }),
    [],
  );

  const sendMessage: (
    message: string,
    payload?: string,
  ) => Promise<void> = useCallback(
    async (message: string, payload?: string) => {
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          { author: 'user', message, type: MessageType.message } as TextMessage,
        ],
      });
      startLoading();
      const body = payload
        ? {
            payload: payload,
            userId: userId,
          }
        : {
            query: message,
            userId: userId,
          };

      return fetch(tockEndPoint, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getExtraHeaders()),
        },
      })
        .then((res) => res.json())
        .then(handleBotResponseIfSseDisabled)
        .finally(stopLoading);
    },
    [],
  );

  const sendReferralParameter: (
    referralParameter: string,
  ) => void = useCallback((referralParameter: string) => {
    startLoading();
    fetch(tockEndPoint, {
      body: JSON.stringify({
        ref: referralParameter,
        userId: userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }, []);

  const sendQuickReply: (button: Button) => Promise<void> = (
    button: Button,
  ) => {
    if (button instanceof UrlButton) {
      window.open(button.url, '_blank');
      return Promise.resolve();
    } else if (button.payload) {
      setQuickReplies([]);
      addMessage(button.label, 'user');
      startLoading();
      return sendPayload(button.payload);
    } else {
      if (button instanceof QuickReply && button.nlpText) {
        return sendMessage(button.nlpText);
      }
      return sendMessage(button.label);
    }
  };

  function sendPayload(payload?: string) {
    return fetch(tockEndPoint, {
      body: JSON.stringify({
        payload,
        userId: userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }

  const sendAction: (button: Button) => Promise<void> = (button: Button) => {
    if (button instanceof UrlButton) {
      window.open(button.url, '_blank');
    } else {
      return sendMessage(button.label, button.payload);
    }
    return Promise.resolve();
  };

  // Sends an initial message to the backend, to trigger a welcome message
  const sendOpeningMessage: (msg: string) => void = (msg) => {
    send(msg);
  };

  // Sends a message directly to the bot backend, without it appearing in the chat
  const send: (message: string) => void = (message) => {
    fetch(tockEndPoint, {
      body: JSON.stringify({
        query: message,
        userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(handleBotResponse);
  };

  const addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: Button[],
  ) => void = useCallback(
    (title: string, imageUrl?: string, subTitle?: string, buttons?: Button[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            title,
            imageUrl,
            subTitle,
            buttons,
            type: MessageType.card,
          },
        ],
      }),
    [],
  );

  const addCarousel: (cards: Card[]) => void = useCallback(
    (cards: Card[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: MessageType.carousel,
            cards,
          },
        ],
      }),
    [],
  );

  const addWidget: (widgetData: WidgetData) => void = useCallback(
    (widgetData: WidgetData) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: MessageType.widget,
            widgetData: widgetData,
          },
        ],
      }),
    [],
  );

  const setQuickReplies: (quickReplies: QuickReply[]) => void = useCallback(
    (quickReplies: QuickReply[]) =>
      dispatch({
        type: 'SET_QUICKREPLIES',
        quickReplies,
      }),
    [],
  );

  const onSseStateChange: (state: number) => void = useCallback(
    (state: number) =>
      dispatch({
        type: 'SET_SSE_INITIALIZING',
        sseInitializing: state === EventSource.CONNECTING,
      }),
    [],
  );

  const sseInitPromise =
    disableSse == true
      ? Sse.disable()
      : Sse.init(tockEndPoint, userId, handleBotResponse, onSseStateChange);

  return {
    messages,
    quickReplies,
    loading,
    clearMessages,
    addCard,
    addCarousel,
    addMessage,
    addWidget,
    sendMessage,
    setQuickReplies,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    sendOpeningMessage,
    sseInitPromise,
    sseInitializing,
  };
};

export default useTock;
