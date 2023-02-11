import { FC, useState } from 'react';
//
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
// hooks
import { useTypedActions } from '@/hooks/useTypedActions';
// components/icons
import { SubscribeIcon } from '@/icons';
// components/UI
import { Title } from '@/UI/Title/Title';
import { Button } from '@/UI/Button/Button';
import { Counter } from '@/UI/Counter/Counter';
// types
import { IPackage } from '@/types/index';
//
import styles from './SubscribeCard.module.scss';

interface SubscribeCardProps {
	card: IPackage;
}

export const SubscribeCard: FC<SubscribeCardProps> = ({ card }) => {
	const { showSubscriptionModal } = useTypedActions((state: any) => state.modal);

	const {
		content: { title, badge_1 },
		price,
		period,
		visible,
	} = card;

	const normalPrice = Number(price);
	const isMonthPackage = period <= 30;
	const priceInYear = normalPrice * 12 + 15;
	const priceInMonth = normalPrice / 12 - 1;

	const convertPrice = () => (isMonthPackage ? priceInYear : priceInMonth).toFixed(0);

	const { t } = useTranslation();

	const handleSend = () => {
		showSubscriptionModal(true);
		localStorage.setItem('packet', isMonthPackage ? '1' : '2');
	};
	return (
		<>
			{visible ? (
				<div className={classNames(styles.card, !isMonthPackage && styles.year)}>
					<Title level="h2" size="medium" className={styles.title}>
						{title}
						&nbsp;за
						<span>&nbsp;{normalPrice}€</span>
					</Title>
					<p className={styles.desc}>
						{isMonthPackage ? 'Или' : 'Единоразово'}
						&nbsp;{convertPrice()}
						<span>
							€&nbsp;
							{isMonthPackage ? 'за 12 месяцев' : 'в месяц'}
						</span>
					</p>
					{isMonthPackage && (
						<Counter className={styles.counter} initialValue={30} caption="Дней" />
					)}
					<Button
						onClick={handleSend}
						variant="gradient"
						className={styles.btn}
						icon={<SubscribeIcon />}
					>
						{t('subscribe_button')}
					</Button>
					{badge_1 && <span className={styles.badge}>{badge_1}</span>}
				</div>
			) : null}
		</>
	);
};
