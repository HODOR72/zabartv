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
			<ModalTitle>{t('Subscribe ZabarTV')}</ModalTitle>
			<ModalDesc>
				{t(
					'Show unique series and films. We will select films according to interests and mood. For you and your family'
				)}
			</ModalDesc>
			<NextLink href={RoutesEnum.Subscribe} passHref>
				<ModalButton as="link" variant="white" icon={<SubscribeIcon />}>
					{t('subscribe_button')} {t('behind')} 12€
				</ModalButton>
			</NextLink>
		</Modal>
	);
};
