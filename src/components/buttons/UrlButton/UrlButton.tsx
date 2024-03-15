import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { css, Interpolation, Theme } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';
import { useTextRenderer } from '../../../settings/RendererSettings';

type Props = {
  customStyle?: Interpolation<unknown>;
  imageUrl?: string;
  label: string;
  target?: string;
  url: string;
  tabIndex?: 0 | -1;
};

const baseUrlButtonCss = css([
  baseButtonStyle,
  css`
    text-align: center;
    text-decoration: none;
  `,
]);

const defaultUrlButtonCss: Interpolation<Theme> = [
  baseUrlButtonCss,
  quickReplyStyle,
  // Fall back to historical quick reply override if the new url button override is not used
  (theme) => theme.overrides?.buttons?.urlButton || theme.overrides?.quickReply,
];

export const UrlButton: (props: Props) => JSX.Element = ({
  url,
  imageUrl,
  label,
  target = '_blank',
  customStyle,
  tabIndex,
}: Props) => {
  const css = customStyle
    ? [baseUrlButtonCss, customStyle]
    : defaultUrlButtonCss;
  const TextRenderer = useTextRenderer('default');
  return (
    <a href={url} target={target} css={css} tabIndex={tabIndex}>
      {imageUrl && <QuickReplyImage src={imageUrl} />}
      <TextRenderer text={label} />
    </a>
  );
};
