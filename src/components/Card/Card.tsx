import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import TockTheme from 'styles/theme';
import { prop } from 'styled-tools';

import { Button } from '../../TockContext';

export const CardOuter: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  unknown,
  TockTheme
> = styled.li`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const CardContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  padding: 0.5em;
  background: ${prop<any>('theme.palette.background.card')};
  color: ${prop<any>('theme.palette.text.card')};
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border: 2px solid ${prop<any>('theme.palette.text.card')};
  width: 20em;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

const CardTitle: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
  unknown,
  TockTheme
> = styled.span`
  margin: 0.5em 0;
  font-size: 1.5em;
  font-weight: bold;
  display: block;

  ${prop<any>('theme.overrides.card.cardTitle', '')};
`;

const CardSubTitle: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
  unknown,
  TockTheme
> = styled.span`
  margin: 0.5em 0;
  font-size: 1em;
  font-weight: bold;
  display: block;

  ${prop<any>('theme.overrides.card.cardSubTitle', '')};
`;

const CardImage: StyledComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  unknown,
  TockTheme
> = styled.img`
  max-width: 100%;
  max-height: 100%;

  ${prop<any>('theme.overrides.card.cardImage', '')};
`;

const ButtonList: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  unknown,
  TockTheme
> = styled.ul`
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

const Button: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  unknown,
  TockTheme
> = styled.button`
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
  roleDescription?: string;
  onAction: (button: Button) => void;
}

const Card = React.forwardRef<HTMLLIElement, CardProps>(function cardRender(
  { title, subTitle, imageUrl, buttons, roleDescription, onAction }: CardProps,
  ref,
) {
  return (
    <CardOuter
      ref={ref}
      role={ref == undefined ? undefined : 'group'}
      aria-roledescription={
        ref == undefined
          ? undefined
          : roleDescription
          ? roleDescription
          : 'Slide'
      }
    >
      <CardContainer>
        {imageUrl && <CardImage src={imageUrl} alt={title} />}
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
                  onClick={onAction.bind(null, button)}
                  onKeyPress={onAction.bind(null, button)}
                >
                  {button.label}
                </Button>
              </li>
            ))}
          </ButtonList>
        )}
      </CardContainer>
    </CardOuter>
  );
});

export default Card;
