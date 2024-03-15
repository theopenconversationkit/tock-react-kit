import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { Interpolation, Theme } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';
import { useTextRenderer } from '../../../settings/RendererSettings';

const postBackButtonCss: Interpolation<Theme> = [
  baseButtonStyle,
  [
    quickReplyStyle,
    // Fall back to historical quick reply override if the new postback button override is not used
    (theme) =>
      theme.overrides?.buttons?.postbackButton ?? theme?.overrides?.quickReply,
  ],
];

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  customStyle?: Interpolation<unknown>;
  imageUrl?: string;
  label: string;
  tabIndex?: 0 | -1;
};

export const PostBackButton = ({
  imageUrl,
  label,
  customStyle,
  ...rest
}: Props): JSX.Element => {
  // Allow custom override for the Card's button styling
  const css = customStyle ? [baseButtonStyle, customStyle] : postBackButtonCss;
  const TextRenderer = useTextRenderer('default');
  return (
    <button css={css} {...rest}>
      {imageUrl && <QuickReplyImage src={imageUrl} />}
      <TextRenderer text={label} />
    </button>
  );
};
