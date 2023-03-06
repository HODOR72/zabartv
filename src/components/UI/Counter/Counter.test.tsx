import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter.test.tsx', () => {
	const Wrapper = () => {
		return <Counter initialValue={60} />;
	};

	test('increment', () => {
		render(<Wrapper />);
		const element = screen.getByTestId('counter-increment');
		const value = screen.getByTestId('counter-value');

		fireEvent.click(element);

		expect(value).toHaveTextContent('120');

		expect(screen.getByTestId('counter')).toMatchSnapshot();
	});

	test('decrement', () => {
		render(<Wrapper />);
		const element = screen.getByTestId('counter-decrement');
		const value = screen.getByTestId('counter-value');

		fireEvent.click(element);

		expect(value).toHaveTextContent('60');

		expect(screen.getByTestId('counter')).toMatchSnapshot();
	});
});
