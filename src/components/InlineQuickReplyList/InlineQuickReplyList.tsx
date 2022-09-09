import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import styled, { StyledComponent } from '@emotion/styled';
import { prop } from 'styled-tools';
import { useTheme } from 'emotion-theming';
import TockTheme from '../../styles/theme';
import { opacify } from 'polished';
import { Button } from '../../TockContext';
import useCarouselQuickReply from './hooks/useCarouselQuickReply';
import useArrowVisibility from '../Carousel/hooks/useArrowVisibility';
import QuickReply from '../QuickReply/QuickReply';
import TockAccessibility from 'TockAccessibility';

const InlineQuickReplyListContainer: StyledComponent<
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
  align-items: center;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  margin: 0.5em auto;

  & > * {
    flex-shrink: 0;
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
  width: 3em;
  height: 3em;
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

  ${prop<any>('theme.overrides.quickReplyArrow', '')};
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
  width: 3em;
  height: 3em;
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

  ${prop<any>('theme.overrides.quickReplyArrow', '')};
`;

const InlineQuickReplyListOuterContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  position: relative;
`;
type Props = {
  items: Button[];
  onItemClick: (button: Button) => void;
  accessibility?: TockAccessibility;
};

const InlineQuickReplyList = ({ items, onItemClick, accessibility }: Props) => {
  const theme: TockTheme = useTheme<TockTheme>();
  const [ref, previous, next] = useCarouselQuickReply<HTMLUListElement>(
    items?.length,
  );

  const [leftVisible, rightVisible] = useArrowVisibility(
    ref.container,
    ref.items,
  );

  return (
    <InlineQuickReplyListOuterContainer>
      {leftVisible && (
        <Previous onClick={previous}>
          <ArrowLeftCircle
            size={`${theme.typography.fontSize}`}
            aria-label={
              accessibility?.qrCarousel?.previousButtonLabel ||
              'Previous quick replies'
            }
          />
        </Previous>
      )}
      <InlineQuickReplyListContainer ref={ref.container}>
        {items.map((child, index) => (
          <QuickReply
            key={`${child.label}-${index}`}
            onClick={onItemClick.bind(null, child)}
            {...child}
            ref={ref.items[index]}
          />
        ))}
      </InlineQuickReplyListContainer>
      {rightVisible && (
        <Next onClick={next}>
          <ArrowRightCircle
            size={`${theme.typography.fontSize}`}
            aria-label={
              accessibility?.qrCarousel?.nextButtonLabel || 'Next quick replies'
            }
          />
        </Next>
      )}
    </InlineQuickReplyListOuterContainer>
  );
};

export default InlineQuickReplyList;
