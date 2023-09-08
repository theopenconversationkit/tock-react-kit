import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import ChatInput from './ChatInput';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    onSubmit: action('message'),
    clearMessages: action('clear'),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
