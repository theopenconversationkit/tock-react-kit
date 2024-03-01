import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { keyframes } from '@emotion/react';
import { Keyframes } from '@emotion/serialize';
import { prop } from 'styled-tools';

const LoaderContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  width: 100%;
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;

const BulletList = styled.div`
  display: inline-block;
  color: ${prop('theme.palette.text.bot')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${prop('theme.sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${prop('theme.overrides.messageBot', '')}
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

const Bullet = styled.div<{ 'data-rank': number }>`
  display: inline-block;
  background-color: ${prop('theme.palette.text.bot')};
  width: ${prop('theme.sizing.loaderSize')};
  height: ${prop('theme.sizing.loaderSize')};
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
