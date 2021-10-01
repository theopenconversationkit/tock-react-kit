import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './styles/theme';
import defaultTheme from './styles/defaultTheme';
import TockOptions from './TockOptions';
import { default as createTheme } from './styles/createTheme';

export const renderChat: (
  container: HTMLElement,
  endPoint: string,
  referralParameter: string,
  theme: TockTheme,
  options: TockOptions,
) => void = (
  container: HTMLElement,
  endPoint: string,
  referralParameter?: string,
  theme: TockTheme = defaultTheme,
  options: TockOptions = {},
): void => {
  ReactDOM.render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext>
        <Chat
          endPoint={endPoint}
          referralParameter={referralParameter}
          timeoutBetweenMessage={options.timeoutBetweenMessage}
          openingMessage={options.openingMessage}
          widgets={options.widgets}
        />
      </TockContext>
    </ThemeProvider>,
    container,
  );
};
