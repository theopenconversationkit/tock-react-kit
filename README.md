![Event Release](https://github.com/theopenconversationkit/tock-react-kit/workflows/Publish/badge.svg?branch=master&event=repository_dispatch)
![Manual Release](https://github.com/theopenconversationkit/tock-react-kit/workflows/Manual%20Release/badge.svg?branch=master&event=workflow_dispatch)
[![Dependencies](https://img.shields.io/librariesio/release/npm/tock-react-kit)](https://img.shields.io/librariesio/release/npm/tock-react-kit)

[![Latest release](https://img.shields.io/npm/v/tock-react-kit)](https://img.shields.io/npm/v/tock-react-kit)
[![Release Date](https://img.shields.io/github/release-date/theopenconversationkit/tock-react-kit)](https://github.com/theopenconversationkit/tock-react-kit/releases)
[![NPM Downloads](https://img.shields.io/npm/dy/tock-react-kit)](https://img.shields.io/npm/dy/tock-react-kit)

[![Gitter](https://badges.gitter.im/tockchat/Lobby.svg)](https://gitter.im/tockchat/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Contributors](https://img.shields.io/github/contributors-anon/theopenconversationkit/tock-react-kit)](https://github.com/theopenconversationkit/tock-react-kit/graphs/contributors)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/theopenconversationkit/tock-react-kit)](https://github.com/theopenconversationkit/tock-react-kit/pulse/monthly)

[![Home](https://img.shields.io/website?label=home&down_message=offline&up_message=doc.tock.ai&url=https%3A%2F%2Fdoc.tock.ai)](https://doc.tock.ai)
[![Demo](https://img.shields.io/website?label=demo&down_message=offline&up_message=live&url=https%3A%2F%2Fdoc.tock.ai)](https://doc.tock.ai)
[![License](https://img.shields.io/github/license/theopenconversationkit/tock-react-kit)](https://github.com/theopenconversationkit/tock-react-kit/blob/master/LICENSE)

# Tock React Kit

<img alt="Tock Logo" src="http://doc.tock.ai/tock/en/assets/images/logo.svg" style="width: 150px;"><br>

A toolkit to easily embed [Tock](https://doc.tock.ai) chatbots into Web pages.

The toolkit provides:
- simple integration, as a script or React module
- connection/dialog with a Tock bot using _Bot API_ (using SSE if available)
- user interface for conversations, including default widgets and animations
- customizable styles

The toolkit is currently used in production by various conversational assistants from SNCF, Enedis and more
(see [Tock showcase](http://doc.tock.ai/tock/en/about/showcase/)).

🏠 Home: [https://doc.tock.ai](https://doc.tock.ai)

▶️ Live demo: [Web frontend](https://doc.tock.ai) / [bot backend](https://demo.tock.ai)

💬 Contact: [https://gitter.im/tockchat/Lobby](https://gitter.im/tockchat/Lobby)

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/) ([NodeJS alternative](https://github.com/theopenconversationkit/tock-node))

## Quick Start

Include `react`, `react-dom`, `@emotion-core`, `@emotion-styled`, `emotion-theming` and `tock-react-kit` in an HTML page.
_React must be at least version 16.8 (must have hooks)_

```html
<script crossorigin  src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
<script crossorigin  src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>:
<script crossorigin  src="https://unpkg.com/@emotion/react@11.11.1/dist/emotion-react.umd.min.js"></script>
<script crossorigin  src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
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
npm i @emotion/react@11
npm i @emotion/styled@11
```

### Use in a React app

```jsx
import { ThemeProvider } from "@emotion/react";
import { TockContext, Chat, createTheme } from 'tock-react-kit';

<TockContext settings={ /* ... */ }>
    <ThemeProvider theme={createTheme({ /* ... */})}>
        <Chat
            endPoint="<TOCK_BOT_API_URL>"
            /* The following parameters are optional */
            referralParameter="referralParameter"
            // also accepts all properties from TockOptions, like:
            disableSse
            openingMessage="Hi"
        />
    </ThemeProvider>
</TockContext>
```

Note that unmounting `TockContext` at any point may cause bugs in the chat due to live data being lost.
Therefore, in apps where the `Chat` component is susceptible to being unmounted and remounted (e.g. Single Page Applications),
`TockContext` should go at the root of the page (hoisting out of render).
`ThemeProvider` should also be hoisted out of render for performance reasons, as noted in the [Emotion docs](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype).

### Use in a non-React app

```js
import { renderChat } from 'tock-react-kit';

renderChat(
    document.getElementById('chat'),
    '<TOCK_BOT_API_URL>',
    /* The following parameters are optional */
    'referralParameter',
    { /* ... */ },
    { /* ... */ },
);
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
      user: 'red',
      bot: 'orange',
      card: 'lightgreen',
      input: 'lightblue',
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

## Message Metadata

*TOCK*'s backend supports sending metadata alongside messages. This metadata takes the form of key-value pairs of arbitrary strings.
The `tock-react-kit` supports customization of the interface based on said metadata at two levels:

### Chat metadata

The metadata from the last processed response is made available globally in `TockContext`.
This can be used to implement global effects on the chat interface, like showing status messages.
This metadata is not persistent; it is therefore the responsibility of either the backend or a customized frontend to
ensure data stays available if required.

### Message metadata

The metadata from each response is also attached to the corresponding messages.
This metadata is persisted with the messages, including through page reloads if [local storage history](#local-storage-history) is enabled.
At the current time, it is only available to custom React-based frontends that handle message rendering themselves.

## API Reference

### `renderChat(element, tockBotApiUrl, referralParameter, theme, options)`

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
| `inlineQuickReplies`| `boolean?`        | Displaying quick replies inline (by default false)        |

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

| Property name       | Type                   | Description                                                                      |
|---------------------|------------------------|----------------------------------------------------------------------------------|
| `buttons`           | `TockThemeButtonStyle` | Object for adding CSS styles on button components (see below)                    |
| `card`              | `TockThemeCardStyle`   | Object for adding CSS styles on card component (see below)                       |
| `chatInput`         | `TockThemeInputStyle?` | Object for adding CSS styles on chat input component (see below)                 |
| `carouselContainer` | `string?`              | Additional CSS styles for carousel cards container (overrides base styles)       |
| `carouselItem`      | `string?`              | Additional CSS styles for carousel cards container (overrides base styles)       |
| `carouselArrow`     | `string?`              | Additional CSS styles for carousel scrolling arrows (overrides base styles)      |
| `messageBot`        | `string?`              | Additional CSS styles for the bot's speech balloons (overrides base styles)      |
| `messageUser`       | `string?`              | Additional CSS styles for the user's speech balloons (overrides base styles)     |
| `quickReply`        | `string?`              | Additional CSS styles for the quick reply buttons (overrides base styles)        |
| `chat`              | `string?`              | Additional CSS styles for the chat container (overrides base styles)             |
| `quickReplyArrow`   | `string?`              | Additional CSS styles for quick replies scrolling arrows (overrides base styles) |

#### `TockThemeButtonStyle`

| Property name     | Type                   | Description                                                             |
|-------------------|------------------------|-------------------------------------------------------------------------|
| `urlButton`       | `string?`              | Additional CSS styles for URL buttons (overrides base styles)           |
| `postbackButton`  | `string?`              | Additional CSS styles for postback buttons (overrides base styles)      |
| `buttonList`      | `string?`              | Additional CSS styles for button lists (overrides base styles)          |
| `buttonContainer` | `string?`              | Additional CSS styles for button list container (overrides base styles) |

#### `TockThemeCardStyle`

| Property name     | Type      | Description                                                                                                                    |
|-------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------|
| `cardContainer`   | `string?` | Additional CSS styles for carousel cards container (overrides base styles)                                                     |
| `cardTitle`       | `string?` | Additional CSS styles for carousel cards title (overrides base styles)                                                         |
| `cardSubTitle`    | `string?` | Additional CSS styles for carousel cards subtitle (overrides base styles)                                                      |
| `cardImage`       | `string?` | Additional CSS styles for carousel cards image (overrides base styles)                                                         |
| `cardButton`      | `string?` | Additional CSS styles for carousel cards button (overrides base styles and [button overrides](#tockthemebuttonstyle))          |
| `buttonList`      | `string?` | Additional CSS styles for carousel cards button list (overrides base styles and [button overrides](#tockthemebuttonstyle))     |
| `buttonContainer` | `string?` | Additional CSS styles for carousel button list container (overrides base styles and [button overrides](#tockthemebuttonstyle)) |

#### `TockThemeInputStyle`

| Property name       | Type                   | Description                                                                      |
|---------------------|------------------------|----------------------------------------------------------------------------------|
| `container`         | `string?`              | Additional CSS styles for input container (overrides base styles)                |
| `input`             | `string?`              | Additional CSS styles for input (overrides base styles)                          |
| `icon`              | `string?`              | Additional CSS styles for input icon (overrides base styles)                     |

### `TockSettings`

| Property name  | Type                    | Description                                          |
|----------------|-------------------------|------------------------------------------------------|
| `localStorage` | `LocalStorageSettings?` | Configuration for use of localStorage by the library |

#### `LocalStorageSettings`

| Property name   | Type      | Description                                                                                   |
|-----------------|-----------|-----------------------------------------------------------------------------------------------|
| `storagePrefix` | `string?` | Prefix for local storage keys allowing communication with different bots from the same domain |

### `TockOptions`

Contains all the properties from [`TockSettings`](#tocksettings) as well as the following:

| Property name           | Type                                   | Description                                                              |
|-------------------------|----------------------------------------|--------------------------------------------------------------------------|
| `afterInit`             | `(PostInitContext) => Promise<void>?`  | Callback that will be executed after chat init and before openingMessage |
| `openingMessage`        | `string?`                              | Initial message to send to the bot to trigger a welcome sequence         |
| `extraHeadersProvider`  | `() => Promise<Record<string, string>` | Provider of extra HTTP headers for outgoing requests                     |
| `timeoutBetweenMessage` | `number?`                              | Timeout between message                                                  |
| `widgets`               | `any?`                                 | Custom display component                                                 |
| `disableSse`            | `boolean?`                             | Disable SSE (not even trying)                                            |
| `accessibility`         | `TockAccessibility`                    | Object for overriding role and label accessibility attributes            |
| `localStorageHistory`   | `TockLocalStorage?`                    | Object for history local storage                                         |

#### `TockAccessibility`

| Property name                     | Type                       | Description                                                                                         |
|-----------------------------------|----------------------------|-----------------------------------------------------------------------------------------------------|
| `input`                           | `InputAccessibility?`      | Object for adding accessibility labels on input component (see below)                               |
| `carousel`                        | `CarouselAccessibility?`   | Object for adding accessibility labels on carousel component (see below)                            |
| `qrCarousel`                      | `QRCarouselAccessibility?` | Object for adding accessibility labels on QR inline carousel component component (see below)        |

#### `InputAccessibility`

| Property name                     | Type                       | Description                                                                                         |
|-----------------------------------|----------------------------|-----------------------------------------------------------------------------------------------------|
| `sendButtonLabel`                 | `string?`                  | Message of the send message button image aria-label attribute (overrides 'Send a message')          |
| `clearButtonLabel`                | `string?`                  | Message of the clear messages button image aria-label attribute (overrides 'Clear messages')        |

#### `TockLocalStorage`

| Property name                     | Type                   | Description                                                                 |
|-----------------------------------|------------------------|-----------------------------------------------------------------------------|
| `enable`                          | `boolean?`             | Enable history local storage                                                |
| `maxNumberMessages`               | `number?`              | Max number of messages in the history local storage (default 10)            |

#### `CarouselAccessibility`

| Property name             | Type                   | Description                                                                                        |
|---------------------------|------------------------|----------------------------------------------------------------------------------------------------|
| `roleDescription`         | `string?`              | Message of the carousel aria-roledescription attribute (overrides 'Carousel')                      |
| `slideRoleDescription`    | `string?`              | Message of the slide carousel aria-roledescription attribute (overrides 'Slide')                   |
| `previousButtonLabel`     | `string?`              | Message of the carousel previous button image aria-label attribute (overrides 'Previous slides')   |
| `nextButtonLabel`         | `string?`              | Message of the carousel next button image aria-label attribute (overrides 'Next slides')           |

#### `QRCarouselAccessibility`

| Property name           | Type                   | Description                                                                                                            |
|-------------------------|------------------------|------------------------------------------------------------------------------------------------------------------------|
| `previousButtonLabel`   | `string?`              | Message of the quick replies carousel previous button image aria-label attribute (overrides 'Previous quick replies')  |
| `nextButtonLabel`       | `string?`              | Message of the quick replies carousel next button image aria-label attribute (overrides 'Next quick replies')          |

#### Accessibility

The optional `accessibility` makes it possible to override default messages for some aria attributes.

Example :

```js
renderChat(
    document.getElementById('chat'),
    '<TOCK_BOT_API_URL>',
    undefined,
    {},
    { accessibility: {
        carousel: {
          roleDescription: 'Carousel',
          slideRoleDescription: 'Result',
        },
      },
    },
);
```

#### Local storage history

The optional `localStorageHistory` makes it possible to provide a history session of messages.
This history loads at the creation of the chat and is stored in the locale storage of the browser.

The `localStorageHistory` parameter is an object, by default not set (enable then to false).

Example:

```js
renderChat(
    document.getElementById('chat'),
    '<TOCK_BOT_API_URL>',
    undefined,
    {},
    { localStorageHistory: {
        enable: true,
        maxNumberMessages: 15, // by default 10 messages max
      }
    },
);
```

> If sensitive information appear in conversation, do not use this option.
>
> If browser disable or cannot handle locale storage, the chat will not store messages.

#### Post-initialization behaviours

##### After Init callback

The optional `afterInit` is a callback function, called once the chat is ready to send payloads to the server.
It takes a [`PostInitContext`](./src/PostInitContext.ts) parameter, which allows the callback to interact with the chat
(sending messages, clearing the chat, etc.). If it returns a promise, the chat will wait for the promise to resolve
before performing other post-init tasks.

Example:

```js
renderChat(
    document.getElementById('chat'), 
    '<TOCK_BOT_API_URL>', 
    undefined,
    {},
    {
      localStorageHistory: { enable: true },
      afterInit: async (context) => {
        if (context.history) await context.sendMessage('I am back');
        else await context.sendPayload('greetings')
      }
    },
);
```

In this example, whenever the page is loaded:
- If the user previously interacted with the bot, they will send the "I am back" message to the bot endpoint,
triggering the corresponding story. Said message will be displayed as a user message.
- Otherwise, a payload will be sent, which will trigger the intent with the ID `greetings`.

##### Opening message

The optional `openingMessage` is a sentence, automatically sent to the bot when the conversation starts.
If an `afterInit` callback is also specified, it runs before the opening message gets sent.
This is typically used to trigger a welcoming or onboarding story for the user,
without requiring them to type a sentence first.
Said story is configured in _Tock Studio_, or managed like any other Tock story,

The `openingMessage` parameter is a sentence from the user to the bot, albeit not actually displayed in conversation.
It is not the configured answer from the bot.

Example:

```js
renderChat(
    document.getElementById('chat'), 
    '<TOCK_BOT_API_URL>', 
    undefined,
    {},
    { openingMessage: 'hello my bot' },
);
```

In this example, when the user opens/loads the page embedding the `tock-react-kit` for the first time,
the story corresponding to _"hello my bot"_ (e.g. `hello`) will be triggered, starting the conversation.

#### Extra headers

The optional `extraHeadersProvider` makes it possible to provide additional HTTP headers, 
to message requests from the Web page (`tock-react-kit` component) to the Bot (Tock Bot API).

Example:

```js
renderChat(
    document.getElementById('chat'), 
    '<TOCK_BOT_API_URL>', 
    undefined,
    {},
    { extraHeadersProvider: (async () => ({'my-custom-header': 'some value'})) },
);
```

This is typically used to pass tokens or custom values to the Bot backend.

> Note that extra headers should be allowed by the backend's CORS setup for the application to work as intended.
 
#### Custom widgets

Tock web connector can send custom messages :

```json
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
    undefined,
    {}, 
    {
        widgets: {
            TrainCardWidget
        }
    }
);
```

#### SSE

By default, the `tock-react-kit` tries to connect to the Bot through [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events).
If an error occurs, it probably means the Bot's backend does not accept SSE, so the `tock-react-kit` switches to classic requests.

The optional `disableSse`parameter makes it possible to disable SSE before even trying, possibly preventing a `404` error 
from console (when the Bot does not accept SSE).

Example:

```js
renderChat(
    document.getElementById('chat'), 
    '<TOCK_BOT_API_URL>', 
    undefined,
    {},
    { disableSse: true },
);
```
