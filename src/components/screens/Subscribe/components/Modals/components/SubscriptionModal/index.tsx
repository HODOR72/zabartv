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
import { useTranslation } from 'next-i18next';
import { PAYMENTS_METHOD_ID } from '@/constants/payments';

const SubscriptionModal = () => {
	const [paymentMethod, setPaymentMethod] = useState<keyof typeof PAYMENTS_METHOD_ID>('card');
	const [value, setValue] = useState<number>(0);
	const [packageId, setPackageId] = useState<number>(0);
	const [packages, setPackages] = useState();
	const { isVisibleSubscriptionModal } = useTypedSelector((state: any) => state.modal);

	const { showSubscriptionModal } = useTypedActions((state: any) => state.modal);

	const handleClose = () => showSubscriptionModal(false);
	const { push } = useRouter();
	const { ModalTitle, ModalButton } = Modal;

	const buySubscription = async () => {
		try {
			const params = new URLSearchParams();
			params.set('user_id', localStorage.getItem('zabar_user_id')!);
			params.set('package_id', '3');
			params.set('subscribe_period', `${value}`);
			params.set('payment_method', `${PAYMENTS_METHOD_ID[paymentMethod]}`);
			params.set('payment_order_id', paymentMethod);

			const { data } = await axios({
				url: '/session/create-request',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'post',
				data: params,
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

	const { t } = useTranslation();

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

	console.log();
	return (
		<Modal
			// variant="grade"
			fullscreen={true}
			open={isVisibleSubscriptionModal}
			onClose={handleClose}
			className={styles.modal}
		>
			<ModalTitle className={styles.modal_title}>
				<div className={styles.left}>
					{t('Select a Payment Method')}
				</div>
				<div className={styles.right}>
					<Title className={styles.top} size="small">
						{`${value !== 360 ? value + t('days') : 1 + t('year')}`}
						<span>
							{t('behind') + ' '}
							{/* @ts-ignore */}
							{packageId == 2 ? +packages?.items[1].price : +packages?.items[0].price * (value / 30) }
							 $
						</span>
					</Title>
					<Title className={styles.bottom} size="small">
						<s>
							{/* @ts-ignore */}
							{packageId == 2 ? +packages?.items[1].price * 2 : +packages?.items[0].price * (value / 30) * 2}
							$
						</s>
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
						<span className={styles.text}>{t('By card through bank acquiring')}</span>
					</div>
					{/* @ts-ignore */}
					<span className={styles.right}>{packageId == 2 ? +packages?.items[1].price  : +packages?.items[0].price * (value / 30)}$</span>
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
						<span className={styles.text}>{t('Cryptocurrency')}</span>
					</div>
					{/* @ts-ignore */}
					<span className={styles.right}>{packageId == 2 ? +packages?.items[1].price  : +packages?.items[0].price * (value / 30)}$</span>
				</button>
			</div>
			<ModalButton className={styles.buy} onClick={buySubscription}>
				{t('PAY')}
			</ModalButton>
		</Modal>
	);
};

export default SubscriptionModal;
