import React from 'react';

import { Message, MessageContainer } from '../../MessageBot';

const DefaultWidget: (props: Record<string, unknown>) => JSX.Element = (
  props,
) => {
  return (
    <MessageContainer>
      <Message>
        <pre>{JSON.stringify(props)}</pre>
      </Message>
    </MessageContainer>
  );
};

export default DefaultWidget;
