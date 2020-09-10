import styled, { StyledComponent } from '@emotion/styled';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import linkifyHtml from 'linkifyjs/html';
import { prop } from 'styled-tools';

import TockTheme from '../../styles/theme';
import { TextMessage, Button } from '../../TockContext';
import QuickReplyList from '../QuickReplyList';

export const MessageContainer: StyledComponent<
  unknown,
  unknown,
  TockTheme
> = styled.div`
  width: 100%;
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;

export const Message: StyledComponent<unknown, unknown, TockTheme> = styled.div`
  display: inline-block;
  background: ${prop<any>('theme.palette.background.bot')};
  color: ${prop<any>('theme.palette.text.bot')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${prop<any>('theme.overrides.messageBot', '')}
`;

export interface MessageProps {
  message: TextMessage;
  onAction: (button: Button) => void;
}

const MessageBot: (props: MessageProps) => JSX.Element = ({
  message,
  onAction,
}: MessageProps) => {
  function getHtmlContent() {
    const content = message.message?.toString() || '';
    return linkifyHtml(content);
  }

  return (
    <MessageContainer>
      <Message>
        <div dangerouslySetInnerHTML={{ __html: getHtmlContent() }} />
      </Message>
      {Array.isArray(message.buttons) && message.buttons.length > 0 && (
        <QuickReplyList
          items={message.buttons}
          onItemClick={onAction}
        />
      )}
    </MessageContainer>
  );
};

export default MessageBot;
