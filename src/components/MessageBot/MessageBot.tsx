import styled, { StyledComponent } from '@emotion/styled';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import linkifyHtml from 'linkifyjs/html';
import { prop } from 'styled-tools';

import TockTheme from 'styles/theme';
import { Message as messageType, Button } from '../../TockContext';
import QR, { QRImage } from '../QuickReply';
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
  message: messageType;
  sendAction: (button: Button) => void;
}

const MessageBot: (props: MessageProps) => JSX.Element = ({
  message,
  sendAction,
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
        <QuickReplyList>
          {message.buttons.map((button: Button, i: number) => (
            <QR key={i} onClick={sendAction.bind(null, button)}>
              {button.imageUrl ? <QRImage src={button.imageUrl} /> : null}
              {button.label}
            </QR>
          ))}
        </QuickReplyList>
      )}
    </MessageContainer>
  );
};

export default MessageBot;
