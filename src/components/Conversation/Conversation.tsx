import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from '@emotion/styled';

import DefaultWidget from '../widgets/DefaultWidget';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import Card from '../Card';
import Carousel from '../Carousel';
import Loader from '../Loader';
import QuickReplyList from '../QuickReplyList';
import useIntervalCounter from './hooks/useIntervalCounter';
import useScrollBehaviour from './hooks/useScrollBehaviour';

import type {
  Button,
  Card as ICard,
  Carousel as ICarousel,
  Message,
  MessageType,
  TextMessage,
  Widget,
  QuickReply as CQuickReply,
} from 'TockContext';
import TockAccessibility from 'TockAccessibility';

const ConversationOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConversationInnerContainer = styled.ul`
  padding: 0;
  margin: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface RenderOptions {
  widgets?: any;
  onAction: (button: Button) => void;
}

const renderWidget = (message: Widget, options: RenderOptions) => {
  const Widget = options?.widgets[message.widgetData.type] ?? DefaultWidget;
  return <Widget {...message.widgetData.data} />;
};

const renderMessage = (message: TextMessage, options: RenderOptions) => {
  if (message.author === 'bot') {
    return <MessageBot message={message} onAction={options.onAction} />;
  }
  return <MessageUser>{message.message}</MessageUser>;
};

const renderCard = (card: ICard, options: RenderOptions) => (
  <Card onAction={options.onAction} {...card} />
);

const renderCarousel = (carousel: ICarousel, options: RenderOptions, accessibility?: TockAccessibility) => (
  <Carousel accessibility={accessibility}>
    {carousel.cards.map((card: ICard, index: number) => (
      <Card key={index} onAction={options.onAction} {...card} />
    ))}
  </Carousel>
);

interface Renderer {
  (message: Message, options: RenderOptions, accessibility?: TockAccessibility): JSX.Element;
}

const MESSAGE_RENDERER: {
  [key in MessageType]: Renderer;
} = {
  widget: renderWidget,
  message: renderMessage,
  card: renderCard,
  carousel: renderCarousel,
};

const makeRenderMessage = (options: RenderOptions, accessibility?: TockAccessibility) => (
  message: Message | ICard | ICarousel | Widget,
  index: number,
) => {
  const render: Renderer = MESSAGE_RENDERER[message.type];
  if (!render) return null;
  return React.cloneElement(render(message, options, accessibility), {
    key: `${message.type}-${index}`,
  });
};

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  messages: Message[];
  messageDelay: number;
  widgets?: any;
  loading?: boolean;
  quickReplies: CQuickReply[];
  onAction: (button: Button) => void;
  onQuickReplyClick: (button: Button) => void;
  accessibility?: TockAccessibility;
};

const Conversation = ({
  messages,
  messageDelay,
  loading = false,
  onAction,
  widgets,
  onQuickReplyClick,
  quickReplies,
  accessibility,
  ...rest
}: Props) => {
  if (messages && messages.length !== 0) {
    const displayableMessageCount = useIntervalCounter(
    messages.filter((message) => message.isSessionMessage === true).length,
      messages.length,
      messageDelay,
    );
    const displayableMessages = messages.slice(0, displayableMessageCount);
    const scrollContainer = useScrollBehaviour([displayableMessages]);
    const renderMessage = makeRenderMessage({
      widgets,
      onAction,
    },
    accessibility);

    return (
      <ConversationOuterContainer aria-live='polite' aria-atomic='false' aria-relevant='additions' {...rest}>
        <ConversationInnerContainer ref={scrollContainer}>
          {displayableMessages.map(renderMessage)}
          {loading && <Loader />}
        </ConversationInnerContainer>
        {displayableMessageCount === messages.length && (
          <QuickReplyList items={quickReplies} onItemClick={onQuickReplyClick} />
        )}
      </ConversationOuterContainer>
    );
  } else {
    return(
      <ConversationOuterContainer aria-live='polite' aria-atomic='false' aria-relevant='additions' {...rest}></ConversationOuterContainer>
    );
  }
};

export default Conversation;
