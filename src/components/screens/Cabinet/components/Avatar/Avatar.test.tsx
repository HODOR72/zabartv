import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar.test.tsx', () => {
	test('tests', () => {
		render(<Avatar name="First Last" />);
		const element = screen.getByTestId('avatar');

		expect(element).toHaveTextContent('F');

		expect(element).toMatchSnapshot();
	});
});
