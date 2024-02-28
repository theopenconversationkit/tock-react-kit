import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import DefaultWidget from '../widgets/DefaultWidget';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import Card from '../Card';
import Carousel from '../Carousel';
import Loader from '../Loader';
import Image from '../Image';
import QuickReplyList from '../QuickReplyList';
import InlineQuickReplyList from '../InlineQuickReplyList';
import useMessageCounter from './hooks/useMessageCounter';
import useScrollBehaviour from './hooks/useScrollBehaviour';
import TockTheme from '../../styles/theme';

import TockAccessibility from '../../TockAccessibility';
import { Button, QuickReply } from '../../model/buttons';
import type {
  Card as ICard,
  Carousel as ICarousel,
  Image as IImage,
  Message,
  MessageType,
  TextMessage,
  Widget,
} from '../../model/messages';

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
  widgets: { [id: string]: (props: unknown) => JSX.Element };
  onAction: (button: Button) => void;
}

const renderWidget = (widget: Widget, options: RenderOptions) => {
  const WidgetRenderer =
    options.widgets?.[widget.widgetData.type] ?? DefaultWidget;
  return <WidgetRenderer {...widget.widgetData.data} />;
};

const renderMessage = (message: TextMessage, options: RenderOptions) => {
  if (message.author === 'bot') {
    return <MessageBot message={message} onAction={options.onAction} />;
  }
  return <MessageUser>{message.message}</MessageUser>;
};

const renderImage = (image: IImage) => {
  return <Image {...image} />;
};

const renderCard = (card: ICard, options: RenderOptions) => (
  <Card onAction={options.onAction} {...card} />
);

const renderCarousel = (
  carousel: ICarousel,
  options: RenderOptions,
  accessibility?: TockAccessibility,
) => (
  <Carousel accessibility={accessibility}>
    {carousel.cards.map((card: ICard, index: number) => (
      <Card key={index} onAction={options.onAction} {...card} />
    ))}
  </Carousel>
);

interface Renderer {
  (
    message: Message,
    options: RenderOptions,
    accessibility?: TockAccessibility,
  ): JSX.Element;
}

const MESSAGE_RENDERER: {
  [key in MessageType]: Renderer;
} = {
  widget: renderWidget,
  message: renderMessage,
  card: renderCard,
  carousel: renderCarousel,
  image: renderImage,
};

const makeRenderMessage =
  (options: RenderOptions, accessibility?: TockAccessibility) =>
  (message: Message, index: number) => {
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
  widgets?: { [id: string]: (props: unknown) => JSX.Element };
  loading?: boolean;
  quickReplies: QuickReply[];
  onAction: (button: Button) => void;
  onQuickReplyClick: (button: Button) => void;
  accessibility?: TockAccessibility;
};

const Conversation = ({
  messages,
  messageDelay,
  loading = false,
  onAction,
  widgets = {},
  onQuickReplyClick,
  quickReplies,
  accessibility,
  ...rest
}: Props): JSX.Element => {
  if (messages && messages.length !== 0) {
    const displayableMessageCount = useMessageCounter(
      messages,
      messageDelay,
      (message) => 'author' in message && message.author === 'user',
    );
    const theme: TockTheme = useTheme();
    const displayableMessages = messages.slice(0, displayableMessageCount);
    const scrollContainer = useScrollBehaviour([displayableMessages]);
    const renderMessage = makeRenderMessage(
      {
        widgets,
        onAction,
      },
      accessibility,
    );

    return (
      <ConversationOuterContainer
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
        {...rest}
      >
        <ConversationInnerContainer ref={scrollContainer}>
          {displayableMessages.map(renderMessage)}
          {loading && <Loader />}
        </ConversationInnerContainer>
        {!loading &&
          displayableMessageCount === messages.length &&
          (theme.inlineQuickReplies ? (
            <InlineQuickReplyList
              items={quickReplies}
              onItemClick={onQuickReplyClick}
              accessibility={accessibility}
            />
          ) : (
            <QuickReplyList
              items={quickReplies}
              onItemClick={onQuickReplyClick}
            />
          ))}
      </ConversationOuterContainer>
    );
  } else {
    return (
      <ConversationOuterContainer
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
        {...rest}
      />
    );
  }
};

export default Conversation;
