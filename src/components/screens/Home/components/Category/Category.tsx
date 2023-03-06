import classNames from 'classnames';
// hooks
import { useTypedSelector } from '@/hooks/useTypedSelector';
// components
import { CategoryCarousel } from './components/CategoryCarousel/CategoryCarousel';
// components/UI
import { Tabs } from '@/UI/Tabs/Tabs';
import { Title } from '@/UI/Title/Title';
// types
import { ICategory, ISubCategory } from '@/types/index';
//
import styles from './Category.module.scss';

export const Category = () => {
	const { data } = useTypedSelector((state) => state.home);
	return (
		<>
			{data?.map((category: ICategory) => {
				const {
					id,
					child_items,
					content: { title_in_nav },
				} = category;

				const tabs = child_items?.map((tab: ISubCategory) => {
					const {
						content: { title },
						films,
					} = tab;

					return {
						txt: title,
						content: <CategoryCarousel data={films} />,
					};
				});
				return (
					<section key={id} className={styles.section}>
						<div className={classNames('container', styles.container)}>
							<Title level="h2" size="medium" className={styles.title}>
								{title_in_nav}
							</Title>
							<Tabs tabs={tabs} />
						</div>
					</section>
				);
			})}
		</>
	);
};
