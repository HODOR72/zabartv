import { FC } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { VideoItem } from '@/UI/VideoItem/VideoItem';
import { SwiperSlide } from 'swiper/react';
import styles from './MusicCarousel.module.scss';

interface MusicCarouselProps {
	//временно
	data: any[];
}

export const MusicCarousel: FC<MusicCarouselProps> = ({ data }) => {
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
			<Carousel
				className={styles.slider}
				prevBtnClass={styles.btn}
				nextBtnClass={styles.btn}
				breakpoints={breakpoints}
				spaceBetween={24}
			>
				{data?.map((item) => (
					<SwiperSlide className={styles.item} key={item.id}>
						<VideoItem item={item} />
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};
