import React, {useEffect} from 'react';
import { Card, Carousel, Message, QuickReply } from '../../TockContext';
import useTock, { UseTock } from '../../useTock';
import CardComponent from '../Card';
import CarouselComponent from '../Carousel';
import ChatInput from '../ChatInput';
import Container from '../Container';
import Conversation from '../Conversation';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import QR from '../QuickReply';
import QuickReplyList from '../QuickReplyList';

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
}

const Chat: (props: ChatProps) => JSX.Element = ({ endPoint, referralParameter, timeoutBetweenMessage = 1500 }: ChatProps) => {
  const { messages, quickReplies, sendMessage, sendQuickReply, sendAction, sendReferralParameter }: UseTock = useTock(
    endPoint,
    timeoutBetweenMessage
  );
  useEffect(() => {
    if (referralParameter) {
      sendReferralParameter(referralParameter);
    }
  }, [sendReferralParameter, referralParameter]);
  return (
    <Container>
      <Conversation>
        {messages.map((message: Message | Card | Carousel, i: number) => {
          if (message.type === 'message') {
            return message.author === 'bot' ? (
              <MessageBot key={i}>{message.message}</MessageBot>
            ) : (
              <MessageUser key={i}>{message.message}</MessageUser>
            );
          } else if (message.type === 'card') {
            return (
              <CardComponent
                key={i}
                {...message}
                onButtonClick={(button: { label: string; url?: string }) =>
                  sendAction(button.label, button.url)
                }
              />
            );
          } else if (message.type === 'carousel') {
            return (
              <CarouselComponent key={i}>
                {message.cards.map((card: Card, ic: number) => (
                  <CardComponent
                    key={ic}
                    {...card}
                    onButtonClick={(button: { label: string; url?: string }) =>
                      sendAction(button.label, button.url)
                    }
                  />
                ))}
              </CarouselComponent>
            );
          }
          return null;
        })}
      </Conversation>
      <QuickReplyList>
        {quickReplies.map((qr: QuickReply, i: number) => (
          <QR key={i} onClick={sendQuickReply.bind(null, qr.label, qr.payload)}>
            {qr.label}
          </QR>
        ))}
      </QuickReplyList>
      <ChatInput onSubmit={(message: string) => sendMessage(message)} />
    </Container>
  );
};

export default Chat;
