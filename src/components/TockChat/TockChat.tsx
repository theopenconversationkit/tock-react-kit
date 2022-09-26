import React from 'react';
import defaultTheme from '../../styles/defaultTheme';
import { default as createTheme } from '../../styles/createTheme';
import TockTheme from '../../styles/theme';
import { ThemeProvider } from 'emotion-theming';
import TockContext from '../../TockContext';
import { default as Chat, ChatProps } from '../Chat/Chat';

export interface TockChatProps extends ChatProps {
  theme?: TockTheme;
}

const TockChat = ({
  theme = defaultTheme,
  ...options
}: TockChatProps): JSX.Element => (
  <ThemeProvider theme={createTheme(theme)}>
    <TockContext>
      <Chat {...options} />
    </TockContext>
  </ThemeProvider>
);

export default TockChat;
