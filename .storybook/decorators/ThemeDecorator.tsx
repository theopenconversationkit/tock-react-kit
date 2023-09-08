import React from 'react';
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "../../src";

export const palettes = {
    default: {},
    alternative: {
        text: {
            user: '#fad390',
            bot: '#f8c291',
            card: '#6a89cc',
            input: '#82ccdd',
        },
        background: {
            user: '#e58e26',
            bot: '#b71540',
            card: '#0c2461',
            input: '#0a3d62',
            inputDisabled: '#079992',
        },
    }
}

export const sizings = {
    default: {},
    alternative: {
        loaderSize: '20px',
        borderRadius: '4em',
        conversation: {
            width: '400px',
        },
    }
}

export const typographies = {
    default: {},
    alternative: {
        fontFamily: 'cursive',
        fontSize: '1em',
    }
}

const ThemeDecorator = (Story: () => JSX.Element, context: any) => {
    const theme = createTheme({
        palette: palettes[context.globals.palette],
        sizing: sizings[context.globals.sizing],
        typography: typographies[context.globals.typography]
    });
    return (
        <ThemeProvider theme={theme}>
            <Story/>
        </ThemeProvider>
    );
};

export default ThemeDecorator;
