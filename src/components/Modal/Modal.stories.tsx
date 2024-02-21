import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodoc'],
  decorators: [
    (Story, ctx) => {
      const [open, setOpen] = useState(ctx.args.open);
      const onClose = (result: string | undefined) => {
        ctx.args.onClose?.(result);
        setOpen(false);
      };
      return (
        <>
          <button onClick={() => setOpen(true)}>Open Modal</button>
          <Story args={{ ...ctx.args, open, onClose }} />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: 'Hello',
    onBackdropClick: () => alert('Clicked outside modal'),
  },
};

export const Form: Story = {
  args: {
    onClose: (result) => alert('The best bot is ' + result),
    children: (
      <form method="dialog">
        <label htmlFor="best-bot">Best Bot: </label>
        <input id="best-bot" name="best-bot" />
        <br />
        <input type="submit" />
      </form>
    ),
  },
};
