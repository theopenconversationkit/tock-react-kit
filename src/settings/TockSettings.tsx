import { RendererSettings } from './RendererSettings';
import linkifyHtml from 'linkify-html';

export interface LocalStorageSettings {
  prefix?: string;
}

export default interface TockSettings {
  endPoint?: string;
  localStorage: LocalStorageSettings;
  locale?: string;
  renderers: RendererSettings;
}

export const defaultSettings: TockSettings = {
  localStorage: {},
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
