import defaultTheme from './styles/defaultTheme';
import { default as createTheme } from './styles/createTheme';
import TockTheme from './styles/theme';
import TockOptions from './TockOptions';
import { ThemeProvider } from 'emotion-theming';
import TockContext from './TockContext';
import Chat from './components/Chat';
import { storageAvailable } from './utils';
import React from 'react';

const TockChat = ({
  endPoint,
  referralParameter,
  theme = defaultTheme,
  options = {},
}: {
  endPoint: string;
  referralParameter?: string;
  theme?: TockTheme;
  options: TockOptions;
}): JSX.Element => (
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
  </ThemeProvider>
);

export default TockChat;
