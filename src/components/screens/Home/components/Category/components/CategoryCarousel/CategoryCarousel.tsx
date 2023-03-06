import { FC } from 'react';
//
import { SwiperSlide } from 'swiper/react';
// components
import { Carousel } from '@/components/Carousel/Carousel';
// components/UI
import { MovieItem } from '@/UI/MovieItem/MovieItem';
// types
import { IMovieItem } from '@/types/index'
//
import styles from './CategoryCarousel.module.scss';



interface CategoryCarouselProps {
	data: {
		items: [IMovieItem[]];
	};
}

export const CategoryCarousel: FC<CategoryCarouselProps> = ({ data }) => {
	const breakpoints = {
		769: {
			slidesPerView: 3,
		},
		1025: {
			slidesPerView: 4,
		},
	};

	return (
		<div className={styles.container}>
			<Carousel className={styles.slider} breakpoints={breakpoints} spaceBetween={24}>
				{data?.items?.map((el: IMovieItem[]) => {
					const item: IMovieItem = el[0];

					return (
						<SwiperSlide className={styles.item} key={item?.id}>
							<MovieItem item={item} />
						</SwiperSlide>
					);
				})}
			</Carousel>
		</div>
	);
};
