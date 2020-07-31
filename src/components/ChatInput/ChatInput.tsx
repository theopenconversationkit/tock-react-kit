import styled, { StyledComponent } from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import React, {
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  useState,
} from 'react';
import { Send } from 'react-feather';
import TockTheme from 'styles/theme';
import { prop } from 'styled-tools';

const InputOuterContainer: StyledComponent<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  {},
  TockTheme
> = styled.form`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  width: 100%;
  position: relative;
  margin: 0.5em auto;
  display: flex;
  align-items: center;
  ${prop<any>('theme.overrides.chatInput.container', '')}
`;

const Input: StyledComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  {},
  TockTheme
> = styled.input`
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

const Icon: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  {},
  TockTheme
> = styled.button`
  position: absolute;
  background: none;
  border: none;
  border-radius: 50%;
  right: 5px;
  flex: 0;
  cursor: pointer;

  & svg {
    stroke: ${prop<any>('theme.palette.background.bot')};
    fill: ${prop<any>('theme.palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 3px;
    right: 2px;

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
}

const ChatInput: (props: ChatInputProps) => JSX.Element = ({
  disabled,
  onSubmit,
}: ChatInputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const theme: TockTheme = useTheme();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <InputOuterContainer onSubmit={submit}>
      <Input disabled={disabled} className={disabled? 'disabled-input':undefined} value={value} onChange={({ target: { value } }) => setValue(value)} />
      <Icon>
        <Send size={`calc(${theme.typography.fontSize} * 2)`} />
      </Icon>
    </InputOuterContainer>
  );
};

export default ChatInput;
