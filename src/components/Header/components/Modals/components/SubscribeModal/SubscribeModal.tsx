import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RoutesEnum } from '@/constants/routes';
import { SubscribeIcon } from '@/icons';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

export const SubscribeModal = () => {
	const { isVisibleSubscribeModal } = useTypedSelector((state) => state.modal);

	const { showSubscribeModal } = useTypedActions((state) => state.modal);

	const handleClose = () => showSubscribeModal(false);

	const { t } = useTranslation();

	const { ModalTitle, ModalDesc, ModalButton } = Modal;
	
	return (
		<Modal variant="gradient" open={isVisibleSubscribeModal} onClose={handleClose}>
			<ModalTitle>Подписка ZabarTV</ModalTitle>
			<ModalDesc>
				Покажем уникальные сериалы и фильмы. Подберем кино по интересам и настроению. Для вас и
				вашей семьи.
			</ModalDesc>
			<NextLink href={RoutesEnum.Subscribe} passHref>
				<ModalButton as="link" variant="white" icon={<SubscribeIcon />}>
					{t('subscribe_button')} за 12€
				</ModalButton>
			</NextLink>
		</Modal>
	);
};
