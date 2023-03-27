import { FC } from 'react';
import { Nav, ThemeToggle, Lang, Search, Menu, Burger, Modals } from './components/index';
import { SubscribeButton } from '@/UI/SubscribeButton/SubscribeButton';
import { LogoIcon } from '@/icons';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import NextLink from 'next/link';
import styles from './Header.module.scss';

interface HeaderProps {
	absoluteHeader?: boolean;
	blurHeader?: boolean;
	variant?: 'absolute' | 'blur';
}

export const HeaderActions = dynamic(
	() => import('./components/Actions/Actions').then((mod) => mod.Actions),
	{
		ssr: false,
	}
);

export const Header: FC<HeaderProps> = ({ variant }) => {
	return (
		<header
			className={classNames(
				styles.header,
				variant === 'absolute' && styles.absolute,
				variant === 'blur' && styles.blur
			)}
		>
			<div className={classNames('container', styles.container)}>
				<NextLink href="/">
					<a className={styles.logo}>
						<LogoIcon />
					</a>
				</NextLink>
				<Nav className={styles.nav} />
				<div className={styles.right}>
					<HeaderActions />
					<Search className={styles.search} />
					<SubscribeButton className={styles.mobHidden} />
					<Burger />
				</div>
				<Lang className={styles.mobHidden} />
				<ThemeToggle className={styles.mobHidden} />
			</div>
			<Menu />
			<Modals />
		</header>
	);
};
