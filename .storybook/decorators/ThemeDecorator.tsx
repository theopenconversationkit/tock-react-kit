import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '../../src';
import { Overrides } from '../../src/styles/overrides';
import { Palette } from '../../src/styles/palette';
import { Sizing } from '../../src/styles/sizing';
import { Typography } from '../../src/styles/typography';

export const palettes: Record<string, Partial<Palette>> = {
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
            bot: 'var(--test, #b71540)',
            card: '#0c2461',
            input: '#0a3d62',
            inputDisabled: '#079992',
        },
    },
};

export const sizings: Record<string, Partial<Sizing>> = {
    default: {},
    alternative: {
        loaderSize: '20px',
        borderRadius: '4em',
        conversation: {
            width: '400px',
        },
    },
};

export const typographies: Record<string, Partial<Typography>> = {
    default: {},
    alternative: {
        fontFamily: 'cursive',
        fontSize: '1em',
    }
};

export const overrides: Record<string, Overrides | undefined> = {
    default: undefined,
    alternative: {
        buttons: {
            buttonList: `
                display: flex;
                flex-direction: column;
                align-items: stretch;
            `,
            buttonContainer: `
                margin: 0.5em;
            `,
            postbackButton: `
                width: 100%;
                &:hover {
                    filter: drop-shadow(0 0 0.1em red);
                }
            `,
            urlButton: `
                width: 100%;
                box-sizing: border-box;
                filter: hue-rotate(180deg);
                border-radius: 50%;
                &:hover {
                    filter: hue-rotate(250deg) drop-shadow(0 0 0.1em blue);
                }
            `
        },
    },
    'quickReply for all buttons': {
        quickReply: `
            box-shadow: 10px 5px 5px red;
        `
    },
};

const ThemeDecorator = (Story: () => JSX.Element, context: any) => {
    const theme = createTheme({
        palette: palettes[context.globals.palette],
        sizing: sizings[context.globals.sizing],
        typography: typographies[context.globals.typography],
        overrides: overrides[context.globals.overrides],
    });
    return (
        <ThemeProvider theme={theme}>
            <Story/>
        </ThemeProvider>
    );
};

export default ThemeDecorator;
