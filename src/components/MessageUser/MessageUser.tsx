import styled, { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { theme } from 'styled-tools';
import { MessageContainer as BotMessageContainer } from '../MessageBot';

import { useTextRenderer } from '../../settings/RendererSettings';

const MessageContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled(BotMessageContainer)`
  text-align: right;
`;

const Message: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
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
  children: string;
};

const MessageUser = ({ children }: Props): JSX.Element => {
  const TextRenderer = useTextRenderer('userContent');
  return (
    <MessageContainer>
      <Message>
        <TextRenderer text={children} />
      </Message>
    </MessageContainer>
  );
};

export default MessageUser;
