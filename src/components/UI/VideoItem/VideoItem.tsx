import { PlayIcon } from '@/icons';
import { FC } from 'react';
import { useTypedActions } from '@/hooks/useTypedActions';
import Image from 'next/image';
import styles from './VideoItem.module.scss';

interface VideoItemProps {
	item: any;
}

export const VideoItem: FC<VideoItemProps> = ({ item }) => {
	const { poster, title, desc, url, customerGroup } = item;
	const { showSubscribeEmptyModal } = useTypedActions((state) => state.modal);
	const { openPlayer, setUrl } = useTypedActions((state) => state.player);

	const handleOpenPlayer = () => {
		if (customerGroup == 2) {
			return showSubscribeEmptyModal(true);
		}
		openPlayer(true);
		setUrl(url);
	};

	return (
		<div onClick={handleOpenPlayer} className={styles.item}>
			<div className={styles.top}>
				<Image priority quality={100} layout="fill" src={poster} alt={title} />
				<span className={styles.play}>
					<PlayIcon />
				</span>
			</div>
			<h3 className={styles.title}>{title}</h3>
			<span className={styles.desc}>{desc}</span>
		</div>
	);
};
