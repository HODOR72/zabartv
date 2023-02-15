import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EyeSlash } from '@/icons';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styles from './SubscribeEmpty.module.scss';
import Link from 'next/link';

export const SubscribeEmpty = () => {
	const { isVisibleSubscribeEmptyModal } = useTypedSelector((state) => state.modal);

	const { showSubscribeEmptyModal } = useTypedActions((state) => state.modal);

	const handleClose = () => showSubscribeEmptyModal(false);

	const { t } = useTranslation();

	return (
		<Modal open={isVisibleSubscribeEmptyModal} onClose={handleClose} className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.img}>
					<Image src={EyeSlash} width={73} height={73} />
				</div>
				<h3 className={styles.title}>{t('Paid Content')}</h3>
				<p className={styles.text}>{t('Subscribe to access this and many more films')}</p>
				<Link href="/subscribe">
					<button className={styles.btn}>{t('GO TO DESIGN')}</button>
				</Link>
			</div>
		</Modal>
	);
};
