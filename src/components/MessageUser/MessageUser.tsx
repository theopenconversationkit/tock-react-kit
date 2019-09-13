import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import TockTheme from 'TockTheme';

const MessageContainer: StyledComponent<{}, {}, TockTheme> = styled.div`
  width: 100%;
  margin: 8px;
  text-align: right;
`;

const Message: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  background: ${props =>
    (props.theme && props.theme.userMessage && props.theme.userMessage.background) || 'white'};
  color: ${props =>
    (props.theme && props.theme.userMessage && props.theme.userMessage.color) || 'black'};
  padding: ${props =>
    (props.theme && props.theme.userMessage && props.theme.userMessage.padding) || '8px 16px'};
  border-radius: ${props => {
    const borderRadius: string =
      (props.theme && props.theme.userMessage && props.theme.userMessage.borderRadius) || '12px';
    return `${borderRadius} ${borderRadius} 0 ${borderRadius}`;
  }};
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
