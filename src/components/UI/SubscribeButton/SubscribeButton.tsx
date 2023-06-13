import { FC } from 'react';
import { SubscribeIcon } from '@/icons';
import { Button, ButtonProps } from '@/UI/Button/Button';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTranslation } from 'next-i18next';

export const SubscribeButton: FC<ButtonProps> = ({ className, ...props }) => {
	const { showMenu } = useTypedActions((state) => state.menu);
	const { showSubscribeModal } = useTypedActions((state) => state.modal);
	const { t } = useTranslation();

	const handleShowModal = () => {
		showSubscribeModal(true);
		showMenu(false);
	};

	return (
		<Button
			size="small"
			variant="gradient"
			className={className}
			icon={<SubscribeIcon />}
			onClick={handleShowModal}
			{...props}
		>
			{t('subscribe_button')}
		</Button>
	);
};
