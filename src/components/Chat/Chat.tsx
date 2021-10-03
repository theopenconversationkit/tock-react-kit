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
  extraHeadersProvider?: () => Promise<Record<string, string>>;
  disableSse?: boolean;
}

const Chat: (props: ChatProps) => JSX.Element = ({
  endPoint,
  referralParameter,
  timeoutBetweenMessage = 700,
  openingMessage = undefined,
  widgets = {},
  extraHeadersProvider = undefined,
  disableSse = false,
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
  }: UseTock = useTock(endPoint, extraHeadersProvider, disableSse);

  useEffect(() => {
    // When the chat gets initialized for the first time, process optional referral|opening message
    sseInitPromise.then(() => {
      if (referralParameter) {
        sendReferralParameter(referralParameter);
      }
      if (messages.length === 0 && openingMessage) {
        sendOpeningMessage(openingMessage);
      }
    });
  }, [referralParameter]);

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
