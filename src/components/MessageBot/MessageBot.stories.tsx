import { storiesOf } from '@storybook/react';
import React from 'react';
import { MessageType } from '../../TockContext';
import MessageBot from './MessageBot';

const message = 'A bot message';

const html = `
<b>Hello user!</b>
<p>This is how I display:</p>
<ul>
  <li>
    a html link to the <a href="https://doc.tock.ai">Tock Documentation Page</a>
  </li>
  <li>
    a clickable string url to github.com/theopenconversationkit/tock-react-kit
  </li>
  <li>
    a phone number link <a href="tel:0612345678">0612345678</a>, but not a number string link +33612345678
  </li>
  <li>
    an e-mail link to a <a href="mailto:tock@yopmail.com">tock contact</a> and a string email link to tock@yopmail.com
  </li>
</ul>`;

storiesOf('Bot message', module)
  .add('Default', () => (
    <MessageBot
      message={{
        author: 'bot',
        message: message,
        type: MessageType.message,
        buttons: [],
      }}
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      onAction={() => {}}
    />
  ))
  .add('With HTML content', () => (
    <MessageBot
      message={{
        author: 'bot',
        message: html,
        type: MessageType.message,
        buttons: [],
      }}
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      onAction={() => {}}
    />
  ));
