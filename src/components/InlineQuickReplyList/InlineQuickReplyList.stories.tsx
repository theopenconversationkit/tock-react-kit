import type { Meta, StoryObj } from '@storybook/react';

import InlineQuickReplyList from './InlineQuickReplyList';

const meta: Meta<typeof InlineQuickReplyList> = {
  component: InlineQuickReplyList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InlineQuickReplyList>;

export const SingleQr: Story = {
  name: 'Single QR',
  args: {
    onItemClick: Function.bind(null),
    items: [{ label: 'Inline Quick Reply' }],
  },
};

export const MultipleQRs: Story = {
  name: 'Multiple QRs',
  args: {
    onItemClick: Function.bind(null),
    items: [
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
    ],
  },
};
