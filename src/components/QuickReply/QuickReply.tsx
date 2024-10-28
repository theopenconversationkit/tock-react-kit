import styled from '@emotion/styled';
import { css, Interpolation, SerializedStyles, Theme } from '@emotion/react';
import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';

import { QuickReply as QuickReplyData } from '../../model/buttons';

import QuickReplyImage from './QuickReplyImage';
import {
  useButtonRenderer,
  useTextRenderer,
} from '../../settings/RendererSettings';

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

export const quickReplyStyle: (theme: Theme) => SerializedStyles = (
  theme,
) => css`
  margin: 0 0.5em;
  border: 2px solid ${theme.palette.background.bot};
  border-radius: ${theme.sizing.borderRadius};

  color: ${theme.palette.background.bot};

  &:hover,
  &:focus,
  &:active {
    border-color: ${theme.palette.text.bot};
    color: ${theme.palette.text.bot};
    background: ${theme.palette.background.bot};
  }
`;

const qrButtonCss: Interpolation<Theme> = [
  baseButtonStyle,
  quickReplyStyle,
  (theme) => theme.overrides?.quickReply,
];

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonData: QuickReplyData;
}

const QuickReply = React.forwardRef<HTMLButtonElement, Props>(
  ({ buttonData, ...rest }: Props, ref: RefObject<HTMLButtonElement>) => {
    const TextRenderer = useTextRenderer('default');
    const ButtonRenderer = useButtonRenderer('quickReply');
    return (
      <QuickReplyButtonContainer>
        <ButtonRenderer
          buttonData={buttonData}
          ref={ref}
          css={qrButtonCss}
          {...rest}
        >
          {buttonData.imageUrl && <QuickReplyImage src={buttonData.imageUrl} />}
          <TextRenderer text={buttonData.label} />
        </ButtonRenderer>
      </QuickReplyButtonContainer>
    );
  },
);

QuickReply.displayName = 'QuickReply';

export default QuickReply;
