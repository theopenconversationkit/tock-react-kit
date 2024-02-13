import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { prop } from 'styled-tools';

const InputAutoCompletionContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = styled.ul`
  list-style: none;
  width: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  max-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  bottom: 2.3rem;
  left: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: ${prop<any>('theme.palette.background.input')};
  color: ${prop<any>('theme.palette.text.input')};
`;

const AutoHintItem: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 0.5em 1em;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: #d7d7d7;
  }
`;

const HintBold = styled.span<{ boldText?: boolean }>`
  font-weight: ${(props) => (props.boldText ? 'bold' : 'normal')};
`;

export interface InputAutoCompletionProps {
  provideHintList: string[] | null;
  minCharsHint: number | 0;
  inputValue: string;
  onSuggestionSelected: (suggestion: string) => void; // Callback to inform parent about selection
}

const highlightMatch = (suggestion: string, inputValue: string) => {
  const parts = suggestion.split(new RegExp(`(${inputValue})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === inputValue.toLowerCase() ? (
      <HintBold key={index} boldText={true}>
        {part}
      </HintBold>
    ) : (
      <HintBold key={index}>{part}</HintBold>
    ),
  );
};

const InputAutoCompletion: React.FC<InputAutoCompletionProps> = ({
  provideHintList,
  minCharsHint,
  inputValue,
  onSuggestionSelected,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (provideHintList && inputValue.length >= minCharsHint) {
      const newSuggestions = provideHintList.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, minCharsHint, provideHintList]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelected(suggestion);
  };

  return (
    <InputAutoCompletionContainer>
      {suggestions.map((suggestion, index) => (
        <AutoHintItem
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {highlightMatch(suggestion, inputValue)}
        </AutoHintItem>
      ))}
    </InputAutoCompletionContainer>
  );
};

export default InputAutoCompletion;
