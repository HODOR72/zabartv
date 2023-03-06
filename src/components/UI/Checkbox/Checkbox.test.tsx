import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox.test.tsx', () => {
	test('if checked', () => {
		render(<Checkbox data-testid="checkbox-input" />);
		const element = screen.getByTestId('checkbox-input');

		expect(element).not.toBeChecked();

		fireEvent.click(element);
		expect(element).toBeChecked();

		expect(element).toMatchSnapshot();
	});
});
