![Publish](https://github.com/theopenconversationkit/tock-react-kit/workflows/Publish/badge.svg?branch=master&event=repository_dispatch)

# Tock React Kit

Create web UIs for Tock chatbots

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/) ([NodeJS alternative](https://github.com/theopenconversationkit/tock-node))

## Quick Start

Include `react`, `react-dom` and `tock-react-kit` in an HTML page.
_React must be at least version 16.8 (must have hooks)_

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script
  crossorigin
  src="https://unpkg.com/tock-react-kit@latest/build/tock-react-kit.umd.js"
></script>
```

Render your app in an element:

```html
<body>
  <div id="chat"></div>
  <script>
    TockReact.renderChat(document.getElementById('chat'), '<TOCK_BOT_API_URL>');
  </script>
</body>
```

## Use as a module

You can also use it as a module (i.e [Create React App](https://github.com/facebook/create-react-app)) and bundle it:

```
npm i tock-react-kit
```

```js
import { renderChat } from 'tock-react-kit';

renderChat(document.getElementById('chat'), '<TOCK_BOT_API_URL>');
```

## Styling your chat

Use the third argument of `renderChat` to style your app:

```js
renderChat(document.getElementById('chat'), '<TOCK_BOT_API_URL>', 'referralParameter', {
  palette: {
    text: {
      user: 'limegreen',
      bot: 'rebeccapurple',
      card: 'black',
      input: 'black',
    },
    background: {
      user: readableColor('black'),
      bot: readableColor('white'),
      card: readableColor('black'),
      input: readableColor('black'),
      inputDisabled: '#b6b4b4',
    },
  },
  sizing: {
    loaderSize: '8px',
    borderRadius: '8px',
    conversation: {
      width: '720px',
    },
  },
  typography: {
    fontFamily: 'monospace',
    fontSize: '24px',
  },
  overrides: {
    chat: `background: #fff;`,
  },
});
```

You can use createTheme function to init a valid theme.

```js
renderChat(document.getElementById('chat'), '<TOCK_BOT_API_URL>', 'referralParameter', createTheme({}));
```

## Customize interface

If the chat does not suit your needs you can also use the components separately.

## API Reference

### `renderChat(element, tockBotApiUrl, themeOptions)`

Renders an entire chat in a target element.

| Argument name                  | Type                                                                  | Description                                    |
| ------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| `element`                      | [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) | Target element where the chat will be rendered |
| `tockBotApiUrl`                | `string`                                                              | URL to the Tock Bot REST API                   |
| `referralParameter`            | `string`                                                              | Optional referal parameter                     |
| `theme`                        | `TockTheme`                                                           | Optional theme object                          |
| `options`                      | `TockOptions`                                                         | Optional options object                        |

### `useTock(tockBotApiUrl)`

Hook that provides chat history and methods to communicate with the Tock Bot. It must be used alongside with `TockContext`. Returns a useTock interface.

| Argument name   | Type     | Description                  |
| --------------- | -------- | ---------------------------- |
| `tockBotApiUrl` | `string` | URL to the Tock Bot REST API |

### `TockTheme`

A `TockTheme` can be used as a value of a `ThemeProvider` of [`emotion-theming`](https://emotion.sh/docs/theming) (bundled with the library) or as a third argument of `renderChat`.

| Property name       | Type              | Description                                               |
|---------------------|-------------------|-----------------------------------------------------------|
| `palette`           | `Palette`         | Object for customising colors (see below)                 |
| `sizing`            | `Sizing`          | Object for customising elements sizing (see below)        |
| `typography`        | `Typography`      | Object for customising typographies (see below)           |
| `overrides`         | `Overrides?`      | Object allowing further styling (see below)               |

#### `Palette`

| Property name   | Type                | Description                                                 |
|-----------------|---------------------|-------------------------------------------------------------|
| `background`    | `BackgroundPalette` | Object for customising background colors (see below)        |
| `text`          | `TextPalette?`      | Object for customising text colors (see below)              |

#### `BackgroundPalette`

| Property name   | Type               | Description                                                  |
|-----------------|--------------------|--------------------------------------------------------------|
| `user`          | `string?`          | CSS color used mainly for the user's chat speech balloons    |
| `bot`           | `string?`          | CSS color used mainly for the bot's chat speech balloons     |
| `card`          | `string?`          | CSS background color for cards                               |
| `input`         | `string?`          | CSS background color for the main user text input            |
| `inputDisabled` | `string?`          | CSS background color for the main user text input disabled   |

#### `TextPalette`

| Property name   | Type               | Description                                                  |
|-----------------|--------------------|--------------------------------------------------------------|
| `user`          | `string?`          | CSS color used mainly for the user's chat speech balloons    |
| `bot`           | `string?`          | CSS color used mainly for the bot's chat speech balloons     |
| `card`          | `string?`          | CSS background color for cards                               |
| `input`         | `string?`          | CSS background color for the main user text input            |

#### `Sizing`

| Property name   | Type               | Description                                                  |
|-----------------|--------------------|--------------------------------------------------------------|
| `loaderSize`    | `string?`          | Loader component size                                        |
| `borderRadius`  | `string?`          | Border radius used in various chat components                |
| `conversation`  | `Shape`            | Object for customising chat size (see below)                 |

#### `Shape`

| Property name   | Type               | Description                                                  |
|-----------------|--------------------|--------------------------------------------------------------|
| `width`         | `string?`          | CSS max-width of the chat interface                          |

#### `Typography`

| Property name   | Type               | Description                                                  |
|-----------------|--------------------|--------------------------------------------------------------|
| `fontFamily`    | `string?`          | CSS font-family used in the chat                             |
| `fontSize`      | `string?`          | CSS base font-size used in the chat                          |

#### `Overrides`

| Property name       | Type                   | Description                                                                  |
|---------------------|------------------------|------------------------------------------------------------------------------|
| `card`              | `TockThemeCardStyle`   | Object for adding CSS styles on card component (see below)                   |
| `chatInput`         | `TockThemeInputStyle?` | Object for adding CSS styles on chat input component (see below)             |
| `carouselContainer` | `string?`              | Additional CSS styles for carousel cards container (overrides base styles)   |
| `carouselItem`      | `string?`              | Additional CSS styles for carousel cards container (overrides base styles)   |
| `carouselArrow`     | `string?`              | Additional CSS styles for carousel scrolling arrows (overrides base styles)  |
| `messageBot`        | `string?`              | Additional CSS styles for the bot's speech balloons (overrides base styles)  |
| `messageUser`       | `string?`              | Additional CSS styles for the user's speech balloons (overrides base styles) |
| `quickReply`        | `string?`              | Additional CSS styles for the quick reply buttons (overrides base styles)    |
| `chat`              | `string?`              | Additional CSS styles for the chat container (overrides base styles)         |

#### `TockThemeCardStyle`

| Property name       | Type                   | Description                                                                      |
|---------------------|------------------------|----------------------------------------------------------------------------------|
| `cardContainer`     | `string?`              | Additional CSS styles for carousel cards container (overrides base styles)       |
| `cardTitle`         | `string?`              | Additional CSS styles for carousel cards title (overrides base styles)           |
| `cardSubTitle`      | `string?`              | Additional CSS styles for carousel cards subtitle (overrides base styles)        |
| `cardImage`         | `string?`              | Additional CSS styles for carousel cards image (overrides base styles)           |
| `cardButton`        | `string?`              | Additional CSS styles for carousel cards button (overrides base styles)          |
| `buttonList`        | `string?`              | Additional CSS styles for carousel cards button list (overrides base styles)     |
| `buttonContainer`   | `string?`              | Additional CSS styles for carousel button list container (overrides base styles) |

#### `TockThemeInputStyle`

| Property name       | Type                   | Description                                                                      |
|---------------------|------------------------|----------------------------------------------------------------------------------|
| `container`         | `string?`              | Additional CSS styles for input container (overrides base styles)                |
| `input`             | `string?`              | Additional CSS styles for input (overrides base styles)                          |
| `icon`              | `string?`              | Additional CSS styles for input icon (overrides base styles)                     |

### `TockOptions`

| Property name                            | Type              | Description                                               |
|------------------------------------------|-------------------|-----------------------------------------------------------|
| `timeoutBetweenMessage`                  | `number?`         | Timeout between message                                   |
| `widgets`                                | `any?`            | Custom display component                                  |

## Create custom widget

Tock web connector can send custom messages :

```
{
  data: {
    departure: 'Paris',
    arrival: 'Nice'
  },
  type: 'TrainCardWidget',
} 
```

You can define your own display components for this custom message :

```js
import React from 'react';
import { renderChat, MessageContainer, Message } from 'tock-react-kit';

const TrainCardWidget = ({departure, arrival}) => {
    return (
        <MessageContainer>
            <Message>
                <p>Departure: {departure}</p>
                <p>Arrival: {arrival}</p>
            </Message>
        </MessageContainer>
    );
};

renderChat(
    document.getElementById('chat'), 
    '<TOCK_BOT_API_URL>', 
    'referralParameter', 
    {}, 
    {
        widgets: {
            TrainCardWidget
        }
    }
);
```