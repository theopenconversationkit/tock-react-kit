import styled, { StyledComponent } from '@emotion/styled';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import linkifyHtml from 'linkifyjs/html';
import { theme } from 'styled-tools';
import { Button } from '../../model/buttons';
import { TextMessage } from '../../model/messages';
import ButtonList from '../buttons/ButtonList';

import '../../styles/theme';

export const MessageContainer: StyledComponent<{}> = styled.li`
  width: 100%;
  max-width: ${theme('sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;

  p {
    margin: 0;
  }
`;

export const Message: StyledComponent<{}> = styled.div`
  display: inline-block;
  background: ${theme('palette.background.bot')};
  color: ${theme('palette.text.bot')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${theme('sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${theme('overrides.messageBot')}
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
        <ButtonList items={message.buttons} onItemClick={onAction} />
      )}
    </MessageContainer>
  );
};

export default MessageBot;
