import { Link } from '@/UI/Link/Link';
import { NotFoundIcon } from '@/icons';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './NotFound.module.scss';
import { RoutesEnum } from '@/constants/routes';
import { useTranslation } from 'next-i18next';

export const NotFound = () => {
	const { t } = useTranslation();
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.image}>
					<NotFoundIcon />
				</div>
				<p className={styles.desc}>
					{t('Such a page exists or the address is entered incorrectly')}
				</p>
				<NextLink href={RoutesEnum.Home} passHref>
					<Link>{t('Go back to the main page')}</Link>
				</NextLink>
			</div>
		</section>
	);
};
