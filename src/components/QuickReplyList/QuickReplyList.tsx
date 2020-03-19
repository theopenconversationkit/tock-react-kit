import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import TockTheme from 'TockTheme';

const QuickReplyListContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
  overflow-x: unset;
  @media (max-width: 640px) {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
  }
  white-space: nowrap;
  text-align: left;

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
