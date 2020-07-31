import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement
} from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import TockTheme from '../../TockTheme';
import { opacify, readableColor } from 'polished';
import { fontSize } from '../../utils';
import { useTheme } from 'emotion-theming';
import useCarousel from './hooks/useCarousel';
import useArrowVisibility from './hooks/useArrowVisibility';

const ButtonContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  margin: 0.4em 0;
  position: relative;
`;

const ItemContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  justify-content: start;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  ${props => (props.theme && props.theme.styles && props.theme.styles.carouselContainer) || ''}

  & > div, & > * {
    margin-left: 1em;
    margin-right: 1em;

    ${props => (props.theme && props.theme.styles && props.theme.styles.carouselItem) || ''}
  }
`;

const Previous: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  {},
  TockTheme
> = styled.button`
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${props => opacify(-0.8, (props.theme && props.theme.botColor) || 'black')};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${props => (props.theme && props.theme.botColor) || 'black'};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
    }
  }

  ${props => (props.theme && props.theme.styles && props.theme.styles.carouselArrow) || ''}
`;

const Next: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  {},
  TockTheme
> = styled.button`
  position: absolute;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${props => opacify(-0.8, (props.theme && props.theme.botColor) || 'black')};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${props => (props.theme && props.theme.botColor) || 'black'};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
    }
  }

  ${props => (props.theme && props.theme.styles && props.theme.styles.carouselArrow) || ''}
`;

const Carousel: (props: { children?: ReactElement<any>[] }) => JSX.Element = ({
  children,
}: {
  children?: ReactElement<any>[];
}) => {
  const theme: TockTheme = useTheme<TockTheme>();
  const [
    ref,
    previous,
    next
  ] = useCarousel<HTMLDivElement>(children?.length)
  const [leftVisible, rightVisible] = useArrowVisibility(ref.container)

  return (
    <ButtonContainer>
      {leftVisible && (
        <Previous onClick={previous}>
          <ArrowLeftCircle size={fontSize(theme) * 2} />
        </Previous>
      )}
      <ItemContainer ref={ref.container}>
        {children?.map((child, i) => React.cloneElement(child, { ref: ref.items[i] }, undefined))}
      </ItemContainer>
      {rightVisible && (
        <Next onClick={next}>
          <ArrowRightCircle size={fontSize(theme) * 2} />
        </Next>
      )}
    </ButtonContainer>
  );
};

export default Carousel;
