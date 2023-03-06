import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './TextField.module.scss';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: 'dark';
	errorMessage?: string;
	error?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	({ className, errorMessage, error, variant, ...props }, ref) => {
		return (
			<>
				<input
					data-testid="input"
					ref={ref}
					className={classNames(
						styles.textField,
						variant === 'dark' && styles.dark,
						error && styles.error,
						className
					)}
					{...props}
				/>
				{errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
			</>
		);
	}
);

TextField.displayName = 'TextField';
