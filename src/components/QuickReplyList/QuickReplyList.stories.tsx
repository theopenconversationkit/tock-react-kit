import { storiesOf } from '@storybook/react';
import QuickReply from '../QuickReply';
import React from 'react';
import QuickReplyList from './QuickReplyList';

storiesOf('Quick reply', module)
  .add('Single QR', () => (
    <QuickReplyList>
      <QuickReply>Quick Reply</QuickReply>
    </QuickReplyList>
  ))
  .add('Multiple QRs', () => (
    <QuickReplyList>
      <QuickReply>Quick Reply 1</QuickReply>
      <QuickReply>Quick Reply 2</QuickReply>
      <QuickReply>Quick Reply 3</QuickReply>
      <QuickReply>Quick Reply 4</QuickReply>
      <QuickReply>Quick Reply 5</QuickReply>
    </QuickReplyList>
  ));
