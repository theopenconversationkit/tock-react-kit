import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import { opacify } from 'polished';
import { prop } from 'styled-tools';
import { useTheme } from 'emotion-theming';
import useCarousel from './hooks/useCarousel';
import useArrowVisibility from './hooks/useArrowVisibility';
import TockTheme from 'styles/theme';

const ButtonContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  margin: 0.4em 0;
  position: relative;
`;

const ItemContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
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
  scrollbar-width: none;
  ${prop<any>('theme.overrides.carouselContainer', '')}

  & > div, & > * {
    margin-left: 1em;
    margin-right: 1em;

    ${prop<any>('theme.overrides.carouselItem', '')}
  }
`;

const Previous: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  unknown,
  TockTheme
> = styled.button`
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${(props) => opacify(-0.8, props.theme.palette.background.bot)};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop<any>('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop<any>('theme.palette.text.bot')};
    }
  }

  ${prop<any>('theme.overrides.carouselArrow', '')};
`;

const Next: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  unknown,
  TockTheme
> = styled.button`
  position: absolute;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${(props) => opacify(-0.8, props.theme.palette.background.bot)};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop<any>('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop<any>('theme.palette.text.bot')};
    }
  }

  ${prop<any>('theme.overrides.carouselArrow', '')};
`;

const Carousel: (props: { children?: ReactElement[] }) => JSX.Element = ({
  children,
}: {
  children?: ReactElement[];
}) => {
  const theme: TockTheme = useTheme<TockTheme>();
  const [ref, previous, next] = useCarousel<HTMLDivElement>(children?.length);
  const [leftVisible, rightVisible] = useArrowVisibility(
    ref.container,
    ref.items,
  );

  return (
    <ButtonContainer>
      {leftVisible && (
        <Previous onClick={previous}>
          <ArrowLeftCircle size={`calc(${theme.typography.fontSize} * 2)`} />
        </Previous>
      )}
      <ItemContainer ref={ref.container}>
        {children?.map((child, i) =>
          React.cloneElement(child, { ref: ref.items[i] }, undefined),
        )}
      </ItemContainer>
      {rightVisible && (
        <Next onClick={next}>
          <ArrowRightCircle size={`calc(${theme.typography.fontSize} * 2)`} />
        </Next>
      )}
    </ButtonContainer>
  );
};

export default Carousel;
