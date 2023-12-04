import styled, { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { prop } from 'styled-tools';

const Container: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${prop<any>('theme.typography.fontFamily')};
  font-size: ${prop<any>('theme.typography.fontSize')};

  & > *:first-child {
    flex: 1;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0px; /* Remove scrollbar space */
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }

  & > *:not(:first-child) {
    flex: unset;
  }

  & * {
    font: inherit;
  }

  ${prop<any>('theme.overrides.chat', '')};
`;

export default Container;
