import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import { prop } from 'styled-tools';

import TockTheme from 'styles/theme';

const MessageContainer: StyledComponent<
  unknown,
  unknown,
  TockTheme
> = styled.div`
  width: 100%;
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  text-align: right;
`;

const Message: StyledComponent<unknown, unknown, TockTheme> = styled.div`
  display: inline-block;
  background: ${prop<any>('theme.palette.background.user')};
  color: ${prop<any>('theme.palette.text.user')};
  padding: 0.5em 1.5em;
  margin-right: 1em;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border-bottom-right-radius: 0;

  ${prop<any>('theme.overrides.messageUser', '')}
`;

type Props = {
  children: ReactNode;
};

const MessageUser: ({ children }: Props) => JSX.Element = ({
  children,
}: Props) => {
  return (
    <MessageContainer>
      <Message>{children}</Message>
    </MessageContainer>
  );
};

export default MessageUser;
