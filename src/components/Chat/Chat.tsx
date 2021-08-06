import React, { useEffect } from 'react';
import useTock, { UseTock } from '../../useTock';
import ChatInput from '../ChatInput';
import Container from '../Container';
import Conversation from '../Conversation';

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
  widgets?: any;
  extraHeadersProvider?: () => Promise<Record<string, string>>;
}

const Chat: (props: ChatProps) => JSX.Element = ({
  endPoint,
  referralParameter,
  timeoutBetweenMessage = 700,
  widgets = {},
  extraHeadersProvider = undefined,
}: ChatProps) => {
  const {
    messages,
    quickReplies,
    loading,
    sendMessage,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    sseInitPromise,
    sseInitializing,
  }: UseTock = useTock(endPoint, extraHeadersProvider);

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
