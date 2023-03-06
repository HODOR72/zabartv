import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CabinetInput } from './CabinetInput';

export default {
	title: 'CabinetInput',
	component: CabinetInput,
} as ComponentMeta<typeof CabinetInput>;

const DefaultInput: ComponentStory<typeof CabinetInput> = () => {
	const [value, setValue] = useState<string>('aassmoilov@gmail.com');

	return (
		<div style={{ width: '350px' }}>
			<CabinetInput label="Email" placeholder={value} type="email" value={value} applyChanges={setValue} />
		</div>
	);
};

export const Input = DefaultInput.bind({});

const MaskInput: ComponentStory<typeof CabinetInput> = () => {
	const [value, setValue] = useState<string>('11.11.1111');

	return (
		<div style={{ width: '350px' }}>
			<CabinetInput mask='00.00.0000' label="Дата рождения" placeholder={value} value={value} applyChanges={setValue} />
		</div>
	);
};

export const InputWithMask = MaskInput.bind({});
