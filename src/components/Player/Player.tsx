import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { CloseIcon } from '@/icons';
import { useEffect, useRef } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useTypedActions } from '@/hooks/useTypedActions';
import classNames from 'classnames';
import styles from './Player.module.scss';
import 'plyr-react/plyr.css';
import { useTranslation } from 'next-i18next';
import Plyr, { PlyrInstance } from 'plyr-react';
import Hls from 'hls.js';
const qualities = [
	{ label: '1080p', value: '1080' },
	{ label: '720p', value: '720' },
];

export const Player = () => {
	const { isVisiblePlayer, url} = useTypedSelector((state) => state.player);
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
	const ref = useRef<any>(null);

useEffect(() => {
	const loadVideo = async () => {
		const video = document.getElementById('plyr') as HTMLVideoElement;

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(url);
			hls.attachMedia(video);

			if (ref?.current && ref?.current?.plyr) {
				const plyr = ref.current.plyr;
				if (plyr) {
					// @ts-ignore
					plyr.media = video;
				}
			}

			hls.on(Hls.Events.MANIFEST_PARSED, function () {
				(ref.current!.plyr as PlyrInstance).play();
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = url;
			video.addEventListener('loadedmetadata', function () {
				video.play();
			});
		}
	};

	loadVideo();
}, [url]);

	return (
		<>
			{isVisiblePlayer && (
				<div
					className={classNames(styles.wrapper, isVisiblePlayer && styles.show, {
						[styles.translation]: url?.includes('m3u'),
					})}
				>
					<ButtonBase
						aria-label="Закрыть"
						title={t('Close')}
						onClick={handleClosePlayer}
						className={styles.close}
					>
						<CloseIcon />
					</ButtonBase>
					{(!url.includes('zabar') && !url?.includes('m3u') && !url.includes('troya.tv') )? (
						<iframe
							src={`${url}?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1`}
							allow="autoplay; encrypted-media"
							name="iframe_a"
							className={styles.iframe}
						/>
					) : !url.includes('m3u') ? (
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
					) : (
						<Plyr
							id="plyr"
							// @ts-ignore
							source={{} as ['source']}
							ref={ref}
							// @ts-ignore
							controls={[
								'play-large', // The large play button in the center
								'mute', // Toggle mute
								'volume', // Volume control
								'captions', // Toggle captions
								'settings', // Settings menu
								'pip', // Picture-in-picture (currently Safari only)
								'airplay', // Airplay (currently Safari only)
								'fullscreen', // Toggle fullscreen
								'quality',
							]}
						/>
					)}
				</div>
			)}
		</>
	);
};
