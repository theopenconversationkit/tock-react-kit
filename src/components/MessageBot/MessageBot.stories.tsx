import type { Meta, StoryObj } from '@storybook/react';

import { MessageType } from '../../model/messages';
import MessageBot from './MessageBot';

const message = 'A bot message';

const simpleHtml = '<p>A <b>formatted</b> bot message</p>';

const html = `
<b>Hello user!</b>
<p>This is how I display:</p>
<ul>
  <li>a html link to the <a href="https://doc.tock.ai">Tock Documentation Page</a></li>
  <li>a clickable string url to github.com/theopenconversationkit/tock-react-kit</li>
  <li>a phone number link <a href="tel:0612345678">0612345678</a>, but not a number string link +33612345678</li>
  <li>an e-mail link to a <a href="mailto:tock@yopmail.com">tock contact</a> and a string email link to tock@yopmail.com</li>
</ul>`;

const meta: Meta<typeof MessageBot> = {
  component: MessageBot,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageBot>;

export const Default: Story = {
  args: {
    message: {
      author: 'bot',
      message: message,
      type: MessageType.message,
      buttons: [],
    },
    onAction: Function.bind(null),
  },
};

export const WithBasicFormatting: Story = {
  name: 'With basic formatting',
  args: {
    message: {
      author: 'bot',
      message: simpleHtml,
      type: MessageType.message,
      buttons: [],
    },
    onAction: Function.bind(null),
  },
};

export const WithHtmlContent: Story = {
  name: 'With HTML content',
  args: {
    message: {
      author: 'bot',
      message: html,
      type: MessageType.message,
      buttons: [],
    },
    onAction: Function.bind(null),
  },
};
