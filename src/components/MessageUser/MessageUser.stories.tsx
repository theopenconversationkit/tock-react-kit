import type { Meta, StoryObj } from '@storybook/react';
import MessageUser from './MessageUser';

const meta: Meta<typeof MessageUser> = {
  component: MessageUser,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageUser>;

export const Default: Story = {
  args: {
    children: 'A user message',
  },
};
