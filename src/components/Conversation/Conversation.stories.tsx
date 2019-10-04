import { storiesOf } from '@storybook/react';
import React from 'react';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import Conversation from './Conversation';

const messages = (
  <>
    <MessageUser>A user asking things</MessageUser>
    <MessageBot>Bot replying with incredible things</MessageBot>
  </>
);

storiesOf('Conversation', module).add('With messages', () => (
  <Conversation>{messages}</Conversation>
));
