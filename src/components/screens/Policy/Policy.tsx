import { Title } from '@/UI/Title/Title';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from './Policy.module.scss';

export const Policy = () => {
	const { t } = useTranslation();
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.content}>
					<Title className={styles.title}>{t('Privacy Policy')}</Title>
					<div className={styles.desc}>
						<p>{t('1-privacy')}</p>
						<p>{t('2-privacy')}</p>
						<p>{t('3-privacy')}</p>
					</div>
					<Title level="h2" size="small" className={styles.subtitle}>
						{t('4-privacy')}
					</Title>
					<div className={styles.desc}>
						<p>{t('5-privacy')}</p>
						<p>{t('6-privacy')}</p>
						<p>{t('7-privacy')}</p>
						<p>{t('8-privacy')}</p>
						<p>{t('9-privacy')}</p>
						<p>{t('10-privacy')}</p>
						<p>{t('11-privacy')}</p>
						<p>{t('12-privacy')}</p>
					</div>
				</div>
			</div>
		</section>
	);
};
