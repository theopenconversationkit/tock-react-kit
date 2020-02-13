import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import TockTheme from 'TockTheme';

const PostbackButtonListContainer: StyledComponent<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    {},
    TockTheme> = styled.div`
  width: 70%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
  overflow-x: unset;
  white-space: nowrap;
  text-align: left;

  & > * {
    display: inline-block;
  }
`;

const PostbackButtonListOuterContainer: StyledComponent<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    {},
    TockTheme
> = styled.div``;

const PostbackButtonList: (props: { children?: ReactNode }) => JSX.Element = ({
    children,
}: {
    children?: ReactNode;
}) => (
        <PostbackButtonListOuterContainer>
            <PostbackButtonListContainer>{children}</PostbackButtonListContainer>
        </PostbackButtonListOuterContainer>
    );

export default PostbackButtonList;
