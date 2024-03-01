import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { css, Interpolation, useTheme } from '@emotion/react';
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

const defaultAnchorStyle = css`
  text-align: center;
  text-decoration: none;
`;

export const UrlButton: (props: Props) => JSX.Element = ({
  url,
  imageUrl,
  label,
  target = '_blank',
  customStyle,
  tabIndex,
}: Props) => {
  const theme = useTheme();
  const anchorStyle = [
    baseButtonStyle,
    defaultAnchorStyle,
    customStyle || [
      quickReplyStyle,
      // Fall back to historical quick reply override if the new url button override is not used
      theme.overrides?.buttons?.urlButton || theme.overrides?.quickReply,
    ],
  ];
  const TextRenderer = useTextRenderer('default');
  return (
    <a href={url} target={target} css={anchorStyle} tabIndex={tabIndex}>
      {imageUrl && <QuickReplyImage src={imageUrl} />}
      <TextRenderer text={label} />
    </a>
  );
};
