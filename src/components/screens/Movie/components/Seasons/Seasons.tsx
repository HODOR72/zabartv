import { SeasonsCarousel } from './components/SeasonsCarousel/SeasonsCarousel';
import { FC } from 'react';
import { IPart } from '@/types/IPart';
import classNames from 'classnames';
import styles from './Seasons.module.scss';
import { TabsDefault } from '@/UI/Tabs/TabsDefault';

interface SeasonsProps {
	parts: IPart[] | undefined;
	customerGroup: any;
}

export const Seasons: FC<SeasonsProps> = ({ parts, customerGroup }) => {
	const tabs =
		parts?.map((part) => {
			const txt = `${part.season_number} сезон`;

			const items = part?.season_data.map((item, idx) => {
				const { mini_description, preview_base_url, preview_path } = item;

				const url = `${preview_base_url}/${preview_path}`;

				const id = idx + 1;
				return {
					poster: url,
					id,
					title: `Серия ${id}`,
					url: item.stream_film_link,
					desc: mini_description,
					customerGroup,
				};
			});

			return { txt, content: <SeasonsCarousel items={items} /> };
		}) || [];
	return (
		<div className={styles.seasons}>
			<div className={classNames('container', styles.container)}>
				<TabsDefault tabs={tabs} />
			</div>
		</div>
	);
};
