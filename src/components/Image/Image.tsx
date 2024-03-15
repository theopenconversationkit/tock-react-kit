import styled, { StyledComponent } from '@emotion/styled';
import { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { prop } from 'styled-tools';
import '../../styles/theme';
import { css, Interpolation, Theme } from '@emotion/react';
import { useImageRenderer } from '../../settings/RendererSettings';

export const ImageOuter: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const ImageContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  padding: 0.5em;
  background: ${prop('theme.palette.background.card')};
  color: ${prop('theme.palette.text.card')};
  border-radius: ${prop('theme.sizing.borderRadius')};
  border: 2px solid ${prop('theme.palette.text.card')};
  width: 20em;

  ${prop('theme.overrides.card.cardContainer', '')};
`;

const normalImageCss: Interpolation<Theme> = [
  css`
    max-width: 100%;
    max-height: 100%;
  `,
  (theme) => theme.overrides?.card?.cardImage,
];

export interface ImageProps {
  title?: string;
  url?: string;
  alternative?: string;
}

const Image = forwardRef<HTMLLIElement, ImageProps>(function imageRender(
  { url: src, alternative: alt }: ImageProps,
  ref,
) {
  const ImageRenderer = useImageRenderer('standalone');
  return (
    <ImageOuter ref={ref}>
      <ImageContainer>
        {src && (
          <a target="_blank" href={src} rel="noreferrer">
            <ImageRenderer src={src} alt={alt} css={normalImageCss} />
          </a>
        )}
      </ImageContainer>
    </ImageOuter>
  );
});

export default Image;
