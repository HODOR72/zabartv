import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './Counter.module.scss';

interface CounterProps {
	initialValue: number;
	caption?: string;
	className?: string;
}

export const Counter: FC<CounterProps> = ({ initialValue, caption, className }) => {
	const [value, setValue] = useState<number>(initialValue);

	useEffect(() => {
		localStorage.setItem('counter', String(value));
	}, [value]);

	const handleDecrement = () => setValue(value - initialValue);
	const handleIncrement = () => setValue(value + initialValue);

	return (
		<div data-testid="counter" className={classNames(styles.counter, className)}>
			<ButtonBase
				data-testid="counter-decrement"
				onClick={handleDecrement}
				className={styles.decrement}
				aria-label="Минус"
				disabled={value === initialValue}
			/>
			<span data-testid="counter-value" className={styles.value}>
				{value} {caption}
			</span>
			<ButtonBase
				data-testid="counter-increment"
				onClick={handleIncrement}
				className={styles.increment}
				aria-label="Плюс"
			/>
		</div>
	);
};
