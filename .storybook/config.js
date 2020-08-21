import { addParameters, configure, addDecorator } from '@storybook/react';
import themeDecorator from './decorators/themeDecorator';
import tockContextDecorator from './decorators/tockContextDecorator';

addParameters({
  backgrounds: [{ name: 'default', value: '#e6e6e6', default: true }],
});
addDecorator(themeDecorator);
addDecorator(tockContextDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys()
    .forEach(filename => req(filename));
}

configure(loadStories, module);
