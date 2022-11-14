import { Category } from '@/components/Category/Category';
import { IMovieItem } from '@/types/IMovieItem';
import { Grid } from '@/UI/Grid/Grid';

export const Tv = () => {
	const mockData: IMovieItem[] = [
		{
			id: 1,
			content: { title: 'Канал 1' },
			img_base_url: '/movie.jpg',
			options: [
				{
					filter_id: 1,
					option_value: '2013',
				},
				{
					filter_id: 2,
					option_value: '3+',
				},
			],
			img_path: '',
			hours: 1,
			minutes: 32,
		},
	];

	const tabs = [{ txt: 'Новости', content: <Grid data={mockData} /> }];

	return (
		<Category>
			<Category.Title>Тв</Category.Title>
			<Category.Tabs tabs={tabs} />
		</Category>
	);
};
