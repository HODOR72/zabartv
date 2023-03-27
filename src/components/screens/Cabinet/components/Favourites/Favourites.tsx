import { IMovie } from '@/types/IMovie';
import { Title } from '@/UI/Title/Title';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Grid } from '../Grid/Grid';
import { MovieItem } from '../index';

interface FavouritesProps {
	favorites: [IMovie[]];
}

export const Favourites: FC<FavouritesProps> = ({ favorites }) => {
	const isNotEpty = favorites && favorites.length > 0;
	const { t } = useTranslation();

	const FavoritesList = (
		<Grid>
			{favorites?.map((el) => {
				const item = el[0];
				return <MovieItem favourite key={item.id} item={item} />;
			})}
		</Grid>
	);

	const EmptyTitle = (
		<Title level="h3" size="small">
			{t('Favorites list is empty')}
		</Title>
	);

	return isNotEpty ? FavoritesList : EmptyTitle;
};
