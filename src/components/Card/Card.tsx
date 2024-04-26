import styled, { StyledComponent } from '@emotion/styled';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
} from 'react';
import { theme } from 'styled-tools';

import { Button as ButtonData } from '../../model/buttons';
import '../../styles/theme';
import UrlButton from '../buttons/UrlButton';
import PostBackButton from '../buttons/PostBackButton';
import { css, Interpolation, Theme } from '@emotion/react';
import {
  useImageRenderer,
  useTextRenderer,
} from '../../settings/RendererSettings';

export const CardOuter: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  max-width: ${theme('sizing.conversation.width')};
  margin: 0.5em auto;
  list-style: none;
`;

export const CardContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = styled.article`
  padding: 0.5em;
  background: ${theme('palette.background.card')};
  color: ${theme('palette.text.card')};
  border-radius: ${theme('sizing.borderRadius')};
  border: 2px solid ${theme('palette.text.card')};
  width: 20em;

  ${theme('overrides.card.cardContainer')};
`;

const CardTitle: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
> = styled.h3`
  margin: 0.5em 0;
  font-size: 1.5em;
  font-weight: bold;

  ${theme('overrides.card.cardTitle')};
`;

const CardSubTitle: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
> = styled.p`
  margin: 0.5em 0;
  font-size: 1em;
  font-weight: bold;

  ${theme('overrides.card.cardSubTitle')};
`;

const ButtonList: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = styled.ul`
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

const cardButtonBaseStyle = (theme: Theme) => css`
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

const cardImageCss: Interpolation<Theme> = [
  css`
    max-width: 100%;
    max-height: 100%;
  `,
  (theme) => theme.overrides?.card?.cardImage,
];

const urlButtonStyle: Interpolation<Theme> = [
  cardButtonBaseStyle,
  (theme) => theme.overrides?.buttons?.urlButton,
  (theme) => theme.overrides?.card?.cardButton,
];

const postBackButtonStyle: Interpolation<Theme> = [
  cardButtonBaseStyle,
  (theme) => theme.overrides?.buttons?.postbackButton,
  (theme) => theme.overrides?.card?.cardButton,
];

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

const Card = forwardRef<HTMLLIElement, CardProps>(function cardRender(
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
    | MutableRefObject<HTMLLIElement | null>
    | null,
) {
  const ImageRenderer = useImageRenderer('card');
  const HtmlRenderer = useTextRenderer('htmlPhrase');
  const renderButton = (button: ButtonData, index: number) => (
    // having the default index-based key is fine since we do not reorder buttons
    <li key={index}>
      {'url' in button ? (
        <UrlButton customStyle={urlButtonStyle} {...button} />
      ) : (
        <PostBackButton
          customStyle={postBackButtonStyle}
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
        {imageUrl && (
          <ImageRenderer
            src={imageUrl}
            alt={imageAlternative}
            css={cardImageCss}
          />
        )}
        <CardTitle>
          <HtmlRenderer text={title} />
        </CardTitle>
        {subTitle && (
          <CardSubTitle>
            <HtmlRenderer text={subTitle} />
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
