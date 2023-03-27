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

	const convertPrice = () => (isMonthPackage ? normalPrice * 12 : normalPrice / 12).toFixed(0);

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
						{t(title)}
						&nbsp;{t('behind')}
						<span>&nbsp;{normalPrice}€</span>
					</Title>
					<p className={styles.desc}>
						{isMonthPackage ? t('Or') : t('one time')}
						&nbsp;{convertPrice()}
						<span>
							€&nbsp;
							{isMonthPackage ? t('for 12 months') : t('per month')}
						</span>
					</p>
					{isMonthPackage && (
						<Counter className={styles.counter} initialValue={30} caption={t('Days')} />
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
