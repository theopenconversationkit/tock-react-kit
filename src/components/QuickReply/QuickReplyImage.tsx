import { css, Interpolation, Theme } from '@emotion/react';
import { useImageRenderer } from '../../settings/RendererSettings';

const qrImageStyle: Interpolation<Theme> = [
  css`
    margin-right: inherit;
    max-width: 15px;
    max-height: 15px;
    vertical-align: middle;
  `,
  (theme) => theme.overrides?.quickReplyImage,
];

interface Props {
  src: string;
}

const QuickReplyImage = ({ src }: Props): JSX.Element => {
  const ImageRenderer = useImageRenderer('buttonIcon');
  return <ImageRenderer src={src} css={qrImageStyle} />;
};

export default QuickReplyImage;
