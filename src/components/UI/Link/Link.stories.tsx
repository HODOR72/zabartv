import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from './Link';
import NextLink from 'next/link';

export default {
	title: 'Link',
	component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => (
	<NextLink href="https://some-url.com" passHref>
		<Link {...args} />
	</NextLink>
);

export const Example = Template.bind({});
Example.args = {
	children: 'Link text',
};
