import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  useState,
} from 'react';
import { Send, Trash2 } from 'react-feather';
import { prop } from 'styled-tools';
import TockAccessibility from 'TockAccessibility';

const InputOuterContainer: StyledComponent<DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>> = styled.form`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  width: 100%;
  position: relative;
  margin: 0.5em auto;
  display: flex;
  align-items: center;
  ${prop<any>('theme.overrides.chatInput.container', '')}
`;

const Input: StyledComponent<DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>> = styled.input`
  width: 100%;
  height: 2em;
  flex: 1;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  padding: 0.5em 3em 0.5em 1em;

  background: ${prop<any>('theme.palette.background.input')};
  color: ${prop<any>('theme.palette.text.input')};

  border: none;
  outline: none;

  font-family: inherit;
  font-size: inherit;

  &.disabled-input {
    background: ${prop<any>('theme.palette.background.inputDisabled')};
  }

  ${prop<any>('theme.overrides.chatInput.input', '')}
`;

const SubmitIcon: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = styled.button`
  position: absolute;
  background: none;
  border: none;
  border-radius: 50%;
  right: calc(${prop<any>('theme.typography.fontSize')} * 2);
  flex: 0;
  cursor: pointer;
  height: 100%;
  width: calc(${prop<any>('theme.typography.fontSize')} * 3);
  & svg {
    stroke: ${prop<any>('theme.palette.background.bot')};
    fill: ${prop<any>('theme.palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 0;
    right: 0;
    height: 80%;

    &:hover,
    &:focus {
      stroke: ${prop<any>('theme.palette.text.bot')};
      fill: ${prop<any>('theme.palette.background.bot')};
    }
  }
  ${prop<any>('theme.overrides.chatInput.icon', '')}
`;

const ClearIcon: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = styled.button`
  position: absolute;
  background: none;
  border: none;
  border-radius: 50%;
  right: 0;
  flex: 0;
  cursor: pointer;
  height: 100%;
  width: calc(${prop<any>('theme.typography.fontSize')} * 3);
  & svg {
    stroke: ${prop<any>('theme.palette.background.bot')};
    fill: ${prop<any>('theme.palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 0;
    right: 0;

    &:hover,
    &:focus {
      stroke: ${prop<any>('theme.palette.text.bot')};
      fill: ${prop<any>('theme.palette.background.bot')};
    }
  }
  ${prop<any>('theme.overrides.chatInput.icon', '')}
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
