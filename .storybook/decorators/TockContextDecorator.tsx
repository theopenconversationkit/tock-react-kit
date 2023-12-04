import React from 'react';

import TockProvider from '../../src/TockContext';

const TockContextDecorator = (Story: () => JSX.Element) => (
    <TockProvider>
        <Story/>
    </TockProvider>
);

export default TockContextDecorator;
