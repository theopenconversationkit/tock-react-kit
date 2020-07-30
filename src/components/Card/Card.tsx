import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react';
import TockTheme from 'styles/theme';
import { prop } from 'styled-tools';

import { Button } from '../../TockContext';

export const CardOuter: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme> = styled.div`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;

export const CardContainer: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {},
  TockTheme> = styled.div`
  padding: 0.5em;
  background: ${prop<any>('theme.palette.background.card')};
  color: ${prop<any>('theme.palette.text.card')};
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border: 2px solid ${prop<any>('theme.palette.text.card')};
  width: 20em;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

const CardTitle: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  {},
  TockTheme> = styled.h3`
  margin: 0.5em 0;
  font-size: 1.5em;
  
  ${prop<any>('theme.overrides.card.cardTitle', '')};
`;

const CardSubTitle: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  {},
  TockTheme> = styled.h4`
  margin: 0.5em 0;
  font-size: 1em;
  
  ${prop<any>('theme.overrides.card.cardSubTitle', '')};
`;

const CardImage: StyledComponent<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  {},
  TockTheme> = styled.img`
  max-width: 100%;
  max-height: 100%;
  
  ${prop<any>('theme.overrides.card.cardImage', '')};
`;

const ButtonList: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  {},
  TockTheme> = styled.ul`
  margin: 0.5em 0;
  list-style: none;
  padding: 0.5em 0;
  
  ${prop<any>('theme.overrides.card.buttonList', '')};

  & > li {
    padding: 0;
    margin: 0 0.5em;
    display: inline-block;

    ${prop<any>('theme.overrides.card.buttonContainer', '')};
  }
`;

const Button: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  {},
  TockTheme> = styled.button`
  background: none;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  color: ${prop<any>('theme.palette.text.card')};
  border: 2px solid ${prop<any>('theme.palette.text.card')};
  padding: 0.5em 1em;
  cursor: pointer;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  font-family: inherit;
  font-size: inherit;

  &:hover,
  &:focus,
  &:active {
    color: ${prop<any>('theme.palette.background.card')};
    background: ${prop<any>('theme.palette.text.card')};
  }
  
  ${prop<any>('theme.overrides.card.cardButton', '')};
`;

export interface CardProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
  buttons?: Button[];
  sendAction: (button: Button) => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    title,
    subTitle,
    imageUrl,
    buttons,
    sendAction
}, ref) => (
    <CardOuter ref={ref}>
        <CardContainer>
          {imageUrl && (
            <CardImage src={imageUrl} alt={title} />
          )}
          <CardTitle>{title}</CardTitle>
          {subTitle && (
            <CardSubTitle>
              <div dangerouslySetInnerHTML={{ __html: subTitle }} />
            </CardSubTitle>
          )}
          {Array.isArray(buttons) && buttons.length > 0 && (
            <ButtonList>
              {buttons.map((button, index) => (
                <li key={index}>
                  <Button
                    onClick={sendAction.bind(null, button)}
                    onKeyPress={sendAction.bind(null, button)}
                  >
                    {button.label}
                  </Button>
                </li>
              ))}
            </ButtonList>
          )}
        </CardContainer>
    </CardOuter>
));

export default Card;
