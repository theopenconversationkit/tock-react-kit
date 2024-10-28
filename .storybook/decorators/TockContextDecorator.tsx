import { JSX } from 'react';
import TockContext from '../../src/TockContext';

const TockContextDecorator = (Story: () => JSX.Element) => (
    <TockContext endpoint="">
        <Story/>
    </TockContext>
);

export default TockContextDecorator;
