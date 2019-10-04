import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import TockTheme from 'TockTheme';
import { readableColor } from 'polished';

const QuickReplyButton: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  {},
  TockTheme
> = styled.button`
  background: none;
  border: 2px solid ${props => (props.theme && props.theme.botColor) || 'black'};
  border-radius: ${props => (props.theme && props.theme.borderRadius) || '1em'};
  padding: 0.5em 1em;
  margin: 0 0.5em;
  display: inline-block;

  outline: none;
  color: ${props => (props.theme && props.theme.botColor) || 'black'};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    border-color: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
    color: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
    background: ${props => (props.theme && props.theme.botColor) || 'black'};
  }

  ${props => (props.theme && props.theme.styles && props.theme.styles.quickReply) || ''}
`;

const QuickReply: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => <QuickReplyButton>{children}</QuickReplyButton>;

export default QuickReply;
