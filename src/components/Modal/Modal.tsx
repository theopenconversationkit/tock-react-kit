import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { X } from 'react-feather';
import TockAccessibility from '../../TockAccessibility';

const ModalDialog = styled.dialog`
  position: relative;
  padding: 1.5em;

  ${(props) => props.theme.overrides?.modal}
`;

const DismissButton = styled.button`
  background-color: white;
  border: none;
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 1.5em;
  width: 1.5em;
  cursor: pointer;
  &:not(:hover) {
    opacity: 50%;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  ${(props) => props.theme.overrides?.modalDismiss}
`;

type Props = PropsWithChildren<{
  className?: string;
  onBackdropClick?: MouseEventHandler<HTMLDialogElement>;
  onClose?: (result?: string) => void;
  open?: boolean;
  accessibility?: TockAccessibility;
  'aria-label'?: string;
}>;

/**
 * A modal that detects when the user clicks outside it
 */
export const Modal = ({
  accessibility,
  className,
  children,
  onBackdropClick,
  onClose,
  open,
  'aria-label': ariaLabel,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.onclose = () => onClose?.(ref.current?.returnValue);
    }
  }, []);
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        onBackdropClick?.(event);
      }
    }
  };
  return (
    <ModalDialog
      ref={ref}
      onPointerDown={onDialogClick}
      className={className}
      tabIndex={-1}
      aria-label={ariaLabel}
    >
      <DismissButton
        onClick={() => ref.current?.close()}
        title={accessibility?.closeButtonLabel ?? 'Close'}
      >
        <X aria-hidden="true" />
      </DismissButton>
      {children}
    </ModalDialog>
  );
};
