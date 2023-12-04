import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { action } from '@storybook/addon-actions';
import { UrlButton } from '../../model/buttons';
import Carousel from './Carousel';
import Card, { CardProps } from '../Card';

const onButtonClick = action('buttonClick');

const CARD_COUNT = 30;
const cards: CardProps[] = Array.from(Array(CARD_COUNT)).map((_, i) => ({
  title: `Card #${i}`,
  imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
  onAction: onButtonClick,
}));

const cardsWithButtons: CardProps[] = Array.from(Array(CARD_COUNT)).map(
  (_, i) => ({
    title: `Card #${i}`,
    imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    onAction: onButtonClick,
    buttons: [
      new UrlButton('Website 1', 'https://sncf.com'),
      new UrlButton('Website 2', 'https://sncf.com'),
    ],
  }),
);

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  argTypes: {
    children: {
      control: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    children: cards.map((props: CardProps) => (
      <Card key={props.title} {...props} />
    )),
  },
};

export const WithButtons: Story = {
  name: 'With buttons',
  args: {
    children: cardsWithButtons.map((props: CardProps) => (
      <Card key={props.title} {...props} />
    )),
  },
};
