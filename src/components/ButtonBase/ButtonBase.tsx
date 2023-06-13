import { ReactNode, ButtonHTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './ButtonBase.module.scss';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
}

export const ButtonBase = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonBaseProps>>(
	({ children, className, icon, ...props }, ref) => {
		return (
			<button ref={ref} className={classNames(styles.btn, className)} {...props}>
				{icon && <span className={styles.icon}>{icon}</span>}
				{children}
			</button>
		);
	}
);

ButtonBase.displayName = 'ButtonBase';
