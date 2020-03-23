import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import TockTheme from '../../TockTheme';
import { opacify, readableColor } from 'polished';
import { fontSize } from '../../utils';
import { useTheme } from 'emotion-theming';

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

const Carousel: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const carousel: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const theme: TockTheme = useTheme<TockTheme>();
  const [isLeftArrowVisible, setIsLeftArrowVisible]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  const handleArrowVisibility: () => void = () => {
    if (carousel.current) {
      if (carousel.current.scrollLeft > 0) {
        setIsLeftArrowVisible(true);
      } else {
        setIsLeftArrowVisible(false);
      }
      if (
        carousel.current.scrollLeft + carousel.current.clientWidth <
        carousel.current.scrollWidth
      ) {
        setIsRightArrowVisible(true);
      } else {
        setIsRightArrowVisible(false);
      }
    }
  };

  const scrollLeft: () => void = () => {
    if (carousel.current) {
      carousel.current.scrollTo(carousel.current.scrollLeft - carousel.current.clientWidth, 0);
    }
    handleArrowVisibility();
  };

  const scrollRight: () => void = () => {
    if (carousel.current) {
      carousel.current.scrollTo(carousel.current.scrollLeft + carousel.current.clientWidth, 0);
    }
    handleArrowVisibility();
  };

  useEffect(() => {
    handleArrowVisibility();
  });

  useEffect(() => {
    if (carousel.current) {
      carousel.current.addEventListener('scroll', handleArrowVisibility);
      carousel.current.addEventListener('resize', handleArrowVisibility);
    }
    return () => {
      if (carousel.current) {
        carousel.current.removeEventListener('scroll', handleArrowVisibility);
        carousel.current.removeEventListener('resize', handleArrowVisibility);
      }
    };
  }, [carousel]);

  return (
    <ButtonContainer>
      {isLeftArrowVisible ? (
        <Previous onClick={scrollLeft}>
          <ArrowLeftCircle size={fontSize(theme) * 2} />
        </Previous>
      ) : null}
      <ItemContainer ref={carousel}>{children}</ItemContainer>
      {isRightArrowVisible ? (
        <Next onClick={scrollRight}>
          <ArrowRightCircle size={fontSize(theme) * 2} />
        </Next>
      ) : null}
    </ButtonContainer>
  );
};

export default Carousel;
