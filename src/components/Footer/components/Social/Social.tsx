import classNames from 'classnames';
import styles from './Social.module.scss';
import { YoutubeIcon, InstagramIcon } from '@/icons';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export const Social = () => {
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

	const items = [
		{ href: data[0]?.content.link_value, icon: <YoutubeIcon /> },
		{ href: data[1]?.content.link_value, icon: <InstagramIcon /> },
	];

	return (
		<ul className={classNames('list-reset', styles.list)}>
			{items?.map((el, idx) => (
				<li key={idx} className={styles.item}>
					<a href={el.href} className={styles.link}>
						{el.icon}
					</a>
				</li>
			))}
		</ul>
	);
};
