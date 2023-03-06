import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './Tabs';

export default {
	title: 'Tabs',
	component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = () => (
	<div style={{ padding: '10px' }}>
		<Tabs tabs={tabs} />
	</div>
);

const tabs = [
	{ txt: 'Tab 1', content: <div>Content 1</div> },
	{ txt: 'Tab 2', content: <div>Content 2</div> },
	{ txt: 'Tab 3', content: <div>Content 3</div> },
];

export const Example = Template.bind({});
