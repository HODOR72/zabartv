import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RoutesEnum } from '@/constants/routes';
import { SubscribeIcon } from '@/icons';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import axios from '@/utils/axios';
import { useEffect, useState } from 'react';

export const SubscribeModal = () => {
	const { isVisibleSubscribeModal } = useTypedSelector((state) => state.modal);

	const { showSubscribeModal, showAuthModal } = useTypedActions((state) => state.modal);
	const [packages, setPackages] = useState();

	const handleClose = () => showSubscribeModal(false);
	const { push } = useRouter();

	const { t } = useTranslation();

	const { ModalTitle, ModalDesc, ModalButton } = Modal;

	const handleSubmit = () => {
		const isAuth = Boolean(
			localStorage.getItem('zabar_user_id') &&
				localStorage.getItem('zabar_user_id') !== 'undefined'
		);

		if (isAuth) {
			push(RoutesEnum.Subscribe);
		} else {
			showAuthModal(true);
			showSubscribeModal(false);
			localStorage.setItem('isSubscribed', 'true');
		}
	};

	const getPackages = async () => {
		try {
			const { data } = await axios.get('/packages');
			setPackages(data);
		} catch (e: unknown) {
			console.error(e);
		}
	};

	useEffect(() => {
		getPackages();
	}, []);

	return (
		<Modal variant="gradient" open={isVisibleSubscribeModal} onClose={handleClose}>
			<ModalTitle>{t('Subscribe ZabarTV')}</ModalTitle>
			<ModalDesc>
				{t(
					'Show unique series and films. We will select films according to interests and mood. For you and your family'
				)}
			</ModalDesc>
			<a onClick={handleSubmit}>
				<ModalButton as="link" variant="white" icon={<SubscribeIcon />}>
					{/* @ts-ignore */}
					{t('subscribe_button')}
				</ModalButton>
			</a>
		</Modal>
	);
};
