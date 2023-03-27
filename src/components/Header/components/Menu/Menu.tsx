import { CSSProperties } from 'react';
import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { CloseIcon } from '@/icons';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useLockedBody } from 'usehooks-ts';
import { RoutesEnum } from '@/constants/routes';
import { SubscribeButton } from '@/UI/SubscribeButton/SubscribeButton';
import NextLink from 'next/link';
import { ThemeToggle, Lang } from '../index';
import classNames from 'classnames';
import styles from './Menu.module.scss';

export const Menu = () => {
	const { isOpened, navMenu } = useTypedSelector((state) => state.menu);
	const { showMenu } = useTypedActions((state) => state.menu);
	const { height } = useWindowSize();

	const handleClose = () => showMenu(false);

	useLockedBody(isOpened);

	return (
		<div
			style={{ '--vh': `${height}px` } as CSSProperties}
			className={classNames(styles.menu, isOpened && styles.opened)}
		>
			<div className={styles.container}>
				<div className={styles.top}>
					<ThemeToggle className={styles.toggle} />
					<Lang />
					<ButtonBase onClick={handleClose} className={styles.close}>
						<CloseIcon />
					</ButtonBase>
				</div>
				<nav className={styles.nav}>
					<ul className={classNames('list-reset', styles.list)}>
						{navMenu?.map((item) => {
							const { content, id, slug } = item;

							return (
								<li key={id} className={styles.item}>
									<NextLink href={`/${slug}`}>
										<a className={styles.link}>{content.title_in_nav}</a>
									</NextLink>
								</li>
							);
						})}
					</ul>
				</nav>
				<SubscribeButton className={styles.btn} />
			</div>
		</div>
	);
};
