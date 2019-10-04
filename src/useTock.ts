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
    imageUrl: string,
    subTitle?: string,
    buttons?: { label: string; url: string }[]
  ) => void;
  addCarousel: (cards: Card[]) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
}

const useTock: (tockEndPoint: string) => UseTock = (tockEndPoint: string) => {
  const { messages, quickReplies }: TockState = useTockState();
  const dispatch: Dispatch<TockAction> = useTockDispatch();

  const addMessage: (message: string, author: 'bot' | 'user') => void = useCallback(
    (message: string, author: 'bot' | 'user') =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [{ author, message, type: 'message' }],
      }),
    []
  );

  const sendMessage: (message: string) => Promise<void> = useCallback((message: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      messages: [{ author: 'user', message, type: 'message' }],
    });
    return fetch(tockEndPoint, {
      body: JSON.stringify({
        query: message,
        userId: 'user',
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ responses }) =>
        dispatch({
          type: 'ADD_MESSAGE',
          messages: responses.map(({ text }: any) => ({
            author: 'bot',
            message: text,
            type: 'message',
          })),
        })
      );
  }, []);

  const addCard: (
    title: string,
    imageUrl: string,
    subTitle?: string,
    buttons?: { label: string; url: string }[]
  ) => void = useCallback(
    (
      title: string,
      imageUrl: string,
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
  };
};

export default useTock;
