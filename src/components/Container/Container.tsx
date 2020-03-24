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
  font-size: ${props =>(props.theme && props.theme.fontSize) || '16px'};

  & > *:first-child {
    flex: 1;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0px;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
    }
  }

  & > *:not(:first-child) {
    flex: 0;
  }

  & * {
    font: inherit;
  }

  ${props => (props.theme && props.theme.styles && props.theme.styles.chat) || ''}
`;

export default Container;
