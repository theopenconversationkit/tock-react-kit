import React, { useEffect } from 'react';
import useTock, { UseTock } from '../../useTock';
import ChatInput from '../ChatInput';
import Container from '../Container';
import Conversation from '../Conversation';

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
  openingMessage?: string;
  widgets?: any;
}

const Chat: (props: ChatProps) => JSX.Element = ({
  endPoint,
  referralParameter,
  timeoutBetweenMessage = 700,
  openingMessage = undefined,
  widgets = {},
}: ChatProps) => {
  const {
    messages,
    quickReplies,
    loading,
    sendMessage,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    sendOpeningMessage,
    sseInitPromise,
    sseInitializing,
  }: UseTock = useTock(endPoint);
  useEffect(() => {
    // When the chat gets initialized for the first time, initiate the welcome sequence
    if (messages.length === 0 && openingMessage) {
      sendOpeningMessage(openingMessage);
    }
  }, []);

  useEffect(() => {
    if (referralParameter) {
      sseInitPromise.then(() => sendReferralParameter(referralParameter));
    }
  }, [sendReferralParameter, referralParameter]);

  return (
    <Container>
      <Conversation
        messages={messages}
        messageDelay={timeoutBetweenMessage}
        widgets={widgets}
        loading={loading}
        quickReplies={quickReplies}
        onAction={sendAction}
        onQuickReplyClick={sendQuickReply}
      />
      <ChatInput disabled={sseInitializing} onSubmit={sendMessage} />
    </Container>
  );
};

export default Chat;
