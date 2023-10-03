import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import { theme } from 'styled-tools';

import { Button as ButtonData } from '../../model/buttons';
import '../../styles/theme';
import UrlButton from '../buttons/UrlButton';
import PostBackButton from '../buttons/PostBackButton';
import { css, Theme } from '@emotion/react';

export const CardOuter: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>> = styled.li`
  max-width: ${theme('sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const CardContainer: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = styled.div`
  padding: 0.5em;
  background: ${theme('palette.background.card')};
  color: ${theme('palette.text.card')};
  border-radius: ${theme('sizing.borderRadius')};
  border: 2px solid ${theme('palette.text.card')};
  width: 20em;

  ${theme('overrides.card.cardContainer')};
`;

const CardTitle: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>> = styled.span`
  margin: 0.5em 0;
  font-size: 1.5em;
  font-weight: bold;
  display: block;

  ${theme('overrides.card.cardTitle')};
`;

const CardSubTitle: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>> = styled.span`
  margin: 0.5em 0;
  font-size: 1em;
  font-weight: bold;
  display: block;

  ${theme('overrides.card.cardSubTitle')};
`;

const CardImage: StyledComponent<DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = styled.img`
  max-width: 100%;
  max-height: 100%;

  ${theme('overrides.card.cardImage')};
`;

const ButtonList: StyledComponent<DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>> = styled.ul`
  margin: 0.5em 0;
  list-style: none;
  padding: 0.5em 0;

  ${theme('overrides.buttons.buttonList')};
  ${theme('overrides.card.buttonList')};

  & > li {
    padding: 0;
    margin: 0 0.5em;
    display: inline-block;

    ${theme('overrides.buttons.buttonContainer')};
    ${theme('overrides.card.buttonContainer')};
  }
`;

const cardButtonBaseStyle = ({ theme }: { theme: Theme }) => css`
  border: 2px solid ${theme.palette.text.card};
  border-radius: ${theme.sizing.borderRadius};

  color: ${theme.palette.text.card};

  &:hover,
  &:focus,
  &:active {
    color: ${theme.palette.background.card};
    background: ${theme.palette.text.card};
  }

  margin: 0.25em 0;
`;

export interface CardProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
  imageAlternative?: string;
  buttons?: ButtonData[];
  roleDescription?: string;
  isHidden?: boolean;
  onAction: (button: ButtonData) => void;
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
  const renderButton = (button: ButtonData, index: number) => (
    // having the default index-based key is fine since we do not reorder buttons
    <li key={index}>
      {'url' in button ? (
        <UrlButton
          customStyle={[
            cardButtonBaseStyle,
            theme('overrides.buttons.urlButton'),
            theme('overrides.card.cardButton'),
          ]}
          {...button}
        />
      ) : (
        <PostBackButton
          customStyle={[
            cardButtonBaseStyle,
            theme('overrides.buttons.postbackButton'),
            theme('overrides.card.cardButton'),
          ]}
          onClick={onAction.bind(null, button)}
          onKeyPress={onAction.bind(null, button)}
          {...button}
          {...(isHidden && { tabIndex: -1 })}
        />
      )}
    </li>
  );
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
          <ButtonList role="group">{buttons.map(renderButton)}</ButtonList>
        )}
      </CardContainer>
    </CardOuter>
  );
});

export default Card;
