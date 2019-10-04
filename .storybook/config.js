import { addParameters, configure } from '@storybook/react';

addParameters({
  backgrounds: [{ name: 'default', value: '#e6e6e6', default: true }],
});

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
