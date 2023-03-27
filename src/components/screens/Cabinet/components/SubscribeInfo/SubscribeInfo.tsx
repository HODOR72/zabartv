import { Link } from '@/UI/Link/Link';
import { Title } from '@/UI/Title/Title';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styles from './SubscribeInfo.module.scss';

interface SubscribeInfoProps {
	info: any;
}

export const SubscribeInfo: FC<SubscribeInfoProps> = ({ info }) => {
	const { title, price, desc } = info;
	const { t } = useTranslation();
	return (
		<div className={styles.card}>
			<Title level="h2" size="medium" className={styles.title}>
				{title}
				<span>&nbsp;{price}</span>
			</Title>
			<p className={styles.desc}>{desc}</p>
			<Link as="button" className={styles.btn}>
				{t('Renew your subscription')}
			</Link>
		</div>
	);
};
