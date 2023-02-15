import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import { prop } from 'styled-tools';

import { Button } from '../../TockContext';
import 'styles/theme';

export const CardOuter: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>> = styled.li`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const CardContainer: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = styled.div`
  padding: 0.5em;
  background: ${prop<any>('theme.palette.background.card')};
  color: ${prop<any>('theme.palette.text.card')};
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border: 2px solid ${prop<any>('theme.palette.text.card')};
  width: 20em;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

const CardTitle: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>> = styled.span`
  margin: 0.5em 0;
  font-size: 1.5em;
  font-weight: bold;
  display: block;

  ${prop<any>('theme.overrides.card.cardTitle', '')};
`;

const CardSubTitle: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>> = styled.span`
  margin: 0.5em 0;
  font-size: 1em;
  font-weight: bold;
  display: block;

  ${prop<any>('theme.overrides.card.cardSubTitle', '')};
`;

const CardImage: StyledComponent<DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = styled.img`
  max-width: 100%;
  max-height: 100%;

  ${prop<any>('theme.overrides.card.cardImage', '')};
`;

const ButtonList: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>> = styled.ul`
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

const Button: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = styled.button`
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
  imageAlternative?: string;
  buttons?: Button[];
  roleDescription?: string;
  isHidden?: boolean;
  onAction: (button: Button) => void;
}

const Card = React.forwardRef<HTMLLIElement, CardProps>(function cardRender(
  {
    title,
    subTitle,
    imageUrl,
    imageAlternative,
    buttons,
    roleDescription,
    isHidden = false,
    onAction,
  }: CardProps,
  ref:
    | ((instance: HTMLLIElement | null) => void)
    | React.MutableRefObject<HTMLLIElement | null>
    | null,
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
      <CardContainer aria-hidden={isHidden}>
        {imageUrl && <CardImage src={imageUrl} alt={imageAlternative} />}
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
                  {...(isHidden && { tabIndex: -1 })}
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
