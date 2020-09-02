import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import { prop } from 'styled-tools';

import TockTheme from 'styles/theme';

const QuickReplyButton: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  unknown,
  TockTheme
> = styled.button`
  background: none;
  border: 2px solid ${prop<any>('theme.palette.background.bot')};
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  padding: 0.5em 1em;
  margin: 0 0.5em;
  display: inline-block;

  outline: none;
  color: ${prop<any>('theme.palette.background.bot')};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    border-color: ${prop<any>('theme.palette.text.bot')};
    color: ${prop<any>('theme.palette.text.bot')};
    background: ${prop<any>('theme.palette.background.bot')};
  }

  ${prop<any>('theme.overrides.quickReply', '')};
`;

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const QRImage: StyledComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  unknown,
  TockTheme
> = styled.img`
  margin-right: inherit;
  max-width: 15px;
  max-height: 15px;
  vertical-align: middle;

  ${prop<any>('theme.overrides.quickReplyImage', '')};
`;

const QuickReply: (props: Props) => JSX.Element = (props: Props) => (
  <QuickReplyButton {...props} />
);

export default QuickReply;
