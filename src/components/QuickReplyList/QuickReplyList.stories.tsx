import { storiesOf } from '@storybook/react';
import React from 'react';
import QuickReplyList from './QuickReplyList';

storiesOf('Quick reply', module)
  .add('Single QR', () => (
    <QuickReplyList
      onItemClick={Function.bind(null)}
      items={[{ label: 'Quick Reply' }]}
    />
  ))
  .add('Multiple QRs', () => (
    <QuickReplyList
      onItemClick={Function.bind(null)}
      items={[
        { label: 'Quick Reply 1' },
        { label: 'Quick Reply 2' },
        { label: 'Quick Reply 3' },
        { label: 'Quick Reply 4' },
        { label: 'Quick Reply 5' }
      ]}
    />
  ));
