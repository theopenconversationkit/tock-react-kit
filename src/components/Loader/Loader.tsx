import styled, {StyledComponent} from '@emotion/styled';
import { readableColor } from 'polished';
import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {css, keyframes} from "@emotion/core";
import {Keyframes} from "@emotion/serialize";
import TockTheme from 'TockTheme';

const LoaderContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
  > = styled.div`
  width: 100%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
`;

const beat: Keyframes = keyframes`
  50% {transform: scale(0.75);opacity: 0.2}
  100% {transform: scale(1);opacity: 1}
`;

const Bullet: StyledComponent<{}, {}, TockTheme> = styled.div(props => (
  css`
      display: inline-block;
      background-color: ${readableColor((props.theme && props.theme.botColor) || 'black')};
      width: ${props.theme.fontSize};
      height: ${props.theme.fontSize};
      margin: 0.5em;
      border-radius: 100%;
      animation: ${beat} 0.7s linear ${props["data-rank"] % 2 ? "0s" : "0.35s"} infinite normal both running;
    `
));

const Loader = () => {
  return (
    <LoaderContainer>
      <Bullet data-rank={1} />
      <Bullet data-rank={2} />
      <Bullet data-rank={3} />
    </LoaderContainer>
  );
};

export default Loader;
