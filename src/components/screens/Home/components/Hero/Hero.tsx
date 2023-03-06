import { Carousel } from '@/components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import NextLink from 'next/link';
import styles from './Hero.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const Hero = () => {
	const { hero } = useTypedSelector((state) => state.home);

	const data = { ...hero[0] };

	const { child_items } = { ...data[0] };

	const { slides } = { ...child_items?.blocks[0] };

	const breakpoints = {
		769: {
			spaceBetween: 24,
		},
	};

	return (
		<section className={styles.hero}>
			<div className={classNames('container', styles.container)}>
				{slides && (
					<Carousel
						prevBtnClass={styles.prev}
						nextBtnClass={styles.next}
						className={styles.slider}
						loop={true}
						spaceBetween={15}
						breakpoints={breakpoints}
						centeredSlides={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
					>
						{slides?.map((slide) => {
							const { id, img_base_url, img_path, content } = slide;

							const url = `${img_base_url}/${img_path}`;

							return (
								<SwiperSlide key={id} className={styles.slide}>
									<NextLink href={content.link}>
										<a className={styles.item}>
											<Image
												priority
												quality={100}
												src={url}
												alt={content.title}
												layout="fill"
											/>
										</a>
									</NextLink>
								</SwiperSlide>
							);
						})}
					</Carousel>
				)}
			</div>
		</section>
	);
};
