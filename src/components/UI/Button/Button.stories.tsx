import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Button text',
};

export const Stroke = Template.bind({});
Stroke.args = {
	children: 'Button text',
	variant: 'stroke',
};

export const Dark = Template.bind({});
Dark.args = {
	children: 'Button text',
	variant: 'dark',
};

export const Gradient = Template.bind({});
Gradient.args = {
	children: 'Button text',
	variant: 'gradient',
};

export const White = Template.bind({});
White.args = {
	children: 'Button text',
	variant: 'white',
};
