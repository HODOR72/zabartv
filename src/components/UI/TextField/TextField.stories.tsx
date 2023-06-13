import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from './TextField';

export default {
	title: 'TextField',
	component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const White = Template.bind({});
White.args = {
	placeholder: 'Some placeholder',
};

export const Dark = Template.bind({});
Dark.args = {
	placeholder: 'Some placeholder',
	variant: 'dark',
};
