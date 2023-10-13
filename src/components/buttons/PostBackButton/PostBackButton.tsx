import styled from '@emotion/styled';
import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { prop, theme } from 'styled-tools';
import { Interpolation } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';

const PostBackButtonBase = styled.button`
  ${baseButtonStyle};
  ${
    // Allow custom override for the Card's button styling
    prop<Interpolation<unknown>>('customStyle', [
      quickReplyStyle,
      // Fall back to historical quick reply override if the new postback button override is not used
      theme('overrides.buttons.postbackButton', theme('overrides.quickReply')),
    ])
  }
)};
`;

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  customStyle?: Interpolation<unknown>;
  imageUrl?: string;
  label: string;
};

export const PostBackButton: ({
  imageUrl,
  label,
  ...rest
}: Props) => JSX.Element = ({ imageUrl, label, ...rest }: Props) => (
  <PostBackButtonBase {...rest}>
    {imageUrl && <QuickReplyImage src={imageUrl} />}
    {label}
  </PostBackButtonBase>
);
