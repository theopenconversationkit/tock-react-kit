import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import TockTheme from 'TockTheme';

const PostbackButton: StyledComponent<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    {},
    TockTheme
> = styled.button`
  width: 75%;
  background: ${props => (props.theme && props.theme.postbackButtonColor) || '#F5E9EC'};
  border: none ;
  border-radius: ${props => (props.theme && props.theme.postbackButtonRadius) || '20px'};
  padding: 0.5em 1em;
  margin: 0 0.5em;
  display: block;

  outline: none;
  color: ${props => (props.theme && props.theme.postbackButtonColor) || '#9B2743'};
  cursor: pointer;
  font-family: inherit;
  text-align: center;
  font-size: inherit;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 10px;

  ${props => (props.theme && props.theme.styles && props.theme.styles.postbackButton) || ''}`;

const PostbackButton: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => JSX.Element = (
    props: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => <PostbackButton {...props} />;

export default PostbackButton;