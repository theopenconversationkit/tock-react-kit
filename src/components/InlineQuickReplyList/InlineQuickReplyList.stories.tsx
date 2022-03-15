import { storiesOf } from '@storybook/react';
import React from 'react';
import InlineQuickReplyList from './InlineQuickReplyList';

storiesOf('Inline Quick reply', module)
  .add('Single QR', () => (
    <InlineQuickReplyList
      onItemClick={Function.bind(null)}
      items={[{ label: 'Inline Quick Reply' }]}
    />
  ))
  .add('Multiple QRs', () => (
    <InlineQuickReplyList
      onItemClick={Function.bind(null)}
      items={[
        { label: 'Inline Quick Reply 1' },
        { label: 'Inline Quick Reply 2' },
        { label: 'Inline Quick Reply 3' },
        { label: 'Inline Quick Reply 4' },
        { label: 'Inline Quick Reply 5' },
        { label: 'Inline Quick Reply 6' },
        { label: 'Inline Quick Reply 7' },
        { label: 'Inline Quick Reply 8' },
        { label: 'Inline Quick Reply 9' },
        { label: 'Inline Quick Reply 10' },
        { label: 'Inline Quick Reply 11' },
        { label: 'Inline Quick Reply 12' },
        { label: 'Inline Quick Reply 13' },
      ]}
    />
  ));
