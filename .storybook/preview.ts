import type { Preview } from '@storybook/react';
import ThemeDecorator from './decorators/ThemeDecorator'
import TockContextDecorator from "./decorators/TockContextDecorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    ThemeDecorator,
    TockContextDecorator,
  ]
};

export default preview;
