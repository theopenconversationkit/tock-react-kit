import { storiesOf } from '@storybook/react';
import React from 'react';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import Conversation from './Conversation';

const messages = (
  <>
    <MessageUser>A user asking things</MessageUser>
    <MessageBot message={{author: 'bot', message: 'Bot replying with incredible things', type: 'message', buttons: []}} sendAction= {(_) => {} }/>
  </>
);

storiesOf('Conversation', module).add('With messages', () => (
  <Conversation>{messages}</Conversation>
));
