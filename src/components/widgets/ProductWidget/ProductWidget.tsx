import React from 'react';

import Product from './Product';
import { Message, MessageContainer } from '../../MessageBot';

const ProductWidget: (props: Product) => JSX.Element = ({
  name,
  description,
  price,
}: Product) => (
  <MessageContainer>
    <Message>
      <h1>product: {name}</h1>
      <p>{description}</p>
      <p>{price}</p>
    </Message>
  </MessageContainer>
);

export default ProductWidget;
