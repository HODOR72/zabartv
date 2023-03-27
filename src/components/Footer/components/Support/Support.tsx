import styles from './Support.module.scss';
import { Title } from '@/UI/Title/Title';
import { TelegramIcon } from '@/icons';
import { useTranslation } from 'next-i18next';
import axios from '@/utils/axios';
import { useEffect, useState } from 'react';

export const Support = () => {
	const { t } = useTranslation();
	const [data, setData]: any = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			let { data } = await axios({
				url: `contactsdata/list`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'get',
			});
			setData(data);
		};
		fetchData();
	}, []);

	return (
		<div className={styles.item}>
			<Title className={styles.title} level="h2" size="small">
				{t('support_title')}
			</Title>
			<p className={styles.desc}>
				{t('We are always ready to help you. Our operators are online 24/7')}
			</p>
			<a href={data[2]?.content.link_value} className={styles.link}>
				{t('WRITE TO SUPPORT')}
				<TelegramIcon />
			</a>
		</div>
	);
};
