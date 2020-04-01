import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './TockTheme';
import TockOptions from "./TockOptions";

export const renderChat: (target: HTMLElement, endPoint: string, referralParameter: string, theme: TockTheme, options: TockOptions) => void = (
  target: HTMLElement,
  endPoint: string,
  referralParameter?: string,
  theme: TockTheme = {},
  options: TockOptions = {}
): void => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <TockContext>
        <Chat endPoint={endPoint} referralParameter={referralParameter} timeoutBetweenMessage={options.timeoutBetweenMessage} widgets={options.widgets}/>
      </TockContext>
    </ThemeProvider>,
    target
  );
};
