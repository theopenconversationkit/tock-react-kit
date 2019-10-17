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
  src="https://unpkg.com/tock-react-kit@0.2.0/build/tock-react-kit.umd.js"
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
renderChat(document.getElementById('chat'), '<TOCK_BOT_API_URL>', {
  fontFamily: 'monospace',
  fontSize: '24px',
  botColor: 'rebeccapurple',
  userColor: 'limegreen',
  borderRadius: '0px',
  styles: {
    chat: `background: #fff;`,
  },
});
```

## Customize interface

If the chat does not suit your needs you can also use the components separately.

## API Reference

### `renderChat(element, tockBotApiUrl, themeOptions)`

Renders an entire chat in a target element.

| Argument name   | Type                                                                  | Description                                    |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| `element`       | [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) | Target element where the chat will be rendered |
| `tockBotApiUrl` | `string`                                                              | URL to the Tock Bot REST API                   |
| `themeOptions`  | `TockTheme`                                                           | Optional theme object                          |

### `useTock(tockBotApiUrl)`

Hook that provides chat history and methods to communicate with the Tock Bot. It must be used alongside with `TockContext`. Returns a useTock interface.

| Argument name   | Type     | Description                  |
| --------------- | -------- | ---------------------------- |
| `tockBotApiUrl` | `string` | URL to the Tock Bot REST API |

### `TockTheme`

A `TockTheme` can be used as a value of a `ThemeProvider` of [`emotion-theming`](https://emotion.sh/docs/theming) (bundled with the library) or as a third argument of `renderChat`.

| Property name       | Type              | Description                                               |
|---------------------|-------------------|-----------------------------------------------------------|
| `fontFamily`        | `string?`          | CSS font-family used in the chat                          |
| `fontSize`          | `string?`          | CSS base font-size used in the chat                       |
| `userColor`         | `string?`          | CSS color used mainly for the user's chat speech balloons |
| `botColor`          | `string?`          | CSS color used mainly for the bot's chat speech balloons  |
| `cardColor`         | `string?`          | CSS background color for cards                            |
| `inputColor`        | `string?`          | CSS background color for the main user text input         |
| `borderRadius`      | `string?`          | Border radius used in various chat components             |
| `conversationWidth` | `string?`          | CSS max-width of the chat interface                       |
| `styles`            | `TockThemeStyles?` | Object allowing further styling (see below)               |

#### `TockThemeStyles`

| Property name   | Type     | Description                                                                  |
|-----------------|----------|------------------------------------------------------------------------------|
| `card`          | `string?` | Additional CSS styles for cards (overrides base styles)                      |
| `carouselItem`  | `string?` | Additional CSS styles for carousel cards container (overrides base styles)   |
| `carouselArrow` | `string?` | Additional CSS styles for carousel scrolling arrows (overrides base styles)  |
| `messageBot`    | `string?` | Additional CSS styles for the bot's speech balloons (overrides base styles)  |
| `messageUser`   | `string?` | Additional CSS styles for the user's speech balloons (overrides base styles) |
| `quickReply`    | `string?` | Additional CSS styles for the quick reply buttons (overrides base styles)    |
| `chat`          | `string?` | Additional CSS styles for the chat container (overrides base styles)         |
