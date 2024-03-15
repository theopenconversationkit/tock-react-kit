import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      strictMode: true,
      fastRefresh: true,
      builder: {
        useSWC: true,
      },
    },
  },

  docs: {
    autodocs: true,
  },

  core: {
    builder: '@storybook/builder-webpack5'
  }
};
export default config;
