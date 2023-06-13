import 'swiper/css';
import { FC, PropsWithChildren, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { SliderButton } from '@/UI/SliderButton/SliderButton';
import { SwiperOptions } from 'swiper/types';
import SwiperClass, { Autoplay, Navigation } from 'swiper';
import styles from './Carousel.module.scss';
import classNames from 'classnames';

interface CarouselProps extends SwiperOptions {
	className?: string;
	prevBtnClass?: string;
	nextBtnClass?: string;
	props?: SwiperOptions;
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
	prevBtnClass,
	nextBtnClass,
	slidesPerView = 'auto',
	className,
	children,
	...props
}) => {
	const navigationPrevRef = useRef<HTMLButtonElement>(null);
	const navigationNextRef = useRef<HTMLButtonElement>(null);

	const swiperNavigation = {
		prevEl: navigationPrevRef.current,
		nextEl: navigationNextRef.current,
	};

	const onSwiper = (swiper: SwiperClass) => {
		setTimeout(() => {
			// @ts-ignore
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			// @ts-ignore
			swiper.params.navigation.nextEl = navigationNextRef.current;

			// Re-init navigation
			swiper.navigation?.destroy();
			swiper.navigation?.init();
			swiper.navigation?.update();
		});
	};

	return (
		<Swiper
			modules={[Navigation, Autoplay]}
			slidesPerView={slidesPerView}
			navigation={swiperNavigation}
			onSwiper={onSwiper}
			className={classNames(styles.slider, className)}
			{...props}
		>
			<SliderButton
				className={classNames(styles.prev, prevBtnClass)}
				dir="left"
				ref={navigationPrevRef}
			/>
			<SliderButton
				className={classNames(styles.next, nextBtnClass)}
				dir="right"
				ref={navigationNextRef}
			/>
			{children}
		</Swiper>
	);
};
