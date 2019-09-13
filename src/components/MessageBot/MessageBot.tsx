import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import TockTheme from 'TockTheme';

const MessageContainer: StyledComponent<{}, {}, TockTheme> = styled.div`
  width: 100%;
  margin: 8px;
`;

const Message: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  background: ${props =>
    (props.theme && props.theme.botMessage && props.theme.botMessage.background) || 'black'};
  color: ${props =>
    (props.theme && props.theme.botMessage && props.theme.botMessage.color) || 'white'};
  padding: ${props =>
    (props.theme && props.theme.botMessage && props.theme.botMessage.color) || '8px 16px'};
  border-radius: ${props => {
    const borderRadius: string =
      (props.theme && props.theme.botMessage && props.theme.botMessage.borderRadius) || '12px';
    return `${borderRadius} ${borderRadius} ${borderRadius} 0`;
  }};
`;

const MessageBot: ({ children }: { children: ReactNode }) => JSX.Element = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MessageContainer>
      <Message>
        <span dangerouslySetInnerHTML={{ __html: children ? children.toString() : '' }}></span>
      </Message>
    </MessageContainer>
  );
};

export default MessageBot;
