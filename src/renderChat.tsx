import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './styles/theme';
import defaultTheme from './styles/defaultTheme';
import TockOptions from './TockOptions';
import { default as createTheme } from './styles/createTheme';
import { TockOptionalSettings } from './settings/TockSettings';

export const renderChat: (
  container: HTMLElement,
  endpoint: string,
  referralParameter: string,
  theme: TockTheme,
  options: TockOptions,
) => void = (
  container: HTMLElement,
  endpoint: string,
  referralParameter?: string,
  theme: TockTheme = defaultTheme,
  {
    locale,
    localStorage = {},
    renderers,
    network = {},
    ...options
  }: TockOptions = {},
): void => {
  if (typeof localStorage === 'boolean') {
    throw new Error(
      'Enabling local storage history through the localStorage option is now unsupported, use localStorageHistory.enable instead',
    );
  }

  if (options.localStorageHistory?.enable) {
    localStorage.enableMessageHistory = true;
  }
  if (options.localStorageHistory?.maxNumberMessages) {
    localStorage.maxMessageCount =
      options.localStorageHistory.maxNumberMessages;
  }
  if (options.disableSse) {
    network.disableSse = true;
  }
  if (options.extraHeadersProvider) {
    network.extraHeadersProvider = options.extraHeadersProvider;
  }
  const settings: TockOptionalSettings = {
    locale,
    localStorage,
    network,
    renderers,
  };

  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext endpoint={endpoint} settings={settings}>
        <Chat referralParameter={referralParameter} {...options} />
      </TockContext>
    </ThemeProvider>,
  );
};
