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
  { localStorage, localStorageHistory, ...options }: TockOptions = {},
): void => {
  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext
        {...(storageAvailable('localStorage') && {
          localStorageHistory: {
            enable:
              options.localStorage ||
              options.localStorageHistory?.enable === true,
            maxNumberMessages: options.localStorageHistory?.maxNumberMessages,
            storagePrefix: options.localStorageHistory?.storagePrefix,
          },
        })}
      >
        <Chat
          endPoint={endPoint}
          referralParameter={referralParameter}
          localStorageHistory={{
            enable: localStorage || localStorageHistory?.enable === true,
            maxNumberMessages: localStorageHistory?.maxNumberMessages,
            storagePrefix: localStorageHistory?.storagePrefix,
          }}
          {...options}
        />
      </TockContext>
    </ThemeProvider>,
  );
};
