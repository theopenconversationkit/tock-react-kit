import { storiesOf } from '@storybook/react';
import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'emotion-theming';
import TockContext from '../../TockContext';
import useTock, { UseTock } from '../../useTock';
import Chat from './Chat';
import TockTheme from 'TockTheme';
import { withKnobs, number, color, text } from '@storybook/addon-knobs';

const BuildMessages: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const { addMessage, addCard, addCarousel, setQuickReplies }: UseTock = useTock('');
  useEffect(() => {
    addMessage('Hello! 😊', 'user');
    addMessage('Hello! I am a chatbot 🤖<br />I am powered ⚙️ by Tock! 💡', 'bot');
    addMessage('How are you doing?', 'user');
    addMessage('I am doing great thank you!', 'bot');
    addMessage('What can you do?', 'user');
    addMessage('So far I can:', 'bot');
    addMessage('Send a card with an image...', 'bot');
    addCard(
      'The Open Conversation Kit',
      'https://avatars0.githubusercontent.com/u/48585267?s=200&v=4',
      'Build assistants & chatbots with ease'
    );
    addMessage('Or without an image...', 'bot');
    addCard(
        'The Open Conversation Kit',
        undefined,
        '<p>Key1: Value1</p><p>Key2: Value2</p><p>Key3: Value3</p><p>Key4: Value4</p>'
    );
    addMessage('Or a carousel with two cards', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
            'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://sncf.com',
          },
        ],
      },
      {
        title: 'OUI.sncf',
        imageUrl:
            'https://www.oui.sncf/sites/all/modules/custom/vsct_feature_seo/images/oui-fb.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://oui.sncf',
          },
        ],
      }
    ]);
    addMessage('With one card', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
            'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://sncf.com',
          },
        ],
      }
    ]);
    addMessage('With 4 cards', 'bot');
    addCarousel([
      {
        title: 'SNCF',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/media_crop_4_3_paragraphe_50_50/public/2019-07/Train-spe%CC%81cial_Femme-en-or.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://sncf.com',
          },
        ],
      },
      {
        title: 'OUI.sncf',
        imageUrl:
          'https://www.oui.sncf/sites/all/modules/custom/vsct_feature_seo/images/oui-fb.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://oui.sncf',
          },
        ],
      },
      {
        title: 'TGV inOUI',
        imageUrl:
          'https://www.sncf.com/sites/default/files/styles/crop_header_edito/public/2018-10/Resized_20180920_135209_921.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://sncf.com',
          },
        ],
      },
      {
        title: 'Transilien',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Z50000_12dec2009_IMG_6241.jpg/1920px-Z50000_12dec2009_IMG_6241.jpg',
        type: 'card',
        buttons: [
          {
            label: 'Website',
            url: 'https://transilien.com',
          },
        ],
      },
    ]);
    setQuickReplies([
      {
        payload: '',
        label: 'Check out Tock',
      },
      {
        payload: '',
        label: "Tock's GitHub",
      },
    ]);
  }, [addMessage, setQuickReplies]);

  return children as JSX.Element;
};

storiesOf('Chat app', module)
  .addDecorator(withKnobs)
  .add('Default full screen', () => {
    const theme: TockTheme = {
      fontFamily: `${text('font-family', 'Segoe UI, Arial, Helvetica, sans-serif')}`,
      fontSize: `${number('font-size', 16)}px`,
      borderRadius: text('border-radius', '0.5em'),
      styles: {
        chat: `background: ${color('background', '#eaeaea')};`,
      },
      userColor: color('User color', '#fff'),
      botColor: color('Bot color', '#000'),
      cardColor: color('Card color', '#fff'),
      inputColor: color('Input color', '#fff'),
    };
    return (
      <ThemeProvider theme={theme}>
        <TockContext>
          <BuildMessages>
            <Chat endPoint=""  referralParameter="" />
          </BuildMessages>
        </TockContext>
      </ThemeProvider>
    );
  })
  .add('Default modal', () => (
    <ThemeProvider
      theme={
        {
          styles: {
            chat: `
            width: 800px;
            height: 600px;
            `,
          },
        } as TockTheme
      }
    >
      <TockContext>
        <BuildMessages>
          <Chat endPoint=""  referralParameter="" />
        </BuildMessages>
      </TockContext>
    </ThemeProvider>
  ));
