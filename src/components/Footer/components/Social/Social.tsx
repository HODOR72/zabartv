import classNames from 'classnames';
import styles from './Social.module.scss';
import { YoutubeIcon, InstagramIcon } from '@/icons';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export const Social = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('contactsdata/list', {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});

				if (response?.data) {
					setData(response?.data);
				}
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		};

		fetchData();
	}, []);

	if (!data || !Array.isArray(data) || data?.length < 2) return null;

	const items = [
		// @ts-ignore
		{ href: data[0]?.content?.link_value, icon: <YoutubeIcon /> },
		// @ts-ignore
		{ href: data[1]?.content?.link_value, icon: <InstagramIcon /> },
	];

	return (
		<ul className={classNames('list-reset', styles.list)}>
			{items?.map((el, idx) => {
				if (!el.href) return null;

				return (
					<li key={idx} className={styles.item}>
						<a href={el.href} className={styles.link}>
							{el.icon}
						</a>
					</li>
				);
			})}
		</ul>
	);
};
