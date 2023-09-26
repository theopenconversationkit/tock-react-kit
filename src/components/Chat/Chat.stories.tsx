import type { Meta, StoryObj } from '@storybook/react';

import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

import ProductWidget from '../widgets/ProductWidget';
import Chat from './Chat';
import { useExampleMessages } from '../Conversation/Conversation.stories';

const Wrapper = ({ children }: { children: ReactNode }) => {
  useExampleMessages();
  return children as JSX.Element;
};

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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const meta: Meta<typeof Chat> = {
  component: Chat,
  tags: ['autodocs'],
  title: 'Chat app',
};

export default meta;
export type Story = StoryObj<typeof Chat>;

export const DefaultFullScreen: Story = {
  name: 'Default full screen',
  // eslint-disable-next-line react/display-name
  render: () => (
    <Wrapper>
      <FullscreenContainer>
        <Chat
          endPoint=""
          referralParameter=""
          widgets={{
            ProductWidget,
          }}
        />
      </FullscreenContainer>
    </Wrapper>
  ),
};

export const DefaultModal: Story = {
  name: 'Default modal',
  // eslint-disable-next-line react/display-name
  render: () => (
    <Wrapper>
      <ModalContainer>
        <Chat endPoint="" referralParameter="" />
      </ModalContainer>
    </Wrapper>
  ),
};
