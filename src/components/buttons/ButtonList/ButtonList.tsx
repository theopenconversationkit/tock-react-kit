import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { theme } from 'styled-tools';

import { Button } from '../../../model/buttons';
import PostBackButton from '../PostBackButton';
import UrlButton from '../UrlButton';
import { baseButtonListStyle } from '../../QuickReplyList/QuickReplyList';

import '../../../styles/theme';

const ButtonListContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = styled.ul`
  ${baseButtonListStyle}
  ${theme('overrides.buttons.buttonList')}

  & > li {
    display: inline-block;
    ${theme('overrides.buttons.buttonContainer')}
  }
`;

const ButtonListOuterContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div``;

type Props = {
  items: Button[];
  onItemClick: (button: Button) => void;
};

export const ButtonList: (props: Props) => JSX.Element = ({
  items,
  onItemClick,
}: Props) => {
  const renderItem = (item: Button, index: number) => (
    // having the default index-based key is fine since we do not reorder buttons
    <li key={index}>
      {'url' in item ? (
        <UrlButton {...item}></UrlButton>
      ) : (
        <PostBackButton onClick={onItemClick.bind(null, item)} {...item} />
      )}
    </li>
  );

  return (
    <ButtonListOuterContainer>
      <ButtonListContainer role="group">
        {items.map(renderItem)}
      </ButtonListContainer>
    </ButtonListOuterContainer>
  );
};
