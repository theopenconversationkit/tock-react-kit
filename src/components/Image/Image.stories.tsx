import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';
import { TockContext, useMessageMetadata } from '../../index';
import { MessageMetadataContext } from '../../MessageMetadata';

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    title: 'TOCK Logo',
    url: 'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    alternative: 'Image of the Tock icon',
  },
};

/**
 * Uses message metadata to determine image width and height
 */
export const WithCustomRendering: Story = {
  render: () => (
    <TockContext
      settings={{
        renderers: {
          imageRenderers: {
            standalone: ({ src, alt, ...props }) => {
              const [width, height] = useMessageMetadata()
                ['DIMENSIONS']?.split('x')
                ?.map((d) => +d);
              return (
                <img
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  {...props}
                />
              );
            },
          },
        },
      }}
    >
      <MessageMetadataContext value={{ DIMENSIONS: '200x200' }}>
        <Image
          url={'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4'}
          alternative={'Tock Logo'}
        />
      </MessageMetadataContext>
    </TockContext>
  ),
};
