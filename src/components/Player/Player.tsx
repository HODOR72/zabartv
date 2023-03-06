import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { CloseIcon } from '@/icons';
import { useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useTypedActions } from '@/hooks/useTypedActions';
import classNames from 'classnames';
import styles from './Player.module.scss';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const qualities = [
	{ label: '1080p', value: '1080' },
	{ label: '720p', value: '720' },
];

export const Player = () => {
	const { isVisiblePlayer, url } = useTypedSelector((state) => state.player);
	const { openPlayer } = useTypedActions((state) => state.player);

	const handleClosePlayer = () => {
		openPlayer(false);
	};

	useEffect(() => {
		if (isVisiblePlayer) {
			document.body.classList.add('lock');
		} else {
			document.body.classList.remove('lock');
		}
	}, [isVisiblePlayer]);

	const { t } = useTranslation();

	return (
		<>
			{isVisiblePlayer && (
				<div className={classNames(styles.wrapper, isVisiblePlayer && styles.show)}>
					<ButtonBase
						aria-label="Закрыть"
						title={t('Close')}
						onClick={handleClosePlayer}
						className={styles.close}
					>
						<CloseIcon />
					</ButtonBase>
					{!url.includes('zabar') ? (
						<iframe src={url} name="iframe_a" className={styles.iframe} />
					) : (
						<Plyr
							autoPlay
							source={{
								type: 'video',
								sources: [
									{
										src: url,
										type: 'video/mp4',
										size: 720,
									},
									{
										src: url,
										type: 'video/mp4',
										size: 1080,
									},
								],
							}}
							// @ts-ignore
							controls={[
								'play-large', // The large play button in the center
								'rewind', // Rewind by the seek time (default 10 seconds)
								'play', // Play/pause playback
								'fast-forward', // Fast forward by the seek time (default 10 seconds)
								'progress', // The progress bar and scrubber for playback and buffering
								'duration', // The full duration of the media
								'mute', // Toggle mute
								'volume', // Volume control
								'captions', // Toggle captions
								'settings', // Settings menu
								'pip', // Picture-in-picture (currently Safari only)
								'airplay', // Airplay (currently Safari only)
								'fullscreen', // Toggle fullscreen
								'quality',
							]}
							quality={qualities}
						/>
					)}
				</div>
			)}
		</>
	);
};
