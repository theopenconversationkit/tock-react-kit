import { storiesOf } from '@storybook/react';
import React from 'react';
import MessageBot from './MessageBot';

const message: string = 'A bot message';

const html: string = '<b>A bot message</b>';

storiesOf('Bot message', module)
  .add('Default', () => <MessageBot>{message}</MessageBot>)
  .add('With HTML content', () => <MessageBot>{html}</MessageBot>);
