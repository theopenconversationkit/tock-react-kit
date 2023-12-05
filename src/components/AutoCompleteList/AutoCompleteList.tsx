import styled, {StyledComponent} from '@emotion/styled';
import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {prop} from "styled-tools";

const AutoCompleteListContainer: StyledComponent<
    DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = styled.ul`
  list-style: none;
        width: 100%; 
        position:absolute;
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

const AutoCompleteItem: StyledComponent<
    DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 0.5em 1em;
  cursor: pointer;
  width: 100%; 
  &:hover {
    background: #D7D7D7;
  }
  .bold {
    font-weight: bold;
  }
`;
export interface AutoCompleteListProps {
    suggestions: string[];
    onItemClick: (suggestion: string) => void;
    inputValue: string;
}

const highlightMatch = (suggestion: string, inputValue: string) => {
    const parts = suggestion.split(new RegExp(`(${inputValue})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === inputValue.toLowerCase() ? (
            <span key={index} className="bold">
        {part}
      </span>
        ) : (
            <span key={index}>{part}</span>
        )
    );
};

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
   suggestions,
   onItemClick,
   inputValue
}) => (
    <AutoCompleteListContainer>
        {suggestions.map((suggestion, index) => (
            <AutoCompleteItem key={index} onClick={() => onItemClick(suggestion)}>
                {highlightMatch(suggestion, inputValue)}
            </AutoCompleteItem>
        ))}
    </AutoCompleteListContainer>
);

export default AutoCompleteList;
