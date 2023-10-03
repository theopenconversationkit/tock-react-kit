import React from 'react';
import styled from '@emotion/styled';
import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { prop, theme } from 'styled-tools';
import { Interpolation } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';

const UrlButtonAnchor = styled.a`
  ${baseButtonStyle};
  text-align: center;
  text-decoration: none;
  ${
    // Allow custom override for the card's button styling
    prop<Interpolation<unknown>>('customStyle', [
      quickReplyStyle,
      // Fall back to historical quick reply override if the new url button override is not used
      theme('overrides.buttons.urlButton', theme('overrides.quickReply')),
    ])
  }
  )};
`;

type Props = {
  customStyle?: Interpolation<unknown>;
  imageUrl?: string;
  label: string;
  url: string;
};

export const UrlButton: (props: Props) => JSX.Element = ({
  url,
  imageUrl,
  label,
  ...rest
}: Props) => (
  <UrlButtonAnchor href={url} target="_blank" {...rest}>
    {imageUrl && <QuickReplyImage src={imageUrl} />}
    {label}
  </UrlButtonAnchor>
);
