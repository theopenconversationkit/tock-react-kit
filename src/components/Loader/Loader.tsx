import styled, {StyledComponent} from '@emotion/styled';
import { readableColor } from 'polished';
import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {css, keyframes} from "@emotion/core";
import {Keyframes} from "@emotion/serialize";
import TockTheme from 'TockTheme';

const LoaderContainer: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme> = styled.div`
  width: 100%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
`;

const BulletList: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  color: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${props =>
  (props.theme &&
    props.theme.borderRadius &&
    `${props.theme.borderRadius} ${props.theme.borderRadius} ${props.theme.borderRadius} 0`) ||
  '1em'};

  ${props => (props.theme && props.theme.styles && props.theme.styles.messageBot) || ''}
`;

const beat: Keyframes = keyframes`
  50% {transform: scale(0.75);opacity: 0.2}
  100% {transform: scale(1);opacity: 1}
`;

const Bullet: StyledComponent<{}, {}, TockTheme> = styled.div(props => (
  css`
      display: inline-block;
      background-color: ${readableColor((props.theme && props.theme.botColor) || 'black')};
      width: ${props.theme.loaderSize || '8px'};
      height: ${props.theme.loaderSize || '8px'};
      margin: 0.5em 0.5em 0.5em 0;
      border-radius: 100%;
      animation: ${beat} 0.7s linear ${props["data-rank"] % 2 ? "0s" : "0.35s"} infinite normal both running;
    `
));

const Loader = () => {
  return (
    <LoaderContainer>
      <BulletList>
        <Bullet data-rank={1}/>
        <Bullet data-rank={2}/>
        <Bullet data-rank={3}/>
      </BulletList>
    </LoaderContainer>
  );
};

export default Loader;
