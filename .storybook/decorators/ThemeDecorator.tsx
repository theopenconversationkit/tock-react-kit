import React from 'react';
import {ThemeProvider} from "@emotion/react";

import defaultTheme from '../../src/styles/defaultTheme';

const ThemeDecorator = (Story: () => JSX.Element) => (
    <ThemeProvider theme={defaultTheme}>
        <Story/>
    </ThemeProvider>
);

export default ThemeDecorator;
