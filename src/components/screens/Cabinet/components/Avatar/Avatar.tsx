import { FC } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
	name: string | undefined;
}

export const Avatar: FC<AvatarProps> = ({ name }) => {
	const letter = name ? name[0] : null;

	return (
		<div data-testid="avatar" className={styles.avatar}>
			{letter}
		</div>
	);
};
