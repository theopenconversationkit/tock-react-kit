import styled from '@emotion/styled';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

const Wrapper = styled.div`
  position: relative;
  font-size: 16px;
  font-family: Segoe UI, Arial, Helvetica, sans-serif;
`;

addParameters({
  backgrounds: [{ name: 'default', value: '#e6e6e6', default: true }],
});
addDecorator(storyFn => <Wrapper>{storyFn()}</Wrapper>);

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
