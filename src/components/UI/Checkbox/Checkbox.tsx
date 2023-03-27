import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ label, className, ...props }) => {
	return (
		<label className={classNames(styles.checkbox, className)}>
			<input className={styles.input} type="checkbox" {...props} />
			<span className={styles.switch} />
			{label && <span className={styles.label}>{label}</span>}
		</label>
	);
};
