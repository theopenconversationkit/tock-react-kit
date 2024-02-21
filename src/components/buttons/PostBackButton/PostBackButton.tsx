import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { Interpolation, Theme } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  customStyle?: Interpolation<unknown>;
  imageUrl?: string;
  label: string;
};

export const PostBackButton = ({
  imageUrl,
  label,
  customStyle,
}: Props): JSX.Element => {
  const postBackButtonCss: Interpolation<Theme> = [
    baseButtonStyle,
    // Allow custom override for the Card's button styling
    customStyle ?? [
      quickReplyStyle,
      // Fall back to historical quick reply override if the new postback button override is not used
      (theme) =>
        theme.overrides?.buttons?.postbackButton ??
        theme?.overrides?.quickReply,
    ],
  ];
  return (
    <button css={postBackButtonCss}>
      {imageUrl && <QuickReplyImage src={imageUrl} />}
      {label}
    </button>
  );
};
