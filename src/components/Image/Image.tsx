import { css, useTheme } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, useState } from 'react';
import { theme } from 'styled-tools';
import '../../styles/theme';
import { useImageRenderer } from '../../settings/RendererSettings';
import { Modal } from '../Modal/Modal';
import TockAccessibility from '../../TockAccessibility';

export const CardOuter: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>> = styled.li`
  max-width: ${theme('sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const CardContainer: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = styled.div`
  padding: 0.5em;
  background: ${theme('palette.background.card')};
  color: ${theme('palette.text.card')};
  border-radius: ${theme('sizing.borderRadius')};
  border: 2px solid ${theme('palette.text.card')};
  width: 20em;

  ${theme('overrides.card.cardContainer', '')};
`;

const ZoomImageButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: zoom-in;
`;

/**
 * Instructions for screen-readers
 */
const ZoomInstructions = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export interface ImageProps {
  title?: string;
  url?: string;
  alternative?: string;
  accessibility?: TockAccessibility;
}

const Image = forwardRef<HTMLLIElement, ImageProps>(function imageRender(
  { title, accessibility, url: src, alternative: alt }: ImageProps,
  ref,
) {
  const theme = useTheme();
  const [zoomed, setZoomed] = useState(false);
  const renderImage = useImageRenderer('standalone');
  const normalImageCss = [
    css`
      max-width: 100%;
      max-height: 100%;
    `,
    theme.overrides?.image?.normal ?? theme.overrides?.card?.cardImage,
  ];
  const zoomedDialogCss = [
    css`
      width: min(90vw, 60ch);
      max-height: 90vh;
    `,
    theme.overrides?.image?.zoomedModal,
  ];
  const zoomedImageCss = [
    normalImageCss,
    css`
      width: 100%;
      height: 100%;
    `,
    theme.overrides?.image?.zoomed,
  ];
  return (
    <CardOuter ref={ref}>
      <CardContainer>
        {src && (
          <>
            <ZoomImageButton onClick={() => setZoomed(true)}>
              {renderImage({
                src,
                alt,
                css: normalImageCss,
              })}
              <ZoomInstructions>
                {accessibility?.image?.zoomedImageLabel ??
                  'Click to open detail view'}
              </ZoomInstructions>
            </ZoomImageButton>
            <Modal
              onBackdropClick={() => setZoomed(false)}
              onClose={() => setZoomed(false)}
              open={zoomed}
              css={zoomedDialogCss}
              aria-label={
                accessibility?.image?.zoomedImageLabel ??
                'Zoomed image: ' + title
              }
            >
              {renderImage({
                src,
                alt,
                css: zoomedImageCss,
              })}
            </Modal>
          </>
        )}
      </CardContainer>
    </CardOuter>
  );
});

export default Image;
