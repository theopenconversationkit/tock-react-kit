import React from 'react';

import TockProvider from '../../src/TockContext';

const TockContextDecorator = story => (
  <TockProvider>
    {story()}
  </TockProvider>
);

export default TockContextDecorator;
