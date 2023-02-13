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

export const Subscribe = () => {
	const { data } = useTypedSelector((state) => state.subscribe);
	console.log(data)

	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<Title className={styles.title}>Подписка ZabarTV</Title>
				<p className={styles.desc}>
					Покажем уникальные сериалы и фильмы. Подберем кино по интересам и настроению. Для вас
					и вашей семьи.
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
