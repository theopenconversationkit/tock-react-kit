import {
  cloneElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
} from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import { useTheme } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import { prop } from 'styled-tools';
import useCarousel from './hooks/useCarousel';
import useArrowVisibility from './hooks/useArrowVisibility';
import TockAccessibility from 'TockAccessibility';
import TockTheme from '../../styles/theme';

const ButtonContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  width: 100%;
  position: relative;
  overflow-x: auto;
`;

const ItemContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = styled.ul`
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  justify-content: start;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  position: relative;
  padding: 0;
  list-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  ${prop('theme.overrides.carouselContainer', '')}

  & > li, & > * {
    margin-left: 1em;
    margin-right: 1em;

    ${prop('theme.overrides.carouselItem', '')}
  }
`;

const Previous: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = styled.button`
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: color-mix(
    in srgb,
    ${(props) => props.theme.palette.background.bot} 15%,
    transparent
  );
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop('theme.palette.text.bot')};
    }
  }

  ${prop('theme.overrides.carouselArrow', '')};
`;

const Next: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = styled.button`
  position: absolute;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: color-mix(
    in srgb,
    ${(props) => props.theme.palette.background.bot} 15%,
    transparent
  );
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop('theme.palette.text.bot')};
    }
  }

  ${prop('theme.overrides.carouselArrow', '')};
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
  const theme: TockTheme = useTheme();

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
        {children?.map((child, i) => {
          const cardRef = ref.items[i].refObject;
          return (
            <li
              key={`carousel-card-${i}`}
              ref={cardRef}
              role={cardRef == undefined ? undefined : 'group'}
              aria-roledescription={
                cardRef === undefined
                  ? undefined
                  : accessibility?.carousel?.slideRoleDescription ?? 'Slide'
              }
            >
              {cloneElement(
                child,
                {
                  isHidden: ref.items[i].isHidden,
                },
                undefined,
              )}
            </li>
          );
        })}
      </ItemContainer>
      {rightVisible && (
        <Next onClick={next}>
          <ArrowRightCircle
            size={`calc(${theme.typography.fontSize} * 2)`}
            role="img"
            aria-label={
              accessibility?.carousel?.nextButtonLabel || 'Next slides'
            }
            focusable="false"
          />
        </Next>
      )}
    </ButtonContainer>
  );
};

export default Carousel;
