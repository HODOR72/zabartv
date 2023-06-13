import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SliderButton } from './SliderButton';

export default {
	title: 'SliderButtons',
	component: SliderButton,
} as ComponentMeta<typeof SliderButton>;

const Template: ComponentStory<typeof SliderButton> = () => {
	const style = {
		display: 'grid',
		width: 'fit-content',
		gap: '20px',
		gridTemplateColumns: '1fr 1fr',
	};

	return (
		<div style={style}>
			<SliderButton dir="left" />
			<SliderButton dir="right" />
		</div>
	);
};

export const Default = Template.bind({});
