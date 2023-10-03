import { Meta, StoryObj } from '@storybook/react';
import UrlButton from './index';

const meta: Meta<typeof UrlButton> = {
  component: UrlButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UrlButton>;

export const SimpleUrl: Story = {
  name: 'URL Button',
  args: {
    label: 'TOCK',
    url: 'https://doc.tock.ai',
  },
};

export const WithImage: Story = {
  name: 'URL Button with image',
  args: {
    label: 'TOCK',
    url: 'https://doc.tock.ai',
    imageUrl: 'https://doc.tock.ai/tock/assets/images/logo.svg',
  },
};
