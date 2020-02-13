import { storiesOf } from '@storybook/react';
import React from 'react';
import PostbackButtonList from './PostbackButtonList';
import PostbackButton from "../PostbackButton";

storiesOf('PostbackButton', module)
  .add('Single PB', () => (
    <PostbackButtonList>
      <PostbackButton>Postback Button</PostbackButton>
    </PostbackButtonList>
  ))
  .add('Multiple PBs', () => (
    <PostbackButtonList>
      <PostbackButton>Postback Button 1</PostbackButton>
      <PostbackButton>Postback Button 2</PostbackButton>
      <PostbackButton>Postback Button 3</PostbackButton>
      <PostbackButton>Postback Button 4</PostbackButton>
      <PostbackButton>Postback Button 5</PostbackButton>
    </PostbackButtonList>
  ));
