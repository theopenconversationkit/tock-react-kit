import { storiesOf } from '@storybook/react';
import React, { useEffect, ReactNode } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';

import { UrlButton, PostBackButton } from '../../TockContext';
import useTock, { UseTock } from '../../useTock';
import Product from '../widgets/ProductWidget/Product';
import ProductWidget from '../widgets/ProductWidget';
import Chat from './Chat';

const useMessages = () => {
  const {
    addMessage,
    addCard,
    addCarousel,
    addWidget,
    setQuickReplies,
  }: UseTock = useTock('');
  useEffect(() => {
    const product: Product = {
      name: 'Product name',
      description: 'product description',
      price: 99.9,
    };
    addWidget({
      data: product,
      type: 'ProductWidget',
    });
    addWidget({
      data: {
        title: 'unknown Widget',
      },
      type: 'unknownWidget',
    });
    addMessage('Hello! 😊', 'user');
    addMessage(
      'Hello! I am a chatbot 🤖<br />I am powered ⚙️ by Tock! 💡',
      'bot',
    );
    addMessage('How are you doing?', 'user');
    addMessage('I am doing great thank you!', 'bot');
    addMessage('What can you do?', 'user');
    addMessage('So far I can:', 'bot');
    addMessage('Send a card with an image...', 'bot');
    addCard(
      'The Open Conversation Kit',
      'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
      'Build assistants & chatbots with ease',
    );
    addMessage('Or without an image...', 'bot');
    addCard(
      'The Open Conversation Kit',
      undefined,
      '<p>Key1: Value1</p><p>Key2: Value2</p><p>Key3: Value3</p><p>Key4: Value4</p>',
    );
    addMessage('Or with a url button', 'bot');
    addCard('The Open Conversation Kit', undefined, '<p>Some text</p>', [
      new UrlButton('Website', 'https://sncf.com'),
    ]);
    addMessage('Or a carousel with two cards', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
      {
        title: 'OUI.sncf',
        imageUrl:
          'https://www.oui.sncf/sites/all/modules/custom/vsct_feature_seo/images/oui-fb.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
    ]);
    addMessage('With one card', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
    ]);
    addMessage('With 4 cards', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
      {
        title: 'OUI.sncf',
        imageUrl:
          'https://www.oui.sncf/sites/all/modules/custom/vsct_feature_seo/images/oui-fb.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
      {
        title: 'TGV inOUI',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/crop_header_edito/public/2018-10/Resized_20180920_135209_921.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
      {
        title: 'Transilien',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Z50000_12dec2009_IMG_6241.jpg/1920px-Z50000_12dec2009_IMG_6241.jpg',
        type: 'card',
        buttons: [new UrlButton('Website', 'https://sncf.com')],
      },
    ]);
    addMessage('Message with url button', 'bot', [
      new UrlButton('Url Website', 'https://sncf.com'),
    ]);
    addMessage('Message with postback button with image url', 'bot', [
      new PostBackButton(
        'Post back Website',
        '',
        'https://www.sncf.com/themes/sncfcom/img/favicon-32x32.png',
      ),
    ]);
    addMessage('Message with postback button', 'bot', [
      new PostBackButton('Post back Website', ''),
    ]);
    addMessage('Message with postback button with image url', 'bot', [
      new PostBackButton(
        'Post back Website',
        '',
        'https://www.sncf.com/themes/sncfcom/img/favicon-32x32.png',
      ),
    ]);

    setQuickReplies([
      {
        payload: '',
        label: 'QR with payload',
      },
      {
        label: 'Nlp QR',
      },
      {
        label: 'QR with NLP',
        nlpText: 'nlp text',
      },
      {
        label: 'QR with image Url',
        imageUrl: 'https://www.sncf.com/themes/sncfcom/img/favicon-32x32.png',
      },
    ]);
  }, [addMessage, setQuickReplies]);
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  useMessages();
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

storiesOf('Chat app', module)
  .addDecorator(withKnobs)
  .add('Default full screen', () => (
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
  ))
  .add('Default modal', () => (
    <Wrapper>
      <ModalContainer>
        <Chat endPoint="" referralParameter="" />
      </ModalContainer>
    </Wrapper>
  ));
