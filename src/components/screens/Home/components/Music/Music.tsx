import { Tabs } from '@/UI/Tabs/Tabs';
import { Title } from '@/UI/Title/Title';
import { MusicCarousel } from './components/MusicCarousel/MusicCarousel';
import classNames from 'classnames';
import styles from './Music.module.scss';
import { useTranslation } from 'next-i18next';

export const Music = () => {
	const data = [
		{
			poster: '/poster.jpg',
			id: 1,
			title: 'Концерт Billie',
			desc: 'Подписка',
		},
		{
			poster: '/poster.jpg',
			id: 2,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 3,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 4,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 5,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 6,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 7,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 8,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 9,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
		{
			poster: '/poster.jpg',
			id: 10,
			title: 'Концерт Billie',
			desc: 'Бесплатно',
		},
	];

	const tabs = [
		{ txt: 'Концерты', content: <MusicCarousel data={data} /> },
		{ txt: 'Клипы', content: <MusicCarousel data={data} /> },
		{ txt: 'Топ-5', content: <MusicCarousel data={data} /> },
	];
	const { t } = useTranslation();
	return (
		<section className={styles.music}>
			<div className={classNames('container', styles.container)}>
				<Title level="h2" size="medium" className={styles.title}>
					{t('music')}
				</Title>
				<Tabs tabs={tabs} />
			</div>
		</section>
	);
};
