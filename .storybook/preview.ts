import type { Preview } from '@storybook/react';
import ThemeDecorator, { overrides, palettes, sizings, typographies } from './decorators/ThemeDecorator';
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
  ],
  globalTypes: {
    palette: {
      description: 'Global color palette for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Palette',
        items: [...Object.keys(palettes)]
      }
    },
    sizing: {
      description: 'Global sizing for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Sizing',
        items: [...Object.keys(sizings)]
      }
    },
    typography: {
      description: 'Global typography for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Typography',
        items: [...Object.keys(typographies)]
      }
    },
    overrides: {
      description: 'Global overrides for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Overrides',
        items: [...Object.keys(overrides)]
      }
    }
  }
};

export default preview;
