import styled, {StyledComponent} from '@emotion/styled';
import {readableColor} from 'polished';
import React, {ReactNode} from 'react';
import TockTheme from 'TockTheme';
// @ts-ignore
import linkifyHtml from 'linkifyjs/html';

const MessageContainer: StyledComponent<{}, {}, TockTheme> = styled.div`
  width: 100%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
`;

const Message: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  background: ${props => (props.theme && props.theme.botColor) || 'black'};
  color: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${props =>
    (props.theme &&
        props.theme.borderRadius &&
        `${props.theme.borderRadius} ${props.theme.borderRadius} ${props.theme.borderRadius} 0`) ||
    '1em'};

  ${props => (props.theme && props.theme.styles && props.theme.styles.messageBot) || ''}
`;

const MessageBot: ({children}: { children: ReactNode }) => JSX.Element = ({children}: { children: ReactNode }) => {

    function getHtmlContent() {
        let message = children ? children.toString() : '';
        return linkifyHtml(message);
    }

    return (
        <MessageContainer>
            <Message>
                <div dangerouslySetInnerHTML={{__html: getHtmlContent()}}/>
            </Message>
        </MessageContainer>
    );
};

export default MessageBot;
