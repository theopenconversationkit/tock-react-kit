import React from 'react';
import { storiesOf } from '@storybook/react';
import Carousel from './Carousel';
import Card, { CardProps } from '../Card';

const nCards: number = 30;
let cards: CardProps[] = [];

for (let i = 0; i < nCards; i++) {
  cards = [
    ...cards,
    {
      title: `Card #${i}`,
      imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
    },
  ];
}

storiesOf('Carousel', module).add('Default', () => (
  <Carousel>
    {cards.map((props: CardProps) => (
      <Card key={props.title} {...props} />
    ))}
  </Carousel>
));
