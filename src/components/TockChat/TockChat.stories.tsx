import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from '@emotion/styled';

import ProductWidget from '../widgets/ProductWidget';
import TockChat from './TockChat';
import defaultTheme from '../../styles/defaultTheme';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(12, 12, 12, 0.65);
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  padding: 1rem;
  max-height: 100vh;
  max-width: 100vw;
  border: 1px solid black;
`;

const FullscreenContainer = styled.div`
  position: fixed;
  background-color: #000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

storiesOf('Integrated Chat App', module)
  .add('Default full screen', () => (
    <FullscreenContainer>
      <TockChat
        endPoint=""
        theme={{
          ...defaultTheme,
          typography: {
            fontFamily: 'cursive',
            fontSize: '1em',
          },
        }}
        widgets={{
          ProductWidget,
        }}
      />
    </FullscreenContainer>
  ))
  .add('Default modal', () => (
    <ModalContainer>
      <TockChat endPoint="" />
    </ModalContainer>
  ));
