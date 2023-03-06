import { useTypedActions } from '@/hooks/useTypedActions';
import { Link } from '@/UI/Link/Link';
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Rating.module.scss';
import { baseApi } from '@/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { GradeModal } from '../FavoriteButton/GradeModal/GradeModal';

interface RatingProps {
	rating: string;
	className?: string;
}

export const Rating: FC<RatingProps> = ({ className, rating }) => {
	const [userRating, setUserRating] = useState<number>(0);
	const { showGradeModal } = useTypedActions((state) => state.modal);
	const { data } = useTypedSelector((state) => state.movie);
	const { id } = { ...data[0] };

	const handleShowModal = () => showGradeModal(true);

	const getRating = async () => {
		try {
			const data = await baseApi.getRating(id);

			setUserRating(data?.film_rating ? data?.film_rating : 0);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) getRating();
	}, [id]);

	return (
		<>
			<GradeModal rating={userRating} setRating={setUserRating} />
			<div className={classNames(styles.item, className)}>
				<span className={styles.rating}>{rating}</span>
				<div className={styles.text}>
					<span className={styles.title}>Рейтинг ZabarTV</span>
					{userRating ? (
						<div className={styles.bottom}>
							<span className={styles.caption}>
								Ваша оценка&nbsp;<span>{userRating}</span>
							</span>
						</div>
					) : (
						<Link onClick={handleShowModal} as="button" className={styles.btn} size="sm">
							Оценить
						</Link>
					)}
				</div>
			</div>
		</>
	);
};
