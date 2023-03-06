import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from 'next-themes';

export default {
	title: 'ThemeToggle',
	component: ThemeToggle,
} as ComponentMeta<typeof ThemeToggle>;

const Template: ComponentStory<typeof ThemeToggle> = () => (
    <ThemeProvider enableSystem={false} defaultTheme="dark">
        <ThemeToggle />
    </ThemeProvider>
);

export const Default = Template.bind({});