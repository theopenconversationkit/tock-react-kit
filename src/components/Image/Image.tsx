import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import { prop } from 'styled-tools';
import '../../styles/theme';

export const CardOuter: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

const CardImage: StyledComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = styled.img`
  max-width: 100%;
  max-height: 100%;

  ${prop('theme.overrides.card.cardImage', '')};
`;

export const CardContainer: StyledComponent<
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

export interface ImageProps {
  title: string;
  url?: string;
  alternative?: string;
}

const Image = React.forwardRef<HTMLLIElement, ImageProps>(function imageRender(
  { url, alternative }: ImageProps,
  ref,
) {
  return (
    <CardOuter ref={ref}>
      <CardContainer>
        {url && (
          <a target="_blank" href={url} rel="noreferrer">
            <CardImage src={url} alt={alternative} />
          </a>
        )}
      </CardContainer>
    </CardOuter>
  );
});

export default Image;
