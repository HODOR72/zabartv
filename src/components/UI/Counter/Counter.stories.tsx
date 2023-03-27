import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Counter } from './Counter';

export default {
	title: 'Counter',
	component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => <Counter {...args} />;

export const Example = Template.bind({});
Example.args = {
	initialValue: 30,
	caption: 'Days',
};
