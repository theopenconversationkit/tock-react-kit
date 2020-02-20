import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './TockTheme';

export const renderChat: (target: HTMLElement, endPoint: string, referralParameter: string, theme: TockTheme) => void = (
  target: HTMLElement,
  endPoint: string,
  referralParameter?: string,
  theme: TockTheme = {}
): void => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <TockContext>
        <Chat endPoint={endPoint} referralParameter={referralParameter} />
      </TockContext>
    </ThemeProvider>,
    target
  );
};
