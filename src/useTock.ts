import { Dispatch, useCallback } from 'react';
import {
  Button,
  Message,
  QuickReply,
  TockAction,
  TockState,
  useTockDispatch,
  useTockState,
  Card,
  Carousel,
  Widget,
  WidgetData,
  UrlButton,
  PostBackButton
} from './TockContext';
import { Sse } from "./Sse";

export interface UseTock {
  messages: (Message | Card | Carousel | Widget)[];
  quickReplies: QuickReply[];
  loading: boolean;
  addMessage: (message: string, author: 'bot' | 'user') => void;
  sendMessage: (message: string) => Promise<void>;
  addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: { label: string; url?: string }[]
  ) => void;
  addCarousel: (cards: Card[]) => void;
  addWidget: (widgetData: WidgetData) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
  sendQuickReply: (label: string, payload?: string) => Promise<void>;
  sendAction: (button: Button) => Promise<void>;
  sendReferralParameter: (referralParameter: string) => Promise<void>;
}


function mapButton(button: any): Button {
  if(button.type === "web_url") {
    return new UrlButton(button.title, button.url);
  } else if(button.type === "postback") {
    return new PostBackButton(button.title,button.payload);
  } else if(button.type === "quick_reply") {
    return new QuickReply(button.title,button.payload)
  } else {
    return new UrlButton(button.title, button.url);
  }
}

function mapCard(card: any): Card {
  return {
    title: card.title,
    subTitle: card.subTitle,
    imageUrl: card.file ? card.file.url : null,
    buttons: card.buttons.map((button: any) => mapButton(button)),
    type: 'card',
  } as Card;
}

const useTock: (tockEndPoint: string) => UseTock = (tockEndPoint: string) => {
  const { messages, quickReplies, userId, loading }: TockState = useTockState();
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

  const handleBotResponse: (botResponse: any) => void = ({ responses }: any) => {
    if (Array.isArray(responses) && responses.length > 0) {
      const lastMessage: any = responses[responses.length - 1];
      if (lastMessage.buttons && lastMessage.buttons.length > 0) {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: lastMessage.buttons.map(({ title, payload }: any) => new QuickReply(title, payload))
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
          if(widget) {
            return  {
              widgetData: widget,
              type: 'widget'
            }
          } else if (text) {
            return {
              author: 'bot',
              message: text,
              type: 'message',
            } as Message;
          } else if (card) {
            return mapCard(card);
          } else {
            return {
              cards: carousel.cards.map(mapCard),
              type: 'carousel',
            } as Carousel;
          }
        }),
      });
    }
  };

  const handleBotResponseIfSseDisabled: (botResponse: any) => void = (botResponse: any) => {
    if (!Sse.isEnable()) {
      handleBotResponse(botResponse)
    }
  };

  const addMessage: (message: string, author: 'bot' | 'user') => void = useCallback(
    (message: string, author: 'bot' | 'user') =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [{author, message, type: 'message'}],
      }),
    []
  );

  const sendMessage: (message: string, payload?: string) => Promise<void> = useCallback((message: string, payload?: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      messages: [{ author: 'user', message, type: 'message' }],
    });
    startLoading();
    let body = payload?{
      payload: payload,
      userId: userId,
    }:{
      query: message,
      userId: userId,
    };
    return fetch(tockEndPoint, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }, []);

  const sendReferralParameter: (referralParameter: string) => Promise<void> = useCallback((referralParameter: string) => {
    startLoading();
    return fetch(tockEndPoint, {
      body: JSON.stringify({
        ref: referralParameter,
        userId: userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }, []);

  const sendQuickReply: (label: string, payload?: string) => Promise<void> = (
    label: string,
    payload?: string
  ) => {
    if (payload) {
      setQuickReplies([]);
      addMessage(label, 'user');
      startLoading();
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
        .then(res => res.json())
        .then(handleBotResponseIfSseDisabled)
        .finally(stopLoading);
    } else {
      return sendMessage(label);
    }
  };

  const sendAction: (button: Button) => Promise<void> = (button: Button) => {
    if (button instanceof UrlButton) {
      window.open(button.url, '_blank');
    } else {
      return sendMessage(button.label, button.payload);
    }
    return Promise.resolve();
  };

  const addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: Button[]
  ) => void = useCallback(
    (
      title: string,
      imageUrl?: string,
      subTitle?: string,
      buttons?: Button[]
    ) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            title,
            imageUrl,
            subTitle,
            buttons,
            type: 'card',
          },
        ],
      }),
    []
  );

  const addCarousel: (cards: Card[]) => void = useCallback(
    (cards: Card[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: 'carousel',
            cards,
          },
        ],
      }),
    []
  );

  const addWidget: (widgetData: WidgetData) => void = useCallback(
    (widgetData: WidgetData) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: 'widget',
            widgetData: widgetData
          }
        ],
      }),
    []
  );


  const setQuickReplies: (quickReplies: QuickReply[]) => void = useCallback(
    (quickReplies: QuickReply[]) =>
      dispatch({
        type: 'SET_QUICKREPLIES',
        quickReplies,
      }),
    []
  );


  Sse.init(tockEndPoint, userId, handleBotResponse);

  return {
    messages,
    quickReplies,
    loading,
    addCard,
    addCarousel,
    addMessage,
    addWidget,
    sendMessage,
    setQuickReplies,
    sendQuickReply,
    sendAction,
    sendReferralParameter
  };
};

export default useTock;
