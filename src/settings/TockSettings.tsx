import { RendererSettings } from './RendererSettings';
import linkifyHtml from 'linkify-html';

export interface LocalStorageSettings {
  prefix?: string;
}

export default interface TockSettings {
  localStorage: LocalStorageSettings;
  locale?: string;
  renderers: RendererSettings;
}

export const defaultSettings: TockSettings = {
  localStorage: {},
  renderers: {
    imageRenderers: {
      default({ src, alt, css }) {
        return <img src={src} alt={alt} css={css} />;
      },
    },
    textRenderers: {
      default(text) {
        return text;
      },
      html(text) {
        return <div dangerouslySetInnerHTML={{ __html: linkifyHtml(text) }} />;
      },
      htmlPhrase(text) {
        return <span dangerouslySetInnerHTML={{ __html: linkifyHtml(text) }} />;
      },
    },
  },
};
