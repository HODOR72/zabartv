import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from './Title';

export default {
	title: 'Title',
	component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
	<div style={{ display: 'grid', gap: 10 }}>
		<Title level="h1" size="large">
			H1 Title
		</Title>
		<Title level="h3" size="medium">
			H3 Title
		</Title>
		<Title level="h5" size="small">
			H5 Title
		</Title>
	</div>
);

export const Example = Template.bind({});
