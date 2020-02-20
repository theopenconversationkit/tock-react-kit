import { Dispatch, useCallback } from 'react';
import {
  Message,
  QuickReply,
  TockAction,
  TockState,
  useTockDispatch,
  useTockState,
  Card,
  Carousel,
} from './TockContext';

export interface UseTock {
  messages: (Message | Card | Carousel)[];
  quickReplies: QuickReply[];
  addMessage: (message: string, author: 'bot' | 'user') => void;
  sendMessage: (message: string) => Promise<void>;
  addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: { label: string; url?: string }[]
  ) => void;
  addCarousel: (cards: Card[]) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
  sendQuickReply: (label: string, payload?: string) => Promise<void>;
  sendAction: (label: string, url?: string) => Promise<void>;
  sendReferralParameter: (referralParameter: string) => Promise<void>;
}

const useTock: (tockEndPoint: string) => UseTock = (tockEndPoint: string) => {
  const { messages, quickReplies, userId }: TockState = useTockState();
  const dispatch: Dispatch<TockAction> = useTockDispatch();

  const addMessage: (message: string, author: 'bot' | 'user') => void = useCallback(
    (message: string, author: 'bot' | 'user') =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [{ author, message, type: 'message' }],
      }),
    []
  );

  const handleBotResponse: (botResponse: any) => void = ({ responses }: any) => {
    if (Array.isArray(responses) && responses.length > 0) {
      const lastMessage: any = responses[responses.length - 1];
      if (lastMessage.buttons && lastMessage.buttons.length > 0) {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: lastMessage.buttons.map(({ title, payload }: any) => ({
            label: title,
            payload,
          })),
        });
      } else {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: [],
        });
      }
      dispatch({
        type: 'ADD_MESSAGE',
        messages: responses.map(({ text, card, carousel }: any) => {
          if (text) {
            return {
              author: 'bot',
              message: text,
              type: 'message',
            } as Message;
          } else if (card) {
            return {
              title: card.title,
              subTitle: card.subTitle,
              imageUrl: card.file ? card.file.url : null,
              buttons: card.actions.map((action: any) => ({
                label: action.title,
                url: action.url
              })),
              type: 'card',
            } as Card;
          } else {
            return {
              cards: carousel.cards.map(
                (card: any) =>
                  ({
                    title: card.title,
                    subTitle: card.subTitle,
                    imageUrl: card.file ? card.file.url : null,
                    buttons: card.actions.map((action: any) => ({
                      label: action.title,
                      url: action.url
                    })),
                    type: 'card',
                  } as Card)
              ),
              type: 'carousel',
            } as Carousel;
          }
        }),
      });
    }
  };

  const sendMessage: (message: string) => Promise<void> = useCallback((message: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      messages: [{ author: 'user', message, type: 'message' }],
    });
    return fetch(tockEndPoint, {
      body: JSON.stringify({
        query: message,
        userId: userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(handleBotResponse);
  }, []);

  const sendReferralParameter: (referralParameter: string) => Promise<void> = useCallback((referralParameter: string) => {
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
        .then(handleBotResponse);
  }, []);

  const sendQuickReply: (label: string, payload?: string) => Promise<void> = (
    label: string,
    payload?: string
  ) => {
    if (payload) {
      addMessage(label, 'user');
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
        .then(handleBotResponse);
    } else {
      return sendMessage(label);
    }
  };

  const sendAction: (label: string, url?: string) => Promise<void> = (
    label: string,
    url?: string
  ) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      return sendMessage(label);
    }
    return Promise.resolve();
  };

  const addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: { label: string; url: string }[]
  ) => void = useCallback(
    (
      title: string,
      imageUrl?: string,
      subTitle?: string,
      buttons?: { label: string; url: string }[]
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

  const setQuickReplies: (quickReplies: QuickReply[]) => void = useCallback(
    (quickReplies: QuickReply[]) =>
      dispatch({
        type: 'SET_QUICKREPLIES',
        quickReplies,
      }),
    []
  );

  return {
    messages,
    quickReplies,
    addCard,
    addCarousel,
    addMessage,
    sendMessage,
    setQuickReplies,
    sendQuickReply,
    sendAction,
    sendReferralParameter
  };
};

export default useTock;
