import { Category } from '@/components/Category/Category';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Grid } from '@/UI/Grid/Grid';
import { MovieItem } from '@/UI/MovieItem/MovieItem';
import { useState } from 'react';

export const Cartoons = () => {
	const { data } = useTypedSelector((state: any) => state.category);

	const { content, child_items }: any = { ...data[0] };

	const [newFilms, setNewFilms] = useState<any>({});

	const tabs =
		child_items?.map((tab: any) => {
			const txt = tab.content.title;
			const id = tab.id;
			const films = newFilms[id];
			const data = tab?.films?.items.concat(films ? films : []);

			return {
				txt,
				id,
				content: (
					<Grid
						items={data}
						renderItem={(el) => {
							const item = el[0];
							return <MovieItem item={item} />;
						}}
					/>
				),
			};
		}) || [];
	return (
		<Category>
			<Category.Title>{content?.title_in_nav}</Category.Title>
			<Category.Tabs tabs={tabs} setNewFilms={setNewFilms} />
		</Category>
	);
};
