import { Link } from '@/UI/Link/Link';
import { NotFoundIcon } from '@/icons';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './NotFound.module.scss';
import { RoutesEnum } from '@/constants/routes';

export const NotFound = () => {
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.image}>
					<NotFoundIcon />
				</div>
				<p className={styles.desc}>Такой страницы существует или адрес введен не верно</p>
				<NextLink href={RoutesEnum.Home} passHref>
					<Link>Вернуться на главную</Link>
				</NextLink>
			</div>
		</section>
	);
};
