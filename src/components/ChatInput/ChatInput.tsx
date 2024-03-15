import styled, { StyledComponent } from '@emotion/styled';
import {
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  useState,
} from 'react';
import { Send, Trash2 } from 'react-feather';
import { theme } from 'styled-tools';
import TockAccessibility from 'TockAccessibility';

const InputOuterContainer: StyledComponent<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
> = styled.form`
  max-width: ${theme('sizing.conversation.width')};
  width: 100%;
  position: relative;
  margin: 0.5em auto;
  display: flex;
  align-items: center;
  ${theme('overrides.chatInput.container', '')}
`;

const Input: StyledComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = styled.input`
  width: 100%;
  height: 2em;
  flex: 1;
  border-radius: ${theme('sizing.borderRadius')};
  padding: 0.5em 3em 0.5em 1em;

  background: ${theme('palette.background.input')};
  color: ${theme('palette.text.input')};

  border: none;
  outline: none;

  font-family: inherit;
  font-size: inherit;

  &.disabled-input {
    background: ${theme('palette.background.inputDisabled')};
  }

  ${theme('overrides.chatInput.input', '')}
`;

const SubmitIcon: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = styled.button`
  position: absolute;
  background: none;
  border: none;
  border-radius: 50%;
  right: calc(${theme('typography.fontSize')} * 2);
  flex: 0;
  cursor: pointer;
  height: 100%;
  width: calc(${theme('typography.fontSize')} * 3);
  & svg {
    stroke: ${theme('palette.background.bot')};
    fill: ${theme('palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 0;
    right: 0;
    height: 80%;

    &:hover,
    &:focus {
      stroke: ${theme('palette.text.bot')};
      fill: ${theme('palette.background.bot')};
    }
  }
  ${theme('overrides.chatInput.icon', '')}
`;

const ClearIcon: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = styled.button`
  position: absolute;
  background: none;
  border: none;
  border-radius: 50%;
  right: 0;
  flex: 0;
  cursor: pointer;
  height: 100%;
  width: calc(${theme('typography.fontSize')} * 3);
  & svg {
    stroke: ${theme('palette.background.bot')};
    fill: ${theme('palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 0;
    right: 0;

    &:hover,
    &:focus {
      stroke: ${theme('palette.text.bot')};
      fill: ${theme('palette.background.bot')};
    }
  }
  ${theme('overrides.chatInput.icon', '')}
`;

export interface ChatInputProps {
  disabled?: boolean;
  onSubmit: (message: string) => void;
  accessibility?: TockAccessibility;
  clearMessages: () => void;
}

const ChatInput: (props: ChatInputProps) => JSX.Element = ({
  disabled,
  onSubmit,
  accessibility,
  clearMessages,
}: ChatInputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <InputOuterContainer onSubmit={submit}>
      <Input
        disabled={disabled}
        className={disabled ? 'disabled-input' : undefined}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <SubmitIcon>
        <Send
          size="100%"
          role="img"
          aria-label={accessibility?.input?.sendButtonLabel || 'Send a message'}
          focusable="false"
        />
      </SubmitIcon>
      <ClearIcon>
        <Trash2
          size="25px"
          color={'white'}
          onClick={clearMessages}
          role="img"
          aria-label={
            accessibility?.input?.clearButtonLabel || 'Clear messages'
          }
          focusable="false"
        />
      </ClearIcon>
    </InputOuterContainer>
  );
};

export default ChatInput;
