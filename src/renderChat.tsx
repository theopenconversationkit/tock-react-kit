import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
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
  { localStorage, autoCompletionEndPoint, ...options }: TockOptions = {},
): void => {
  if (typeof localStorage === 'boolean') {
    throw new Error(
      'Enabling local storage history through the localStorage option is now unsupported, use localStorageHistory.enable instead',
    );
  }
  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext settings={{ localStorage }}>
        <Chat
          endPoint={endPoint}
          autoCompletionEndPoint={autoCompletionEndPoint}
          referralParameter={referralParameter}
          {...options}
        />
      </TockContext>
    </ThemeProvider>,
  );
};
