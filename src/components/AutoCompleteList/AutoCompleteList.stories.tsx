import React from 'react';
import { Story, Meta } from '@storybook/react';
import AutoCompleteList, { AutoCompleteListProps } from './AutoCompleteList';

export default {
    title: 'Components/AutoCompleteList',
    component: AutoCompleteList,
} as Meta;

const Template: Story<AutoCompleteListProps> = (args) => (
    <AutoCompleteList {...args} />
);

const suggestions = [
    "Semper quis lectus nulla at volutpat diam ut.",
    "Lacus sed viverra tellus in hac.",
    "Enim sed faucibus turpis in eu mi.",
    "Ac auctor augue mauris augue.",
    "Odio facilisis mauris sit amet.",
    "Rhoncus urna neque viverra justo.",
];

export const Default = Template.bind({});
Default.args = {
    suggestions,
    onItemClick: (suggestion: string) => {
        console.log(`Clicked on suggestion: ${suggestion}`);
    },
    inputValue: '',
};

export const WithInputValue = Template.bind({});
WithInputValue.args = {
    suggestions,
    onItemClick: (suggestion: string) => {
        console.log(`Clicked on suggestion: ${suggestion}`);
    },
    inputValue: 'lorem',
};
