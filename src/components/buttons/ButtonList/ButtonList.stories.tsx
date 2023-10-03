import type { Meta, StoryObj } from '@storybook/react';

import ButtonList from '.';

const meta: Meta<typeof ButtonList> = {
  component: ButtonList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonList>;

export const MultipleButtons: Story = {
  args: {
    items: [
      { label: 'Button 1' },
      { label: 'Button 2' },
      { label: 'URL Button', url: 'https://doc.tock.ai' },
      { label: 'Button 4' },
      {
        label: 'Button with image',
        imageUrl: 'https://doc.tock.ai/tock/assets/images/logo.svg',
      },
      {
        label: 'URL Button with image',
        imageUrl: 'https://doc.tock.ai/tock/assets/images/logo.svg',
        url: 'https://doc.tock.ai',
      },
    ],
    onItemClick: Function.bind(null),
  },
};

export const SingleButton: Story = {
  args: {
    onItemClick: Function.bind(null),
    items: [{ label: 'Button 1' }],
  },
};
