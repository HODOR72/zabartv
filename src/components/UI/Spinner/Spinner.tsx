import classNames from 'classnames';
import { FC } from 'react';
import styles from './Spinner.module.scss';

export enum SpinnerSizes {
	small = '32px',
	medium = '48px',
	large = '60px',
}

interface SpinnerProps {
	size?: SpinnerSizes;
}

export const Spinner: FC<SpinnerProps> = ({ size = SpinnerSizes.medium }) => {
	return (
		<svg className={styles.spinner} height={size} width={size} viewBox="0 0 16 16" fill="none">
			<circle
				cx="8"
				cy="8"
				r="7"
				stroke="currentColor"
				strokeOpacity="0.20"
				strokeWidth="4"
				vectorEffect="non-scaling-stroke"
			/>
			<path
				d="M15 8a7.002 7.002 0 00-7-7"
				stroke="var(--color-primary)"
				strokeWidth="4"
				strokeLinecap="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
};
