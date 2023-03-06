import { useTypedSelector } from '@/hooks/useTypedSelector';
import { StarIcon } from '@/icons';
import { Button } from '@/UI/Button/Button';
import axios from '@/utils/axios';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './FavoriteButton.module.scss';

export const FavoriteButton = () => {
	const { data } = useTypedSelector((state) => state.movie);
	const { id } = { ...data[0] };
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const addMovieToFavorites = async () => {
		setIsFavorite((prev) => !prev);

		try {
			await axios.get('/items/updatewishlist', {
				params: {
					film_id: id,
				},
			});
		} catch (e: unknown) {
			console.error(e);
		}
	};

	const checkIfFavorite = async () => {
		try {
			const { data } = await axios.get('/items/checkwishlist', {
				params: {
					film_id: id,
				},
			});

			data.status === 0 ? setIsFavorite(false) : setIsFavorite(true);
		} catch (e: unknown) {
			console.error(e);
		}
	};

	useEffect(() => {
		checkIfFavorite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFavorite]);

	return (
		<Button
			className={classNames(styles.star, isFavorite && styles.starActive)}
			onClick={addMovieToFavorites}
			variant="dark"
			aria-label="Добавить в избранное"
		>
			<StarIcon />
		</Button>
	);
};
