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
import TockTheme from 'TockTheme';
import { invert, readableColor } from 'polished';

const pxValueRegexp: RegExp = /^(\d+)px$/;

const InputOuterContainer: StyledComponent<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  {},
  TockTheme
> = styled.form`
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  width: 100%;
  position: relative;
  margin: 0.5em auto;
  display: flex;
  align-items: center;
`;

const Input: StyledComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  {},
  TockTheme
> = styled.input`
  width: 100%;
  height: 2em;
  border-radius: ${props => (props.theme && props.theme.borderRadius) || '1em'};
  padding: 0.5em 3em 0.5em 1em;

  background: ${props => (props.theme && props.theme.inputColor) || 'white'};
  color: ${props => readableColor((props.theme && props.theme.inputColor) || 'white')};

  border: none;
  outline: none;

  font-family: inherit;
  font-size: inherit;
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

  cursor: pointer;

  & svg {
    stroke: ${props => (props.theme && props.theme.botColor) || 'black'};
    fill: ${props => (props.theme && props.theme.userColor) || 'white'};
  }

  & > svg {
    position: relative;
    top: 3px;
    right: 2px;

    &:hover,
    &:focus {
      stroke: ${props => invert((props.theme && props.theme.botColor) || 'black')};
      fill: ${props => invert((props.theme && props.theme.userColor) || 'white')};
    }
  }
`;

export interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: (props: ChatInputProps) => JSX.Element = ({
  onSubmit,
}: ChatInputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const theme: TockTheme = useTheme();
  const fontSize: number =
    theme.fontSize && pxValueRegexp.test(theme.fontSize)
      ? parseInt(pxValueRegexp.exec(theme.fontSize)![0], 10)
      : 16;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <InputOuterContainer onSubmit={submit}>
      <Input value={value} onChange={({ target: { value } }) => setValue(value)} />
      <Icon>
        <Send size={fontSize * 2} />
      </Icon>
    </InputOuterContainer>
  );
};

export default ChatInput;
