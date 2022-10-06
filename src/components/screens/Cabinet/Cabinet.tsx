import { Avatar, SubscribeInfo, Settings, Favourites, Purchases, Views } from './components/index';
import { MailIcon } from '@/icons';
import { Tabs } from '@/UI/Tabs/Tabs';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import classNames from 'classnames';
import styles from './Cabinet.module.scss';

export const Cabinet = () => {
	const { data } = useTypedSelector((state) => state.user);

	const { email, username } = { ...data };

	const info = {
		title: '30 дней за',
		price: '12€',
		desc: 'Следующая оплата 22.09.22',
	};

	const tabs = [
		{ txt: 'Настройки', content: <Settings data={data} /> },
		{ txt: 'Избранное', content: <Favourites /> },
		{ txt: 'История покупок', content: <Purchases /> },
		{ txt: 'История просмотров', content: <Views /> },
	];

	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.top}>
					<div className={styles.left}>
						<Avatar name={username} />
						<div className={styles.text}>
							<h1 className={styles.name}>{username}</h1>
							<span className={styles.mail}>
								<MailIcon />
								{email}
							</span>
						</div>
					</div>
					<SubscribeInfo info={info} />
				</div>
				<Tabs className={styles.tabs} tabs={tabs} />
			</div>
		</section>
	);
};
