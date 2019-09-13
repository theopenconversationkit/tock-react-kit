import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import MessageUser from './MessageUser';

const message: string = 'A user message';

storiesOf('User message', module).add('Default', () => (
  <ThemeProvider theme={{}}>
    <MessageUser>{message}</MessageUser>
  </ThemeProvider>
));
