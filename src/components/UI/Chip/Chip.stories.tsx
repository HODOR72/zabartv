import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chip } from './Chip';

export default {
	title: 'Chip',
	component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Example = Template.bind({});
Example.args = {
	children: 'Chip text',
};
