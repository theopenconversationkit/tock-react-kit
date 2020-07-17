import styled, {StyledComponent} from '@emotion/styled';
import {readableColor} from 'polished';
import React from 'react';
import TockTheme from 'TockTheme';
import {Message as messageType, Button} from "../../TockContext";
import QR from "../QuickReply";
import QuickReplyList from "../QuickReplyList";
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

export interface MessageProps {
    message: messageType;
    sendAction: (button: Button) => void;
}

const MessageBot: (props: MessageProps) => JSX.Element = ({
      message,
      sendAction,
    }: MessageProps) => {

    function getHtmlContent() {
        let content = message.message ? message.message.toString() : '';
        return linkifyHtml(content);
    }

    return (
        <MessageContainer>
            <Message>
                <div dangerouslySetInnerHTML={{__html: getHtmlContent()}}/>
            </Message>
            {Array.isArray(message.buttons) && message.buttons.length > 0 ? (
                <QuickReplyList>
                    {message.buttons.map((button: Button, i: number) => (
                        <QR key={i} onClick={sendAction.bind(null, button)}>
                            {button.label}
                        </QR>
                    ))}
                </QuickReplyList>
            ) : null}
        </MessageContainer>
    );
};

export default MessageBot;
