import type { Preview } from '@storybook/react';
import ThemeDecorator, {palettes, sizings, typographies} from './decorators/ThemeDecorator'
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
  }
};

export default preview;
