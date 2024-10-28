import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  TockAction,
  TockState,
  useTockDispatch,
  useTockState,
} from './TockState';
import { useTockSettings } from './settings/TockSettingsContext';
import useLocalTools, { UseLocalTools } from './useLocalTools';
import type TockLocalStorage from 'TockLocalStorage';
import { retrievePrefixedLocalStorageKey, storageAvailable } from './utils';
import { TockHistoryData } from './PostInitContext';
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
  BotConnectorButton,
  BotConnectorCard,
  BotConnectorImage,
  BotConnectorResponse,
} from './model/responses';
import TockSettings from './settings/TockSettings';
import { TockEventSource } from './network/TockEventSource';

export interface UseTock {
  messages: Message[];
  quickReplies: QuickReply[];
  loading: boolean;
  error: boolean;
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
  sendReferralParameter: (referralParameter: string) => Promise<void>;
  sendOpeningMessage: (msg: string) => Promise<void>;
  sendPayload: (payload: string) => Promise<void>;
  loadHistory: () => TockHistoryData | null;
  /**
   * @deprecated use {@link loadHistory} instead of reimplementing history parsing
   */
  addHistory: (
    history: Array<Message>,
    quickReplyHistory: Array<QuickReply>,
  ) => void;
  sseInitPromise: Promise<void>;
  sseInitializing: boolean;
}

function mapButton(button: BotConnectorButton): Button {
  if (button.type === 'postback') {
    return new PostBackButton(button.title, button.payload, button.imageUrl);
  } else if (button.type === 'quick_reply') {
    return new QuickReply(
      button.title,
      button.payload,
      button.nlpText,
      button.imageUrl,
    );
  } else {
    return new UrlButton(
      button.title,
      button.url,
      button.imageUrl,
      button.target,
      button.windowFeatures,
    );
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
    title: image.title,
    url: image.file?.url,
    alternative: image.file?.description ?? image.file?.name,
    type: MessageType.image,
  } as Image;
}

const FINISHED_PROCESSING = -1;

export const useTock0: (
  tockEndPoint: string,
  settings: TockSettings,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
  localStorageHistory?: TockLocalStorage,
) => UseTock = (
  tockEndPoint: string,
  { locale, localStorage: localStorageSettings, network: networkSettings },
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSseArg?: boolean,
  localStorageHistoryArg?: TockLocalStorage,
) => {
  const {
    messages,
    quickReplies,
    userId,
    loading,
    sseInitializing,
    error,
  }: TockState = useTockState();
  const dispatch: Dispatch<TockAction> = useTockDispatch();
  const localStorageEnabled =
    localStorageHistoryArg?.enable ?? localStorageSettings.enableMessageHistory;
  const localStorageMaxMessages =
    localStorageHistoryArg?.maxNumberMessages ??
    localStorageSettings.maxMessageCount;
  const localStoragePrefix = localStorageSettings.prefix;
  const disableSse = disableSseArg ?? networkSettings.disableSse;
  const { clearMessages }: UseLocalTools = useLocalTools(localStorageEnabled);
  const handledResponses = useRef<Record<string, number>>({});
  const afterInit = useRef(() => {});
  const afterInitPromise = useRef(
    new Promise<void>((resolve) => {
      afterInit.current = resolve;
    }),
  );
  const sseSource = useRef(new TockEventSource());

  const startLoading: () => void = useCallback(() => {
    dispatch({
      type: 'SET_LOADING',
      loading: true,
    });
  }, [dispatch]);

  const stopLoading: () => void = useCallback(() => {
    dispatch({
      type: 'SET_LOADING',
      loading: false,
    });
  }, [dispatch]);

  const recordResponseToLocalSession: (message: Message) => void = useCallback(
    (message: Message) => {
      const messageHistoryLSKeyName = retrievePrefixedLocalStorageKey(
        localStoragePrefix,
        'tockMessageHistory',
      );

      const savedHistory = window.localStorage.getItem(messageHistoryLSKeyName);
      let history: Message[];
      if (!savedHistory) {
        history = [];
      } else {
        history = JSON.parse(savedHistory);
      }
      if (history.length >= localStorageMaxMessages) {
        history.splice(0, history.length - localStorageMaxMessages + 1);
      }
      history.push(message);
      window.localStorage.setItem(
        messageHistoryLSKeyName,
        JSON.stringify(history),
      );
    },
    [localStoragePrefix, localStorageMaxMessages],
  );

  const handleBotResponse: (botResponse: BotConnectorResponse) => void =
    useCallback(
      ({ responses, metadata }) => {
        dispatch({
          type: 'SET_METADATA',
          metadata: metadata || {},
        });

        if (Array.isArray(responses) && responses.length > 0) {
          const lastMessage = responses[responses.length - 1];
          const quickReplies = (lastMessage.buttons || [])
            .filter((button) => button.type === 'quick_reply')
            .map(mapButton);
          dispatch({
            type: 'SET_QUICKREPLIES',
            quickReplies,
          });
          if (localStorageEnabled) {
            const quickReplyHistoryLSKeyName = retrievePrefixedLocalStorageKey(
              localStoragePrefix,
              'tockQuickReplyHistory',
            );
            window.localStorage.setItem(
              quickReplyHistoryLSKeyName,
              JSON.stringify(quickReplies),
            );
          }
          dispatch({
            type: 'ADD_MESSAGE',
            messages: responses.flatMap((response) => {
              const { text, card, carousel, widget, image, buttons } = response;
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
                  buttons: (buttons || [])
                    .filter((button) => button.type !== 'quick_reply')
                    .map(mapButton),
                } as TextMessage;
              } else if (card) {
                message = mapCard(card);
              } else if (image) {
                message = mapImage(image);
              } else if (carousel) {
                message = {
                  cards: carousel.cards.map(mapCard),
                  type: MessageType.carousel,
                } as Carousel;
              } else {
                console.error('Unsupported bot response', response);
                return [];
              }

              message.metadata = metadata;

              if (localStorageEnabled) {
                recordResponseToLocalSession(message);
              }
              return [message];
            }),
          });
        }
      },
      [dispatch],
    );

  const setProcessedMessageCount = useCallback(
    (responseId: string, newCount: number) => {
      handledResponses.current[responseId] = newCount;
      const handledResponsesLSKeyName = retrievePrefixedLocalStorageKey(
        localStoragePrefix,
        'tockHandledResponses',
      );

      window.localStorage.setItem(
        handledResponsesLSKeyName,
        JSON.stringify(handledResponses.current),
      );
    },
    [localStoragePrefix],
  );

  const handlePostBotResponse: (botResponse: BotConnectorResponse) => void =
    useCallback(
      (botResponse) => {
        const responseId = botResponse.metadata?.['RESPONSE_ID'];
        if (!responseId && !sseSource.current.isInitialized()) {
          // no identifier and SSE enabled -> always discard POST response, handle with SSE
          // no identifier and SSE disabled -> always handle here
          handleBotResponse(botResponse);
        } else {
          const processedMessageCount =
            handledResponses.current[responseId] ?? 0;
          if (processedMessageCount >= 0) {
            handleBotResponse(
              processedMessageCount > 0 // did we already receive messages for this response through SSE?
                ? {
                    ...botResponse,
                    // only add messages that have not been processed from SSE
                    responses: botResponse.responses.slice(
                      processedMessageCount,
                    ),
                  }
                : botResponse,
            );
            // mark as processed through POST - no further messages should be handled for this response
            setProcessedMessageCount(responseId, FINISHED_PROCESSING);
          } else {
            console.warn(
              'Bot POST request yielded the same response twice, discarding',
              botResponse,
            );
          }
        }
      },
      [setProcessedMessageCount, handleBotResponse],
    );

  const handleSseBotResponse: (botResponse: BotConnectorResponse) => void = (
    botResponse,
  ) => {
    const responseId = botResponse.metadata?.['RESPONSE_ID'];
    if (!responseId) {
      // no identifier -> always handle with SSE
      handleBotResponse(botResponse);
    } else {
      const processedMessageCount = handledResponses.current[responseId] ?? 0;
      if (processedMessageCount >= 0) {
        handleBotResponse(botResponse);
        setProcessedMessageCount(
          responseId,
          processedMessageCount + botResponse.responses.length,
        );
      }
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

  const handleError: (error: unknown) => void = ({ error }) => {
    console.error(error);
    stopLoading();
    setQuickReplies([]);
    if (localStorage) {
      window.localStorage.setItem('tockQuickReplyHistory', '');
    }
    dispatch({
      type: 'SET_ERROR',
      error: true,
      loading: false,
    });
  };

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
        if (localStorageEnabled) {
          recordResponseToLocalSession(messageToDispatch);
        }
        dispatch({
          type: 'ADD_MESSAGE',
          messages: [messageToDispatch],
        });
      }
      startLoading();
      const body = payload
        ? {
            payload,
            userId,
            locale,
          }
        : {
            query: message,
            userId,
            locale,
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
        .then(handlePostBotResponse, handleError)
        .finally(stopLoading);
    },
    [locale],
  );

  const sendReferralParameter: (referralParameter: string) => Promise<void> =
    useCallback((referralParameter: string) => {
      startLoading();
      return fetch(tockEndPoint, {
        body: JSON.stringify({
          ref: referralParameter,
          userId,
          locale,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(handlePostBotResponse, handleError)
        .finally(stopLoading);
    }, []);

  const sendQuickReply: (button: Button) => Promise<void> = (
    button: Button,
  ) => {
    if (button instanceof UrlButton) {
      console.warn(
        'Using sendQuickReply for links is deprecated; please use the dedicated UrlButton component',
        button,
      );
      window.open(button.url, '_blank');
      return Promise.resolve();
    } else if (button.payload) {
      setQuickReplies([]);
      if (localStorageEnabled) {
        recordResponseToLocalSession({
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
        userId,
        locale,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(handlePostBotResponse, handleError)
      .finally(stopLoading);
  }

  const sendAction: (button: Button) => Promise<void> = (button: Button) => {
    if (button instanceof UrlButton) {
      console.warn(
        'Using sendAction for links is deprecated; please use the dedicated UrlButton component',
        button,
      );
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

  useEffect(() => {
    sseSource.current.onStateChange = onSseStateChange;
    sseSource.current.onResponse = handleSseBotResponse;
  }, [handleSseBotResponse, onSseStateChange]);

  useEffect(() => {
    if (disableSse || !tockEndPoint.length) {
      afterInit.current();
    } else {
      // Trigger afterInit regardless of whether the SSE call succeeded or failed
      // (it is valid for the backend to refuse SSE connections, but we still attempt to connect by default)
      sseSource.current
        .open(tockEndPoint, userId)
        .catch((e) => console.error(e))
        .finally(afterInit.current);
    }
    return () => sseSource.current.close();
  }, [disableSse, tockEndPoint]);

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

  const loadHistory: () => TockHistoryData | null = () => {
    // If not first time, return existing messages
    if (messages.length) {
      return {
        messages,
        quickReplies,
      };
    }

    const messageHistoryLSKey = retrievePrefixedLocalStorageKey(
      localStoragePrefix,
      'tockMessageHistory',
    );
    const quickReplyHistoryLSKey = retrievePrefixedLocalStorageKey(
      localStoragePrefix,
      'tockQuickReplyHistory',
    );
    const handledResponsesLSKeyName = retrievePrefixedLocalStorageKey(
      localStoragePrefix,
      'tockHandledResponses',
    );

    const serializedHistory =
      storageAvailable('localStorage') && localStorageEnabled
        ? window.localStorage.getItem(messageHistoryLSKey)
        : undefined;

    if (serializedHistory) {
      const messages = JSON.parse(serializedHistory);
      const quickReplies = JSON.parse(
        window.localStorage.getItem(quickReplyHistoryLSKey) || '[]',
      );
      addHistory(messages, quickReplies);
      handledResponses.current = {
        ...JSON.parse(
          window.localStorage.getItem(handledResponsesLSKeyName) || '{}',
        ),
        ...handledResponses.current,
      };
      return { messages, quickReplies };
    }

    return null;
  };

  return {
    messages,
    quickReplies,
    loading,
    error,
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
    sendPayload,
    addHistory,
    loadHistory,
    sseInitPromise: afterInitPromise.current,
    sseInitializing,
  };
};

export const UseTockContext = createContext<UseTock | undefined>(undefined);

export default (
  tockEndPoint?: string,
  extraHeadersProvider?: () => Promise<Record<string, string>>,
  disableSse?: boolean,
  localStorageHistory?: TockLocalStorage,
) => {
  const contextTock = useContext(UseTockContext);
  const settings = useTockSettings();
  if (contextTock != null) {
    return contextTock;
  }
  if (settings.endpoint == null && tockEndPoint == null) {
    throw new Error('TOCK endpoint must be provided in TockContext');
  } else if (settings.endpoint == null) {
    console.warn(
      'Passing TOCK endpoint as argument to TockChat or useTock is deprecated; please set it in TockContext instead.',
    );
  }
  return contextTock
    ? contextTock
    : useTock0(
        (tockEndPoint ?? settings.endpoint)!,
        settings,
        extraHeadersProvider,
        disableSse,
        localStorageHistory,
      );
};
