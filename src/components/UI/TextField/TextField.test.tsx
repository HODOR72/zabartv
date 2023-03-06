import { TextField } from './TextField';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TextField.test.tsx', () => {
	test('tests', () => {
		render(<TextField />);
		const element = screen.getByTestId('input');
		expect(element).toBeInTheDocument();
		expect(element).toHaveValue('');
		fireEvent.input(element, {
			target: { value: 'Some text' },
		});
		expect(element).toHaveValue('Some text');
		expect(element.tagName).toEqual('INPUT');
		expect(element).toMatchSnapshot();
	});
});
