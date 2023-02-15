import classNames from 'classnames';
// hooks
import { useTypedSelector } from '@/hooks/useTypedSelector';
// components
import { SubscribeCard } from './components/SubscribeCard/SubscribeCard';
import Modals from './components/Modals';
// components/UI
import { Title } from '@/UI/Title/Title';
//
import styles from './Subscribe.module.scss';
import { useTranslation } from 'next-i18next';

export const Subscribe = () => {
	const { data } = useTypedSelector((state) => state.subscribe);

	const { t } = useTranslation();

	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<Title className={styles.title}>{t('Subscribe ZabarTV')}</Title>
				<p className={styles.desc}>
					{t(
						'Show unique series and films. We will select films according to interests and mood. For you and your family'
					)}
				</p>
				<div className={styles.cards}>
					{data?.map((card) => (
						<SubscribeCard key={card.id} card={card} />
					))}
				</div>
			</div>
			<Modals />
		</section>
	);
};
