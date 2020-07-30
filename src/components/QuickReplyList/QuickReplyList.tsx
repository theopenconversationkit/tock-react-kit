import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import { prop } from 'styled-tools';

import TockTheme from 'styles/theme';

const QuickReplyListContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  overflow-x: unset;
  white-space: nowrap;
  text-align: left;
  
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-left: 1em;
  padding-right: 1em;

  & > * {
    display: inline-block;
  }
`;

const QuickReplyListOuterContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div``;

const QuickReplyList: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => (
  <QuickReplyListOuterContainer>
    <QuickReplyListContainer>{children}</QuickReplyListContainer>
  </QuickReplyListOuterContainer>
);

export default QuickReplyList;
