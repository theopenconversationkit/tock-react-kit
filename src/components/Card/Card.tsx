import styled, {StyledComponent} from '@emotion/styled';
import {invert, readableColor} from 'polished';
import React, {DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes} from 'react';
import TockTheme from 'TockTheme';
import {Button} from "../../TockContext";

const CardOuter: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    {},
    TockTheme> = styled.div`
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
`;

const CardContainer: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    {},
    TockTheme> = styled.div`
  padding: 0.5em;
  background: ${props => (props.theme && props.theme.cardColor) || 'white'};
  color: ${props => readableColor((props.theme && props.theme.cardColor) || 'white')};
  border-radius: ${props => (props.theme && props.theme.borderRadius) || '1em'};
  border: 2px solid ${props => readableColor((props.theme && props.theme.cardColor) || 'white')};
  width: 20em;

  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.cardContainer) || ''}
`;

const CardTitle: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    {},
    TockTheme> = styled.h3`
  margin: 0.5em 0;

  font-size: 1.5em;
  
  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.cardTitle) || ''};
`;

const CardSubTitle: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    {},
    TockTheme> = styled.h4`
  margin: 0.5em 0;

  font-size: 1em;
  
  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.cardSubTitle) || ''};
`;

const CardImage: StyledComponent<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    {},
    TockTheme> = styled.img`
  max-width: 100%;
  max-height: 100%;
  
  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.cardImage) || ''}
`;

const ButtonList: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    {},
    TockTheme> = styled.ul`
  margin: 0.5em 0;
  list-style: none;
  padding: 0.5em 0;
  
  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.buttonList) || ''}

  & > li {
    padding: 0;
    margin: 0 0.5em;
    display: inline-block;
    
    ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.buttonContainer) || ''}
  }
`;

const Button: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    {},
    TockTheme> = styled.button`
  background: none;
  border-radius: ${props => (props.theme && props.theme.borderRadius) || '1em'};
  color: ${props => readableColor((props.theme && props.theme.cardColor) || 'white')};
  border: 2px solid ${props => readableColor((props.theme && props.theme.cardColor) || 'white')};
  padding: 0.5em 1em;
  cursor: pointer;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  font-family: inherit;
  font-size: inherit;

  &:hover,
  &:focus,
  &:active {
    color: ${props => invert(readableColor((props.theme && props.theme.cardColor) || 'white'))};
    background: ${props => invert((props.theme && props.theme.cardColor) || 'white')};
  }
  
  ${props => (props.theme && props.theme.styles && props.theme.styles.card && props.theme.styles.card.cardButton) || ''}
`;

export interface CardProps {
    title: string;
    subTitle?: string;
    imageUrl?: string;
    buttons?: Button[];
    sendAction: (button: Button) => void;
}

const Card: (props: CardProps) => JSX.Element = ({
                                                     title,
                                                     subTitle,
                                                     imageUrl,
                                                     buttons,
                                                     sendAction
                                                 }: CardProps) => (
    <CardOuter>
        <CardContainer>
            {imageUrl ? <CardImage src={imageUrl} alt={title}/> : null}
            <CardTitle>{title}</CardTitle>
            {subTitle ? <CardSubTitle>
                <div dangerouslySetInnerHTML={{__html: subTitle}}/>
            </CardSubTitle> : null}
            {Array.isArray(buttons) && buttons.length > 0 ? (
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
            ) : null}
        </CardContainer>
    </CardOuter>
);

export default Card;
