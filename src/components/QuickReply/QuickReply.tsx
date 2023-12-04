import styled, { StyledComponent } from '@emotion/styled';
import { css, SerializedStyles, Theme } from '@emotion/react';
import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import { theme } from 'styled-tools';

import { QuickReply as QuickReplyData } from '../../model/buttons';

import QuickReplyImage from './QuickReplyImage';

const QuickReplyButtonContainer = styled.li`
  list-style: none;
`;

export const baseButtonStyle = css`
  background: none;
  padding: 0.5em 1em;
  display: inline-block;

  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`;

export const quickReplyStyle: ({
  theme,
}: {
  theme: Theme;
}) => SerializedStyles = ({ theme }) => css`
  margin: 0 0.5em;
  border: 2px solid ${theme.palette.background.bot};
  border-radius: ${theme.sizing.borderRadius};

  outline: none;
  color: ${theme.palette.background.bot};

  &:hover,
  &:focus,
  &:active {
    border-color: ${theme.palette.text.bot};
    color: ${theme.palette.text.bot};
    background: ${theme.palette.background.bot};
  }
`;

const QuickReplyButton: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = styled.button`
  ${baseButtonStyle};
  ${quickReplyStyle}
  ${theme('overrides.quickReply')};
`;

QuickReplyButton.displayName = 'QuickReplyButton';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  QuickReplyData;

const QuickReply = React.forwardRef<HTMLButtonElement, Props>(
  ({ imageUrl, label, ...rest }: Props, ref: RefObject<HTMLButtonElement>) => (
    <QuickReplyButtonContainer>
      <QuickReplyButton ref={ref} {...rest}>
        {imageUrl && <QuickReplyImage src={imageUrl} />}
        {label}
      </QuickReplyButton>
    </QuickReplyButtonContainer>
  ),
);

QuickReply.displayName = 'QuickReply';

export default QuickReply;
