import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ArrowIcon } from '@/icons';
import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import styles from './SliderButton.module.scss';
import classNames from 'classnames';

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	dir: 'left' | 'right';
}

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(
	({ dir, className }, ref) => {
		return (
			<ButtonBase
				className={classNames(
					styles.btn,
					dir === 'left' && styles.left,
					dir === 'right' && styles.right,
					className
				)}
				ref={ref}
			>
				<ArrowIcon />
			</ButtonBase>
		);
	}
);

SliderButton.displayName = 'SliderButton';
