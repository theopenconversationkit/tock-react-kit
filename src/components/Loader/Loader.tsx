import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { keyframes } from '@emotion/core';
import { Keyframes } from '@emotion/serialize';
import { prop } from 'styled-tools';

import TockTheme from 'styles/theme';

const LoaderContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  width: 100%;
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;

const BulletList: StyledComponent<unknown, unknown, TockTheme> = styled.div`
  display: inline-block;
  color: ${prop<any>('theme.palette.text.bot')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${prop<any>('theme.overrides.messageBot', '')}
`;

const beat: Keyframes = keyframes`
  50% {
    transform: scale(0.75);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Bullet: StyledComponent<unknown, unknown, TockTheme> = styled.div`
  display: inline-block;
  background-color: ${prop<any>('theme.palette.text.bot')};
  width: ${prop<any>('theme.sizing.loaderSize')};
  height: ${prop<any>('theme.sizing.loaderSize')};
  margin: 0.5em 0.5em 0.5em 0;
  border-radius: 50%;
  animation: ${beat} 0.7s linear
    ${(props) => (props['data-rank'] % 2 ? '0s' : '0.35s')} infinite normal both
    running;
`;

const Loader: () => JSX.Element = () => (
  <LoaderContainer>
    <BulletList>
      <Bullet data-rank={1} />
      <Bullet data-rank={2} />
      <Bullet data-rank={3} />
    </BulletList>
  </LoaderContainer>
);

export default Loader;
