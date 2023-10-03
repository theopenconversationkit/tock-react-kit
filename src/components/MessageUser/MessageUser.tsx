import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import { theme } from 'styled-tools';
import { MessageContainer as BotMessageContainer } from '../MessageBot';

const MessageContainer: StyledComponent<{}> = styled(BotMessageContainer)`
  text-align: right;
`;

const Message: StyledComponent<{}> = styled.div`
  display: inline-block;
  background: ${theme('palette.background.user')};
  color: ${theme('palette.text.user')};
  padding: 0.5em 1.5em;
  margin-right: 1em;
  border-radius: ${theme('sizing.borderRadius')};
  border-bottom-right-radius: 0;

  ${theme('overrides.messageUser')}
`;

type Props = {
  children: ReactNode;
};

const MessageUser: (props: Props) => JSX.Element = ({ children }: Props) => (
  <MessageContainer>
    <Message>{children}</Message>
  </MessageContainer>
);

export default MessageUser;
