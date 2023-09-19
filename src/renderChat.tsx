import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './styles/theme';
import defaultTheme from './styles/defaultTheme';
import TockOptions from './TockOptions';
import { default as createTheme } from './styles/createTheme';
import { storageAvailable } from './utils';

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
  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext>
        <Chat
          endPoint={endPoint}
          referralParameter={referralParameter}
          timeoutBetweenMessage={options.timeoutBetweenMessage}
          openingMessage={options.openingMessage}
          widgets={options.widgets}
          extraHeadersProvider={options.extraHeadersProvider}
          disableSse={options.disableSse}
          accessibility={options.accessibility}
          {...(storageAvailable('localStorage') && {
            localStorageHistory: {
              enable:
                options.localStorage ||
                options.localStorageHistory?.enable === true,
              maxNumberMessages: options.localStorageHistory?.maxNumberMessages,
            },
          })}
        />
      </TockContext>
    </ThemeProvider>,
  );
};
