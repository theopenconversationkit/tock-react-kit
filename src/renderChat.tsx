import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './styles/theme';
import defaultTheme from './styles/defaultTheme';
import TockOptions from './TockOptions';
import { default as createTheme } from './styles/createTheme';
import { PartialDeep } from 'type-fest';
import TockSettings from './settings/TockSettings';

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
  { localStorage, locale, ...options }: TockOptions = {},
): void => {
  if (typeof localStorage === 'boolean') {
    throw new Error(
      'Enabling local storage history through the localStorage option is now unsupported, use localStorageHistory.enable instead',
    );
  }

  const settings: PartialDeep<TockSettings> = {};
  if (localStorage) settings.localStorage = localStorage;
  if (locale) settings.locale = locale;

  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext settings={settings}>
        <Chat
          endPoint={endPoint}
          referralParameter={referralParameter}
          {...options}
        />
      </TockContext>
    </ThemeProvider>,
  );
};
