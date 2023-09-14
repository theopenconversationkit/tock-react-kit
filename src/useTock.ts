import { Dispatch, useCallback } from 'react';
import {
  TockAction,
  TockState,
  useTockDispatch,
  useTockState,
} from './TockContext';
import * as Sse from './Sse';
import useLocalTools, { UseLocalTools } from './useLocalTools';
import TockLocalStorage from 'TockLocalStorage';
import { Button, PostBackButton, QuickReply, UrlButton } from './model/buttons';
import {
  Card,
  Carousel,
  Image,
  Message,
  MessageType,
  TextMessage,
  Widget,
  WidgetPayload,
} from './model/messages';
import {
  BotConnectorResponse,
  BotConnectorButton,
  BotConnectorCard,
  BotConnectorImage,
} from './model/responses';

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
  addImage: (title: string, url?: string) => void;
  addCarousel: (cards: Card[]) => void;
  addWidget: (widgetData: WidgetPayload) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
  sendQuickReply: (button: Button) => Promise<void>;
  sendAction: (button: Button) => Promise<void>;
  sendReferralParameter: (referralParameter: string) => void;
  sendOpeningMessage: (msg: string) => Promise<void>;
  addHistory: (
    history: Array<Message>,
    quickReplyHistory: Array<QuickReply>,
  ) => void;
  sseInitPromise: Promise<void>;
  sseInitializing: boolean;
}

function mapButton(button: BotConnectorButton): Button {
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

function mapCard(card: BotConnectorCard): Card {
  return {
    title: card.title,
    subTitle: card.subTitle,
    imageUrl: card.file?.url,
    imageAlternative: card?.file?.description ?? card.title,
    buttons: card.buttons.map(mapButton),
    type: MessageType.card,
  } as Card;
}

function mapImage(image: BotConnectorImage): Image {
  return {
    title: image.file?.name,
    url: image.file?.url,
    alternative: image.file?.description ?? image.file?.name,
    type: MessageType.image,
  } as Image;
}

const useTock: (
  tockEndPoint: string,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
  localStorageHistory?: TockLocalStorage,
) => UseTock = (
  tockEndPoint: string,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
  localStorageHistory?: TockLocalStorage,
) => {
  const {
    messages,
    quickReplies,
    userId,
    loading,
    sseInitializing,
  }: TockState = useTockState();
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const { clearMessages }: UseLocalTools = useLocalTools(
    localStorageHistory?.enable ?? false,
  );

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

  const recordResponseToLocaleSession: (message: Message) => void = (
    message: Message,
  ) => {
    const savedHistory = window.localStorage.getItem('tockMessageHistory');
    const maxNumberMessages = localStorageHistory?.maxNumberMessages ?? 10;
    let history: Message[];
    if (!savedHistory) {
      history = [];
    } else {
      history = JSON.parse(savedHistory);
    }
    if (history.length >= maxNumberMessages) {
      history.splice(0, history.length - maxNumberMessages + 1);
    }
    history.push(message);
    window.localStorage.setItem('tockMessageHistory', JSON.stringify(history));
  };

  const handleBotResponse: (botResponse: BotConnectorResponse) => void = ({
    responses,
  }) => {
    if (Array.isArray(responses) && responses.length > 0) {
      const lastMessage = responses[responses.length - 1];
      const quickReplies = (lastMessage.buttons || [])
        .filter((button) => button.type === 'quick_reply')
        .map(mapButton);
      dispatch({
        type: 'SET_QUICKREPLIES',
        quickReplies,
      });
      if (localStorageHistory?.enable ?? false) {
        window.localStorage.setItem(
          'tockQuickReplyHistory',
          JSON.stringify(quickReplies),
        );
      }
      dispatch({
        type: 'ADD_MESSAGE',
        messages: responses.map(({ text, card, carousel, widget, image }) => {
          let message: Message;
          if (widget) {
            message = {
              widgetData: widget,
              type: MessageType.widget,
            } as Widget;
          } else if (text) {
            message = {
              author: 'bot',
              message: text,
              type: MessageType.message,
              buttons: (lastMessage.buttons || [])
                .filter((button) => button.type !== 'quick_reply')
                .map(mapButton),
            } as TextMessage;
          } else if (card) {
            message = mapCard(card);
          } else if (image) {
            message = mapImage(image);
          } else {
            message = {
              cards: carousel?.cards?.map(mapCard) ?? [],
              type: MessageType.carousel,
            } as Carousel;
          }

          if (localStorageHistory?.enable ?? false) {
            recordResponseToLocaleSession(message);
          }
          return message;
        }),
      });
    }
  };

  const handleBotResponseIfSseDisabled: (
    botResponse: BotConnectorResponse,
  ) => void = (botResponse) => {
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

  const addImage: (title: string, url: string) => void = useCallback(
    (title: string, url: string) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            title,
            url,
            type: MessageType.image,
          } as Image,
        ],
      }),
    [],
  );

  const getExtraHeaders: () => Promise<Record<string, string>> =
    extraHeadersProvider ?? (async () => ({}));

  const sendMessage: (
    message: string,
    payload?: string,
    displayMessage?: boolean,
  ) => Promise<void> = useCallback(
    async (message: string, payload?: string, displayMessage = true) => {
      if (displayMessage) {
        const messageToDispatch = {
          author: 'user',
          message,
          type: MessageType.message,
        } as TextMessage;
        if (localStorageHistory?.enable ?? false) {
          recordResponseToLocaleSession(messageToDispatch);
        }
        dispatch({
          type: 'ADD_MESSAGE',
          messages: [messageToDispatch],
        });
      }
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
      if (localStorageHistory?.enable ?? false) {
        recordResponseToLocaleSession({
          author: 'user',
          message: button.label,
          type: MessageType.message,
        });
      }
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
  const sendOpeningMessage: (msg: string) => Promise<void> = (msg) =>
    sendMessage(msg, undefined, false);

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

  const addWidget: (widgetData: WidgetPayload) => void = useCallback(
    (widgetData: WidgetPayload) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: MessageType.widget,
            widgetData,
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

  const addHistory: (
    messageHistory: Array<Message>,
    quickReplyHistory: Array<QuickReply>,
  ) => void = useCallback(
    (history: Array<Message>, quickReplyHistory: Array<QuickReply>) => {
      dispatch({
        type: 'ADD_MESSAGE',
        messages: history.map((message: Message) => {
          message.alreadyDisplayed = true;
          return message;
        }),
      });
      setQuickReplies(quickReplyHistory);
      stopLoading();
    },
    [],
  );

  return {
    messages,
    quickReplies,
    loading,
    clearMessages,
    addCard,
    addCarousel,
    addMessage,
    addImage,
    addWidget,
    sendMessage,
    setQuickReplies,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    sendOpeningMessage,
    addHistory,
    sseInitPromise,
    sseInitializing,
  };
};

export default useTock;
