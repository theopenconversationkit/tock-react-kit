import React, { DetailedHTMLProps, HTMLAttributes, useCallback } from 'react';
import { css, SerializedStyles, Theme } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';

import { Button } from '../../model/buttons';
import QuickReply from '../QuickReply/QuickReply';
import '../../styles/theme';

export const baseButtonListStyle: (props: {
  theme: Theme;
}) => SerializedStyles = ({ theme }) => css`
  max-width: ${theme.sizing.conversation.width};
  margin: 0.5em auto;
  text-align: left;

  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 1em;
`;

const QuickReplyListContainer: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>> = styled.ul`
  ${baseButtonListStyle};

  & > li {
    display: inline-block;
  }
`;

const QuickReplyListOuterContainer: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = styled.div``;

type Props = {
  items: Button[];
  onItemClick: (button: Button) => void;
};

const QuickReplyList: (props: Props) => JSX.Element = ({
  items,
  onItemClick,
}: Props) => {
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
