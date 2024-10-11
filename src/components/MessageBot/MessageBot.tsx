import styled, { StyledComponent } from '@emotion/styled';
import { theme } from 'styled-tools';
import { Button } from '../../model/buttons';
import { TextMessage } from '../../model/messages';
import ButtonList from '../buttons/ButtonList';

import '../../styles/theme';
import { useTextRenderer } from '../../settings/RendererSettings';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const MessageContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  width: 100%;
  max-width: ${theme('sizing.conversation.width')};

  p {
    margin: 0;
  }
`;

export const Message: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
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
  message: { buttons, message = '' },
  onAction,
}: MessageProps) => {
  const HtmlRenderer = useTextRenderer('html');

  return (
    <MessageContainer>
      <Message>
        <HtmlRenderer text={message} />
      </Message>
      {Array.isArray(buttons) && buttons.length > 0 && (
        <ButtonList items={buttons} onItemClick={onAction} />
      )}
    </MessageContainer>
  );
};

export default MessageBot;
