import React, { DetailedHTMLProps, HTMLAttributes, useCallback } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { prop } from 'styled-tools';

import { Button } from '../../TockContext';
import QuickReply from '../QuickReply/QuickReply';
import TockTheme from '../../styles/theme';

const QuickReplyListContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  unknown,
  TockTheme
> = styled.ul`
  flex-shrink: 0;
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  overflow-x: unset;
  text-align: left;

  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 1em;

  & > * {
    display: inline-block;
  }
`;

const QuickReplyListOuterContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div``;

type Props = {
  items: Button[];
  onItemClick: (button: Button) => void;
};

const QuickReplyList = ({ items, onItemClick }: Props) => {
  const renderItem = useCallback(
    (item: Button, index: number) => (
      <QuickReply
        key={`${item.label}-${index}`}
        onClick={onItemClick.bind(null, item)}
        {...item}
      />
    ),
    [onItemClick],
  );

  return (
    <QuickReplyListOuterContainer>
      <QuickReplyListContainer>{items.map(renderItem)}</QuickReplyListContainer>
    </QuickReplyListOuterContainer>
  );
};

export default QuickReplyList;
