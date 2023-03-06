import { FC, useEffect, useState } from 'react';
import axios from '@/utils/axios';
import styles from './SearchList.module.scss';
import { IMovie } from '@/types/IMovie';
import { SearchItem } from '../SearchItem/SearchItem';
import { useTranslation } from 'next-i18next';

interface SearchListProps {
	value: string;
}

interface SearchData {
	items: [IMovie][];
}

export const SearchList: FC<SearchListProps> = ({ value }) => {
	const [data, setData] = useState<SearchData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { t } = useTranslation();

	const search = async () => {
		try {
			setIsLoading(true);

			const { data } = await axios
				.get('/items/search', {
					params: {
						search_data: value.toLowerCase(),
						type: 'limit',
					},
				})
				.finally(() => setIsLoading(false));

			setData(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		search();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const List = (
		<div className={styles.list}>
			{data?.items.length! > 0 ? (
				data?.items.map((item, idx) => <SearchItem key={idx} item={item} />)
			) : (
				<span className={styles.message}>{t('not found')}</span>
			)}
		</div>
	);

	return (
		<>
			{!isLoading ? (
				<div className={styles.list}>
					{data?.items.length! > 0 ? (
						data?.items.map((item, idx) => <SearchItem key={idx} item={item} />)
					) : (
						<span className={styles.message}>{t('not found')}</span>
					)}
				</div>
			) : (
				<div className={styles.list}>
					<span className={styles.message}>{t('Loading...')}</span>
				</div>
			)}
		</>
	);
};
