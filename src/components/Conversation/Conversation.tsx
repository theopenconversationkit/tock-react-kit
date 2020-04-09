import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes, RefObject, useEffect, useRef } from 'react';
import TockTheme from 'TockTheme';

const ConversationContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const Conversation: (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => JSX.Element = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const container: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { children, ...restProps }: typeof props = props;

  useEffect(() => {
    if (container.current) {
      const scroll = () => {
        if (container.current) {
          container.current.scrollTop = container.current.scrollHeight
        }
      };
      scroll();
      const images: NodeListOf<HTMLImageElement> = container.current.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        if (!img.onload) {
          img.onload = scroll;
        }
      });
    }
  });

  return (
    <ConversationContainer ref={container} {...restProps}>
      {children}
    </ConversationContainer>
  );
};

export default Conversation;
