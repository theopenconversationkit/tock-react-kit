import React, { useEffect } from 'react';
import useTock, { UseTock } from '../../useTock';
import ChatInput from '../ChatInput';
import Container from '../Container';
import Conversation from '../Conversation';
import TockAccessibility from '../../TockAccessibility';
import TockLocalStorage from 'TockLocalStorage';
import { PostInitContext } from '../../PostInitContext';

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
  /** A callback that will be executed once the chat is able to send and receive messages */
  afterInit?: (tock: PostInitContext) => void | Promise<void>;
  /** An initial message to send to the backend to trigger a welcome sequence.
   This message will be sent after the {@link afterInit} callback runs */
  openingMessage?: string;
  /** A registry of custom widget factories */
  widgets?: { [id: string]: (props: unknown) => JSX.Element };
  /** An optional function supplying extra HTTP headers for chat requests.
  Extra headers must be explicitly allowed by the server's CORS settings. */
  extraHeadersProvider?: () => Promise<Record<string, string>>;
  disableSse?: boolean;
  accessibility?: TockAccessibility;
  localStorageHistory?: TockLocalStorage;
}

const Chat: (props: ChatProps) => JSX.Element = ({
  endPoint,
  referralParameter,
  timeoutBetweenMessage = 700,
  afterInit,
  openingMessage,
  widgets = {},
  extraHeadersProvider = undefined,
  disableSse = false,
  accessibility = {},
  localStorageHistory = {},
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
    sendPayload,
    loadHistory,
    sseInitPromise,
    sseInitializing,
    clearMessages,
  }: UseTock = useTock(
    endPoint,
    extraHeadersProvider,
    disableSse,
    localStorageHistory,
  );

  useEffect(() => {
    // When the chat gets initialized for the first time, process optional referral|opening message
    sseInitPromise.then(async () => {
      const history = loadHistory();

      if (afterInit) {
        await afterInit({
          history,
          clearMessages,
          sendMessage,
          sendPayload,
        });
      }

      if (referralParameter) {
        await sendReferralParameter(referralParameter);
      }

      if (!history && messages.length === 0 && openingMessage) {
        await sendOpeningMessage(openingMessage);
      }
    });
  }, [openingMessage, referralParameter]);

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
        accessibility={accessibility}
      />
      <ChatInput
        disabled={sseInitializing}
        onSubmit={sendMessage}
        accessibility={accessibility}
        clearMessages={clearMessages}
      />
    </Container>
  );
};

export default Chat;
