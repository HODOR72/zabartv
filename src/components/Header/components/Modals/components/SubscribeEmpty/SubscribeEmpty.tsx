import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EyeSlash } from '@/icons';
import { useTranslation } from 'next-i18next';
import styles from './SubscribeEmpty.module.scss';
import { useRouter } from 'next/router';
import { RoutesEnum } from '@/constants/routes';

export const SubscribeEmpty = () => {
	const { isVisibleSubscribeEmptyModal } = useTypedSelector((state) => state.modal);

	const handleClose = () => showSubscribeEmptyModal(false);

	const { t } = useTranslation();

	const { showAuthModal, showSubscribeEmptyModal } = useTypedActions((state) => state.modal);
	const { push } = useRouter();

	const handleSubmit = () => {
		if (localStorage.getItem('zabar_user_id')) {
			push(RoutesEnum.Subscribe);
		} else {
			showAuthModal(true);
			showSubscribeEmptyModal(false);
		}
	};

	return (
		<Modal open={isVisibleSubscribeEmptyModal} onClose={handleClose} className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.img}>
					<EyeSlash />
				</div>
				<h3 className={styles.title}>{t('Paid Content')}</h3>
				<p className={styles.text}>{t('Subscribe to access this and many more films')}</p>
				<a onClick={handleSubmit}>
					<button className={styles.btn}>{t('GO TO DESIGN')}</button>
				</a>
			</div>
		</Modal>
	);
};
