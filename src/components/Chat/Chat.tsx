import React, {useEffect, useState} from 'react';
import {Card, Carousel, Message, QuickReply, Widget} from '../../TockContext';
import useTock, {UseTock} from '../../useTock';
import CardComponent from '../Card';
import CarouselComponent from '../Carousel';
import ChatInput from '../ChatInput';
import Container from '../Container';
import Conversation from '../Conversation';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import QR from '../QuickReply';
import QuickReplyList from '../QuickReplyList';
import Loader from "../Loader";
import DefaultWidget from "../widgets/DefaultWidget";

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
  widgets?: any
}

const Chat: (props: ChatProps) => JSX.Element = ({endPoint, referralParameter, timeoutBetweenMessage = 700, widgets = {}}: ChatProps) => {
  const {messages, quickReplies, loading, sendMessage, sendQuickReply, sendAction, sendReferralParameter}: UseTock = useTock(
    endPoint
  );
  const [displayableMessageCount, setDisplayableMessageCount] = useState(0);
  useEffect(() => {
    if (referralParameter) {
      sendReferralParameter(referralParameter);
    }
  }, [sendReferralParameter, referralParameter]);
  useEffect(() => {
    if (messages.length > displayableMessageCount) {
      setTimeout(() => {
        setDisplayableMessageCount(displayableMessageCount + 1);
      }, timeoutBetweenMessage)
    }
  }, [messages, displayableMessageCount]);
  return (
    <Container>
      <Conversation>
        {messages.slice(0, displayableMessageCount).map((message: Message | Card | Carousel | Widget, i: number) => {
          if (message.type === 'widget') {
            let WidgetComponent = DefaultWidget;
            if (widgets[message.widgetData.type]) {
              WidgetComponent = widgets[message.widgetData.type];
            }
            return <WidgetComponent key={i} {...message.widgetData.data}/>
          } else if (message.type === 'message') {
            return message.author === 'bot' ? (
              <MessageBot key={i} message={message} sendAction={sendAction} />
            ) : (
              <MessageUser key={i}>{message.message}</MessageUser>
            );
          } else if (message.type === 'card') {
            return (
              <CardComponent
                sendAction={sendAction}
                key={i}
                {...message}
              />
            );
          } else if (message.type === 'carousel') {
            return (
              <CarouselComponent key={i}>
                {message.cards.map((card: Card, ic: number) => (
                  <CardComponent
                    sendAction={sendAction}
                    key={ic}
                    {...card}
                  />
                ))}
              </CarouselComponent>
            );
          }
          return null;
        })}
        {loading && <Loader/>}
      </Conversation>
      {displayableMessageCount == messages.length && <QuickReplyList>
        {quickReplies.map((qr: QuickReply, i: number) => (
          <QR key={i} onClick={sendQuickReply.bind(null, qr.label, qr.payload)}>
            {qr.label}
          </QR>
        ))}
      </QuickReplyList>}
      <ChatInput onSubmit={(message: string) => sendMessage(message)}/>
    </Container>
  );
};

export default Chat;