import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Carousel from './Carousel';
import Card, { CardProps } from '../Card';

const onButtonClick = action('buttonClick');

const CARD_COUNT = 30;
const cards: CardProps[] = Array.from(Array(CARD_COUNT)).map((_, i) => ({
  title: `Card #${i}`,
  imageUrl: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
  sendAction: onButtonClick,
}));

storiesOf('Carousel', module).add('Default', () => (
  <Carousel>
    {cards.map((props: CardProps) => (
      <Card key={props.title} {...props} />
    ))}
  </Carousel>
));
