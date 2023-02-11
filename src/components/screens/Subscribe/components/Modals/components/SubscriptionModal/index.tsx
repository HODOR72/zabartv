import { useEffect, useState } from 'react';
// hooks
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
// components/UI
import { Modal } from '@/UI/Modal/Modal';
import { Title } from '@/UI/Title/Title';
// components/icons
import { CardIcon, BitcoinIcon } from '@/icons';
//
import styles from './SubscriptionModal.module.scss';
import classNames from 'classnames';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MasterCardVisa from '../../../../../../Icons/VisaMS.png';

const SubscriptionModal = () => {
	const [paymentMethod, setPaymentMethod] = useState<string>('card');
	const [value, setValue] = useState<number>(0);
	const [packageId, setPackageId] = useState<number>(0);

	const { isVisibleSubscriptionModal } = useTypedSelector((state: any) => state.modal);

	const { showSubscriptionModal } = useTypedActions((state: any) => state.modal);

	const handleClose = () => showSubscriptionModal(false);
	const { push } = useRouter();
	const { ModalTitle, ModalDesc, ModalButton } = Modal;

	const buySubscription = async () => {
		try {
			const { data } = await axios({
				url: '/session/create-request',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'post',
				// УБРАТЬ 2 : 2 ПРИ РАБОТОСПОСОБНОСТИ КАРТЫ
				data: `user_id=${localStorage.getItem('zabar_user_id')}&package_id=3&payment_method=${
					paymentMethod === 'card' ? 2 : 2
				}&payment_order_id=${paymentMethod}`,
			});
			push(data.payment_url);

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setValue(
			Number(localStorage.getItem('packet')) == 1 ? Number(localStorage.getItem('counter')) : 360
		);
		setPackageId(Number(localStorage.getItem('packet')));
	}, [
		typeof window !== 'undefined' && localStorage.getItem('counter'),
		typeof window !== 'undefined' && localStorage.getItem('packet'),
	]);

	return (
		<Modal
			// variant="grade"
			fullscreen={true}
			open={isVisibleSubscriptionModal}
			onClose={handleClose}
			className={styles.modal}
		>
			<ModalTitle className={styles.modal_title}>
				<div className={styles.left}>Выберите способ оплаты</div>
				<div className={styles.right}>
					<Title className={styles.top} size="small">
						{`${value !== 360 ? value + ' дней ' : 1 + ' год '}`}
						<span>за {packageId == 2 ? 30 : (value / 30) * 10}€</span>
					</Title>
					<Title className={styles.bottom} size="small">
						<s>{packageId == 2 ? 30 * 2 : (value / 30) * 10 * 2}€</s>
					</Title>
				</div>
			</ModalTitle>
			<div className={styles.content}>
				<button
					className={classNames(
						styles.paymentMethod,
						paymentMethod === 'card' ? styles.active : styles.noactive
					)}
					onClick={() => setPaymentMethod('card')}
				>
					<div className={styles.left}>
						<span className={styles.icon}>
							<CardIcon />
						</span>
						<span className={styles.text}>Картой через эквайринг банка</span>
					</div>
					<span className={styles.right}>{packageId == 2 ? 30 : (value / 30) * 10}€</span>
				</button>
				<button
					className={classNames(
						styles.paymentMethod,
						paymentMethod === 'bitcoin' ? styles.active : styles.noactive,
						styles.twoBtn
					)}
					onClick={() => setPaymentMethod('bitcoin')}
				>
					<div className={styles.left}>
						<span className={styles.icon}>
							<BitcoinIcon />
						</span>
						<span className={styles.img}>
							<Image src={MasterCardVisa} width={31} height={36} />
						</span>

						<span className={styles.text}>Криптовалютой и картой</span>
					</div>
					<span className={styles.right}>{packageId == 2 ? 30 : (value / 30) * 10}€</span>
				</button>
			</div>
			<ModalButton className={styles.buy} onClick={buySubscription}>
				ОПЛАТИТЬ
			</ModalButton>
		</Modal>
	);
};

export default SubscriptionModal;
