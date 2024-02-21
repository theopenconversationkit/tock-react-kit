import { css, useTheme } from '@emotion/react';
import { useImageRenderer } from '../../settings/RendererSettings';

const qrImageStyle = css`
  margin-right: inherit;
  max-width: 15px;
  max-height: 15px;
  vertical-align: middle;
`;

interface Props {
  src: string;
}

const QuickReplyImage = ({ src }: Props): JSX.Element => {
  const theme = useTheme();
  const renderImage = useImageRenderer('qrIcon');

  return (
    <>
      {renderImage({
        src,
        css: [qrImageStyle, theme.overrides?.quickReplyImage],
      })}
    </>
  );
};

export default QuickReplyImage;
