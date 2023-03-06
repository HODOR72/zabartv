import classNames from 'classnames';
import styles from './Social.module.scss';
import { YoutubeIcon, InstagramIcon } from '@/icons';

export const Social = () => {
	const items = [
		{ href: '#', icon: <YoutubeIcon /> },
		{ href: '#', icon: <InstagramIcon /> },
	];

	return (
		<ul className={classNames('list-reset', styles.list)}>
			{items.map((el, idx) => (
				<li key={idx} className={styles.item}>
					<a href={el.href} className={styles.link}>
						{el.icon}
					</a>
				</li>
			))}
		</ul>
	);
};
