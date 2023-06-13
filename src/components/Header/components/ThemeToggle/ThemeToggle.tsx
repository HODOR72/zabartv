import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@/icons';
import { FC } from 'react';
import classNames from 'classnames';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
	className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => (theme === 'dark' ? setTheme('light') : setTheme('dark'));

	return (
		<ButtonBase onClick={toggleTheme} className={classNames(styles.btn, className)}>
			<span className={styles.icon}>
				<MoonIcon />
			</span>
			<span className={styles.icon}>
				<SunIcon />
			</span>
		</ButtonBase>
	);
};
