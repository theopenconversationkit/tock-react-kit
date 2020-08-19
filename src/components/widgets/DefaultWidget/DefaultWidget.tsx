import React from 'react';

import { Message, MessageContainer } from '../../MessageBot';

const DefaultWidget: (props: any) => JSX.Element = (props) => {
  return (
    <MessageContainer>
      <Message>
        <pre>{JSON.stringify(props)}</pre>
      </Message>
    </MessageContainer>
  );
};

export default DefaultWidget;
