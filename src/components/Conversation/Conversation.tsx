import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import TockTheme from 'TockTheme';

const ConversationContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme
> = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const Conversation: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const container: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTo({
        top: container.current.scrollHeight,
      });
    }
  });

  return <ConversationContainer ref={container}>{children}</ConversationContainer>;
};

export default Conversation;
