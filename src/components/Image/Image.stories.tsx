import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    title: 'Card title',
    url: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
  },
};

export const WithDescription: Story = {
  name: 'With description',
  args: {
    ...Default.args,
    alternative: 'Image of the Tock icon',
  },
};
