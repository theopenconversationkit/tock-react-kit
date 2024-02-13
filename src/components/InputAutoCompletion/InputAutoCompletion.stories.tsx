import type { Meta, StoryObj } from '@storybook/react';
import InputAutoCompletion from './InputAutoCompletion';
import type { InputAutoCompletionProps } from './InputAutoCompletion';

const meta: Meta<InputAutoCompletionProps> = {
  title: 'Components/InputAutoCompletion',
  component: InputAutoCompletion,
};

export default meta;
type Story = StoryObj<InputAutoCompletionProps>;

const suggestions = [
  'Semper quis lectus nulla at volutpat diam ut.',
  'Lacus sed viverra tellus in hac.',
  'Enim sed faucibus turpis in eu mi.',
  'Ac auctor augue mauris augue.',
  'Odio facilisis mauris sit amet.',
  'Rhoncus urna neque viverra justo.',
];

export const Default: Story = {
  args: {
    suggestions,
    onItemClick: (suggestion: string) =>
      console.log(`Clicked on suggestion: ${suggestion}`),
    inputValue: '',
  },
};

export const WithInputValue: Story = {
  args: {
    ...Default.args,
    inputValue: 'lorem',
  },
};
