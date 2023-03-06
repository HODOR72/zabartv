import { FC, HTMLProps, PropsWithChildren } from 'react';
import styles from './Title.module.scss';
import classNames from 'classnames';

export interface TitleProps extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
	className?: string;
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: 'small' | 'large' | 'medium';
}

export const Title: FC<PropsWithChildren<TitleProps>> = ({
	className,
	size = 'large',
	level: Level = 'h1',
	children,
	...props
}) => {
	return (
		<Level
			className={classNames(
				styles.title,
				size === 'medium' && styles.medium,
				size === 'large' && styles.large,
				size === 'small' && styles.small,
				className
			)}
			{...props}
		>
			{children}
		</Level>
	);
};
