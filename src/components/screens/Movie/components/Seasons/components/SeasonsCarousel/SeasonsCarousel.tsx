import { Carousel } from '@/components/Carousel/Carousel';
import { IPartData } from '@/types/IPart';
import { VideoItem } from '@/UI/VideoItem/VideoItem';
import { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import styles from './SeasonsCarousel.module.scss';

interface IPart {
	poster: string;
	id: number;
	title: string;
	desc: string;
}

interface SeasonsCarouselProps {
	items: IPart[] | [];
}

export const SeasonsCarousel: FC<SeasonsCarouselProps> = ({ items }) => {
	const breakpoints = {
		769: {
			slidesPerView: 3,
		},
		1025: {
			slidesPerView: 4,
		},
	};
	return (
		<Carousel
			className={styles.slider}
			prevBtnClass={styles.btn}
			nextBtnClass={styles.btn}
			breakpoints={breakpoints}
			spaceBetween={24}
		>
			{items?.map((item) => (
				<SwiperSlide className={styles.item} key={item.id}>
					<VideoItem item={item} />
				</SwiperSlide>
			))}
		</Carousel>
	);
};
