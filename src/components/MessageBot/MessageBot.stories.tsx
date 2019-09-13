import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import MessageBot from './MessageBot';

const message: string = 'A bot message';

const html: string = '<b>A bot message</b>';

storiesOf('Bot message', module)
  .add('Default', () => (
    <ThemeProvider theme={{}}>
      <MessageBot>{message}</MessageBot>
    </ThemeProvider>
  ))
  .add('With HTML content', () => (
    <ThemeProvider theme={{}}>
      <MessageBot>{html}</MessageBot>
    </ThemeProvider>
  ));
