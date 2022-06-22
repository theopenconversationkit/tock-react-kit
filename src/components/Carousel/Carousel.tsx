import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import { opacify } from 'polished';
import { prop } from 'styled-tools';
import { useTheme } from 'emotion-theming';
import useCarousel from './hooks/useCarousel';
import useArrowVisibility from './hooks/useArrowVisibility';
import TockTheme from 'styles/theme';
import TockAccessibility from 'TockAccessibility';

const ButtonContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  unknown,
  TockTheme
> = styled.li`
  margin: 0.4em 0;
  position: relative;
  list-style: none;
`;

const ItemContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  unknown,
  TockTheme
> = styled.ul`
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  justify-content: start;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  position: relative;
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  ${prop<any>('theme.overrides.carouselContainer', '')}

  & > li, & > * {
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

const Carousel: (props: {
  children?: ReactElement[];
  accessibility?: TockAccessibility;
}) => JSX.Element = ({
  children,
  accessibility,
}: {
  children?: ReactElement[];
  accessibility?: TockAccessibility;
}) => {
  const theme: TockTheme = useTheme<TockTheme>();
  const [ref, previous, next] = useCarousel<HTMLUListElement>(children?.length);
  const [leftVisible, rightVisible] = useArrowVisibility(
    ref.container,
    ref.items.map((item) => item.refObject),
  );

  return (
    <ButtonContainer>
      {leftVisible && (
        <Previous onClick={previous}>
          <ArrowLeftCircle
            size={`calc(${theme.typography.fontSize} * 2)`}
            role="img"
            aria-label={
              accessibility?.carousel?.previousButtonLabel || 'Previous slides'
            }
            focusable="false"
          />
        </Previous>
      )}
      <ItemContainer
        ref={ref.container}
        role="group"
        aria-roledescription={
          accessibility?.carousel?.roleDescription || 'Carousel'
        }
        tabIndex={-1}
      >
        {children?.map((child, i) =>
          React.cloneElement(
            child,
            {
              ref: ref.items[i].refObject,
              roleDescription: accessibility?.carousel?.slideRoleDescription,
              isHidden: ref.items[i].isHidden,
            },
            undefined,
          ),
        )}
      </ItemContainer>
      {rightVisible && (
        <Next onClick={next}>
          <ArrowRightCircle
            size={`calc(${theme.typography.fontSize} * 2)`}
            role="img"
            aria-label={accessibility?.carousel?.nextButtonLabel || 'Next slides'}
            focusable="false"
          />
        </Next>
      )}
    </ButtonContainer>
  );
};

export default Carousel;
