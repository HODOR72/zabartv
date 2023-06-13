import { Modal } from '@/UI/Modal/Modal';
import { Grade } from '@/UI/Grade/Grade';
import { FC, useTransition } from 'react';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IGradeResponse } from '@/types/IGrade';
import { ICheckRating } from '@/types/ICheckRating';
import axios from '@/utils/axios';
import { useTranslation } from 'next-i18next';

type Props = {
	rating: number;
	setRating: (n: number) => void;
};

export const GradeModal: FC<Props> = ({ rating, setRating }: Props) => {
	const { data } = useTypedSelector((state) => state.movie);

	const { id } = { ...data[0] };

	const { isVisibleGradeModal } = useTypedSelector((state) => state.modal);

	const { showGradeModal } = useTypedActions((state) => state.modal);

	const handleClose = () => showGradeModal(false);

	const gradeFilm = async ({ id, rating }: IGradeResponse) => {
		try {
			await axios.get<ICheckRating>('/items/rating', {
				params: {
					film_id: id,
					type: 'add',
					rating,
				},
			});
			setRating(rating);
		} catch (error) {
			console.error(error);
		}
	};

	const handleGrade = () => {
		gradeFilm({ id, rating });
		handleClose();
	};

	const { ModalTitle, ModalButton } = Modal;
	const { t } = useTranslation();
	return (
		<Modal fullscreen variant="grade" open={isVisibleGradeModal} onClose={handleClose}>
			<ModalTitle>{t('Rate the film on a 10-point scale')}</ModalTitle>
			<Grade value={rating} setValue={setRating} />
			<ModalButton onClick={handleGrade} disabled={rating === 0}>
				{t('Rate')}
			</ModalButton>
		</Modal>
	);
};
