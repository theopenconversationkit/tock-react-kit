import { storiesOf } from '@storybook/react';
import React from 'react';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import Conversation from './Conversation';

const messages = (
  <>
    <MessageUser>A user asking things</MessageUser>
    <MessageBot
      message={{
        author: 'bot',
        message: 'Bot replying with incredible things',
        type: 'message',
        buttons: [],
      }}
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      sendAction={() => {}}
    />
  </>
);

storiesOf('Conversation', module).add('With messages', () => (
  <Conversation>{messages}</Conversation>
));
