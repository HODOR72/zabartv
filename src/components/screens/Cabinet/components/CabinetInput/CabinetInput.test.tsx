import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { CabinetInput } from './CabinetInput';

describe('CabinetInput.tsx', () => {
	const Input = () => {
		const [value, setValue] = useState<string>('aassmoilov@gmail.com');

		return (
			<CabinetInput label="Электронная почта" type="email" value={value} applyChanges={setValue} />
		);
	};

	const MaskInput = () => {
		const [value, setValue] = useState<string>('');

		return (
			<CabinetInput mask='00.00.0000' label="Дата рождения" type="text" value={value} applyChanges={setValue} />
		);
	}

	test('tests', () => {
		render(<Input />);
		const item = screen.getByTestId('cabinet-input');
		const button = screen.getByTestId('cabinet-input-button');
		const input = screen.getByTestId('cabinet-input');

		expect(input).not.toHaveFocus();

		fireEvent.click(button);

		expect(input).toHaveFocus();

		expect(item).toMatchSnapshot();
	});

	test('test input with mask', () => {
		render(<MaskInput />);
		const button = screen.getByTestId('cabinet-input-button');

		const maskInput: HTMLInputElement = screen.getByTestId('cabinet-input-mask');

		expect(maskInput).not.toHaveFocus();

		fireEvent.click(button);

		expect(maskInput).toHaveFocus();

		fireEvent.input(maskInput, {target: {value: '19021998'}})

		expect(maskInput.value).toBe('19.02.1998')
	})
});
