import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import Card from './Card';

const onButtonClick = action('buttonClick');

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card title',
    subTitle: 'Card subtitle',
    imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    onAction: onButtonClick,
  },
};

export const WithoutSubtitle: Story = {
  name: 'Without subtitle',
  args: {
    title: 'Card title',
    imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    onAction: onButtonClick,
  },
};

export const WithButtons: Story = {
  name: 'With buttons',
  args: {
    title: 'Card title',
    subTitle: 'Card subtitle',
    imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    onAction: onButtonClick,
    buttons: [
      {
        label: 'Website',
        url: 'https://doc.tock.ai',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/theopenconversationkit',
      },
    ],
  },
};

export const WithAlternativeDescription: Story = {
  name: 'With alternative description',
  args: {
    title: 'Card title',
    subTitle: 'Card subtitle',
    imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    imageAlternative: 'Image of the Tock icon',
    onAction: onButtonClick,
    buttons: [
      {
        label: 'Website',
        url: 'https://doc.tock.ai',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/theopenconversationkit',
      },
    ],
  },
};
