import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { Interpolation, Theme } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import { DetailedHTMLProps, HTMLAttributes, JSX } from 'react';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';
import {
  useButtonRenderer,
  useTextRenderer,
} from '../../../settings/RendererSettings';
import { PostBackButtonData } from '../../../index';

const postBackButtonCss: Interpolation<Theme> = [
  baseButtonStyle,
  [
    quickReplyStyle,
    // Fall back to historical quick reply override if the new postback button override is not used
    (theme) =>
      theme.overrides?.buttons?.postbackButton ?? theme?.overrides?.quickReply,
  ],
];

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonData: PostBackButtonData;
  customStyle?: Interpolation<unknown>;
  tabIndex?: 0 | -1;
}

export const PostBackButton = ({
  buttonData,
  customStyle,
  ...rest
}: Props): JSX.Element => {
  // Allow custom override for the Card's button styling
  const css = customStyle ? [baseButtonStyle, customStyle] : postBackButtonCss;
  const TextRenderer = useTextRenderer('default');
  const ButtonRenderer = useButtonRenderer('postback');
  return (
    <ButtonRenderer buttonData={buttonData} css={css} {...rest}>
      {buttonData.imageUrl && <QuickReplyImage src={buttonData.imageUrl} />}
      <TextRenderer text={buttonData.label} />
    </ButtonRenderer>
  );
};
