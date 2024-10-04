import { quickReplyStyle } from '../../QuickReply/QuickReply';
import { css, Interpolation, Theme } from '@emotion/react';
import { baseButtonStyle } from '../../QuickReply';
import QuickReplyImage from '../../QuickReply/QuickReplyImage';
import {
  useButtonRenderer,
  useTextRenderer,
} from '../../../settings/RendererSettings';
import { UrlButton as UrlButtonData } from '../../../model/buttons';

type Props = {
  customStyle?: Interpolation<unknown>;
  buttonData: UrlButtonData;
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
  buttonData,
  customStyle,
  tabIndex,
}: Props) => {
  const css = customStyle
    ? [baseUrlButtonCss, customStyle]
    : defaultUrlButtonCss;
  const TextRenderer = useTextRenderer('default');
  const ButtonRenderer = useButtonRenderer('url');
  return (
    <ButtonRenderer
      buttonData={buttonData}
      href={buttonData.url}
      target={buttonData.target ?? '_blank'}
      css={css}
      tabIndex={tabIndex}
    >
      {buttonData.imageUrl && <QuickReplyImage src={buttonData.imageUrl} />}
      <TextRenderer text={buttonData.label} />
    </ButtonRenderer>
  );
};
