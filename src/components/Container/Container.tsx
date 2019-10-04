import styled, { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import TockTheme from 'TockTheme';

const Container: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;

  font-family: ${props =>
    (props.theme && props.theme.fontFamily) || 'Arial, Helvetica, sans-serif'};
  font-size: ${props =>
    (console.log(props) as any) || (props.theme && props.theme.fontSize) || '16px'};

  & > *:first-child {
    flex-shrink: 1;
    overflow-y: scroll;
  }

  & > *:not(:first-child) {
    flex: 1;
  }

  & * {
    font: inherit;
  }

  ${props => (props.theme && props.theme.styles && props.theme.styles.chat) || ''}
`;

export default Container;
