import { FC } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './Nav.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface NavProps {
	className?: string;
}

export const Nav: FC<NavProps> = ({ className }) => {
	const { navMenu } = useTypedSelector((state) => state.menu);

	return (
		<nav className={classNames(styles.nav, className)}>
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
	);
};
