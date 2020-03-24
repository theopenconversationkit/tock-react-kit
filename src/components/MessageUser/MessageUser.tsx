import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import { readableColor } from 'polished';
import TockTheme from '../../TockTheme';

const MessageContainer: StyledComponent<{}, {}, TockTheme> = styled.div`
  width: 100%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
  text-align: right;
`;

const Message: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  background: ${props => (props.theme && props.theme.userColor) || 'white'};
  color: ${props => readableColor((props.theme && props.theme.userColor) || 'white')};
  padding: 0.5em 1.5em;
  margin-right: 1em;
  border-radius: ${props =>
    (props.theme &&
      props.theme.borderRadius &&
      `${props.theme.borderRadius} ${props.theme.borderRadius} 0 ${props.theme.borderRadius}`) ||
    '1em'};

  ${props => (props.theme && props.theme.styles && props.theme.styles.messageUser) || ''}
`;

const MessageUser: ({ children }: { children: ReactNode }) => JSX.Element = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MessageContainer>
      <Message>{children}</Message>
    </MessageContainer>
  );
};

export default MessageUser;
