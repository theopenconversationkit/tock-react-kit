import type { Meta, StoryObj } from '@storybook/react';

import QuickReplyList from './QuickReplyList';

const meta: Meta<typeof QuickReplyList> = {
  component: QuickReplyList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuickReplyList>;

export const SingleQr: Story = {
  name: 'Single QR',
  args: {
    onItemClick: Function.bind(null),
    items: [{ label: 'Quick Reply' }],
  },
};

export const MultipleQRs: Story = {
  name: 'Multiple QRs',
  args: {
    items: [
      { label: 'Quick Reply 1' },
      { label: 'Quick Reply 2' },
      { label: 'Quick Reply 3' },
      { label: 'Quick Reply 4' },
      { label: 'Quick Reply 5' },
    ],
    onItemClick: Function.bind(null),
  },
};
