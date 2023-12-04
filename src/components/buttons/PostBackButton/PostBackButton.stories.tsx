import { Meta, StoryObj } from '@storybook/react';
import PostBackButton from './index';

const meta: Meta<typeof PostBackButton> = {
  component: PostBackButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostBackButton>;

export const SimplePostback: Story = {
  name: 'PostBack Button',
  args: {
    label: 'Help',
  },
};

export const WithImage: Story = {
  name: 'PostBack Button with image',
  args: {
    label: 'Help',
    imageUrl: 'https://doc.tock.ai/tock/assets/images/logo.svg',
  },
};
