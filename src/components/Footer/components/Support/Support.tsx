import styles from './Support.module.scss';
import { Title } from '@/UI/Title/Title';
import { TelegramIcon } from '@/icons';
import { useTranslation } from 'next-i18next';
import axios from '@/utils/axios';
import { useEffect, useState } from 'react';

export const Support = () => {
	const { t } = useTranslation();
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('contactsdata/list', {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});

				if (response) {
					setData(response?.data);
				}
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		};

		fetchData();
	}, []);

	if (!data || !Array.isArray(data) || data.length < 3) return null;

	return (
		<div className={styles.item}>
			<Title className={styles.title} level="h2" size="small">
				{t('support_title')}
			</Title>
			<p className={styles.desc}>
				{t('We are always ready to help you. Our operators are online 24/7')}
			</p>
			{/* @ts-ignore */}
			<a href={data[2]?.content?.link_value} className={styles.link}>
				{t('WRITE TO SUPPORT')}
				<TelegramIcon />
			</a>
		</div>
	);
};
