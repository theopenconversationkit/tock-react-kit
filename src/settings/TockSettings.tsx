import { RendererSettings } from './RendererSettings';
import linkifyHtml from 'linkify-html';
import { PartialDeep } from 'type-fest';

export interface LocalStorageSettings {
  prefix: string;
  enableMessageHistory: boolean;
  maxMessageCount: number;
  historyMaxAge: number;
}

export interface NetworkSettings {
  disableSse: boolean;
  retryOnPingTimeoutMs: number;
  extraHeadersProvider?: () => Promise<Record<string, string>>;
}

export default interface TockSettings {
  endpoint?: string; // will be required in a future release
  locale?: string;
  localStorage: LocalStorageSettings;
  network: NetworkSettings;
  renderers: RendererSettings;
}

export type TockOptionalSettings = Omit<PartialDeep<TockSettings>, 'endpoint'>;

export const defaultSettings: TockSettings = {
  localStorage: {
    prefix: '',
    enableMessageHistory: false,
    maxMessageCount: 10,
    historyMaxAge: -1,
  },
  network: {
    disableSse: false,
    retryOnPingTimeoutMs: 15000, // 15 seconds
  },
  renderers: {
    buttonRenderers: {
      default({ buttonData, children, ...rest }) {
        return <button {...rest}>{children}</button>;
      },
      url({ buttonData, children, ...rest }) {
        return <a {...rest}>{children}</a>;
      },
    },
    imageRenderers: {
      default({ src, alt, ...props }) {
        return <img src={src} alt={alt} {...props} />;
      },
    },
    messageRenderers: {},
    textRenderers: {
      default({ text }) {
        return text;
      },
      html({ text }) {
        return <div dangerouslySetInnerHTML={{ __html: linkifyHtml(text) }} />;
      },
      htmlPhrase({ text }) {
        return <span dangerouslySetInnerHTML={{ __html: linkifyHtml(text) }} />;
      },
    },
  },
};
