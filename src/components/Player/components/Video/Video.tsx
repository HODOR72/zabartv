import {
	Component,
	ReactElement,
	ReactNode,
	SyntheticEvent,
	RefObject,
	MediaHTMLAttributes,
	HTMLProps,
	createRef,
} from 'react';
import { VideoTextTracks, VideoTextTrackKind, getVideoTextTrackId } from './types';

export type VideoStatus = 'playing' | 'paused' | 'errored';
export type VideoError = MediaError | null;

export interface VideoState {
	status: VideoStatus;
	currentTime: number;
	currentActiveCues: (kind: VideoTextTrackKind, lang: string) => TextTrackCueList | null | undefined;
	volume: number;
	duration: number;
	buffered: number;
	isMuted: boolean;
	isLoading: boolean;
	error?: VideoError;
}

export type NavigateFunction = (time: number) => void;
export type SetVolumeFunction = (volume: number) => void;
export type SetPlaybackSpeed = (speed: number) => void;

export interface VideoActions {
	play: () => void;
	mute: () => void;
	pause: () => void;
	unmute: () => void;
	toggleMute: () => void;
	togglePlay: () => void;
	navigate: NavigateFunction;
	setVolume: SetVolumeFunction;
	setPlaybackSpeed: SetPlaybackSpeed;
}

export type RenderCallback = (
	reactElement: ReactElement<SourceElement>,
	state: VideoState,
	actions: VideoActions,
	ref: RefObject<SourceElement>
) => ReactNode;

export interface VideoProps extends Omit<HTMLProps<HTMLVideoElement>, 'children'> {
	children: RenderCallback;
	isVisiblePlayer: boolean;
	defaultTime: number;
	sourceType: 'video' | 'audio';
	textTracks?: VideoTextTracks;
	onCanPlay?: (event: SyntheticEvent<SourceElement>) => void;
	onError?: (event: SyntheticEvent<SourceElement>) => void;
	onTimeChange?: (time: number, duration: number) => void;
}

export interface VideoComponentState {
	currentTime: number;
	volume: number;
	status: VideoStatus;
	duration: number;
	buffered: number;
	isMuted: boolean;
	isLoading: boolean;
	error?: VideoError;
}

const getVolumeFromVideo = (video: SourceElement): { volume: number; isMuted: boolean } => {
	const volume = video.volume;
	const isMuted = volume === 0;

	return {
		volume,
		isMuted,
	};
};

export type SourceElement = HTMLVideoElement | HTMLAudioElement;
const isSafari =
	typeof navigator !== 'undefined'
		? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
		: false;

export class Video extends Component<VideoProps, VideoComponentState> {
	previousVolume: number = 1;
	previousTime: number = -1;
	videoRef: RefObject<HTMLVideoElement> = createRef();
	audioRef: RefObject<HTMLAudioElement> = createRef();
	hasCanPlayTriggered: boolean = false;

	state: VideoComponentState = {
		isLoading: true,
		buffered: 0,
		currentTime: 0,
		volume: 1,
		status: 'paused',
		duration: 0,
		isMuted: false,
	};

	static defaultProps = {
		defaultTime: 0,
		sourceType: 'video',
		autoPlay: false,
		controls: false,
		preload: isSafari ? 'auto' : 'metadata',
	};

	onLoadedData = () => {
		const { defaultTime } = this.props;
		if (this.currentElement) {
			this.currentElement.currentTime = defaultTime;
		}
	};

	componentDidUpdate(prevProps: VideoProps) {
		const { src, isVisiblePlayer } = this.props;
		const { currentTime, status } = this.state;
		const hasSrcChanged = prevProps.src !== src;

		if (hasSrcChanged) {
			this.hasCanPlayTriggered = false;
			// TODO: add test to cover this case
			if (status === 'playing') {
				this.play();
			}

			this.navigate(currentTime);
		}

		// isVisiblePlayer ? this.play() : this.pause();

		const handleEscapeKey = (event: KeyboardEvent) => event.keyCode === 32 && this.togglePlay();

		document.addEventListener('keydown', handleEscapeKey);
	}

	private onVolumeChange = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;
		const { volume, isMuted } = getVolumeFromVideo(video);
		this.setState({
			volume,
			isMuted,
		});
	};

	private onTimeUpdate = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;
		const { onTimeChange } = this.props;
		const { duration } = this.state;

		const flooredTime = Math.floor(video.currentTime);
		if (onTimeChange && flooredTime !== this.previousTime) {
			onTimeChange(flooredTime, duration);
			this.previousTime = flooredTime;
		}

		this.setState({
			currentTime: video.currentTime,
		});

		if (video.buffered.length) {
			const buffered = video.buffered.end(video.buffered.length - 1);

			this.setState({ buffered });
		}
	};

	private onCanPlay = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;
		const { onCanPlay } = this.props;
		const { volume, isMuted } = getVolumeFromVideo(video);

		this.setState({
			volume,
			isMuted,
			isLoading: false,
			currentTime: video.currentTime,
			duration: video.duration,
		});

		if (!this.hasCanPlayTriggered) {
			this.hasCanPlayTriggered = true;
			onCanPlay && onCanPlay(event);
		}
	};

	private onPlay = () => {
		this.setState({
			status: 'playing',
		});
	};

	private onPause = () => {
		this.setState({
			status: 'paused',
		});
	};

	private get videoState(): VideoState {
		const { currentTime, volume, status, duration, buffered, isMuted, isLoading, error } =
			this.state;

		return {
			currentTime,
			currentActiveCues: (kind: VideoTextTrackKind, lang: string) =>
				this.videoRef.current?.textTracks.getTrackById(getVideoTextTrackId(kind, lang))
					?.activeCues,
			volume,
			status,
			duration,
			buffered,
			isMuted,
			isLoading,
			error,
		};
	}

	private play = () => {
		this.currentElement && this.currentElement.play();
	};

	private pause = () => {
		this.currentElement && this.currentElement.pause();
	};

	private navigate = (time: number) => {
		this.setState({ currentTime: time });
		this.currentElement && (this.currentElement.currentTime = time);
	};

	private setVolume = (volume: number) => {
		this.setState({ volume });
		this.currentElement && (this.currentElement.volume = volume);
	};

	private setPlaybackSpeed = (playbackSpeed: number) => {
		this.currentElement && (this.currentElement.playbackRate = playbackSpeed);
	};

	private get currentElement(): SourceElement | undefined {
		const { sourceType } = this.props;
		if (sourceType === 'video' && this.videoRef.current) {
			return this.videoRef.current;
		} else if (sourceType === 'audio' && this.audioRef.current) {
			return this.audioRef.current;
		} else {
			return undefined;
		}
	}

	private mute = () => {
		const { volume } = this.state;

		this.previousVolume = volume;
		this.setVolume(0);
	};

	private unmute = () => {
		this.setVolume(this.previousVolume);
	};

	private toggleMute = () => {
		const { volume } = this.videoState;

		if (volume > 0) {
			this.mute();
		} else {
			this.unmute();
		}
	};

	private togglePlay = () => {
		const { status } = this.videoState;

		if (status === 'playing') {
			this.pause();
		} else {
			this.play();
		}
	};

	private get actions(): VideoActions {
		const {
			play,
			pause,
			navigate,
			setVolume,
			setPlaybackSpeed,
			mute,
			unmute,
			toggleMute,
			togglePlay,
		} = this;

		return {
			play,
			pause,
			navigate,
			setVolume,
			setPlaybackSpeed,
			mute,
			unmute,
			toggleMute,
			togglePlay,
		};
	}

	private onDurationChange = (event: SyntheticEvent<SourceElement>) => {
		const video = event.target as SourceElement;

		this.setState({
			duration: video.duration,
		});
	};

	private onError = (event: SyntheticEvent<SourceElement>) => {
		const { onError } = this.props;
		const video = event.target as SourceElement;

		this.setState({
			isLoading: false,
			status: 'errored',
			error: video.error,
		});

		onError && onError(event);
	};

	private onWaiting = () => {
		this.setState({ isLoading: true });
	};

	private renderTracks = (kind: VideoTextTrackKind) => {
		const { textTracks } = this.props;

		if (textTracks && Array.isArray(textTracks[kind]?.tracks)) {
			const tracks = textTracks[kind]?.tracks;
			const selectedIndex = textTracks[kind]?.selectedTrackIndex;

			return (
				<>
					{tracks?.map(({ src, lang, label }, index) => (
						<track
							key={index}
							id={getVideoTextTrackId(kind, lang)}
							kind={kind}
							src={src}
							srcLang={lang}
							label={label}
							default={index === selectedIndex}
						/>
					))}
				</>
			);
		}

		return null;
	};

	render() {
		const { videoState, actions } = this;
		const {
			sourceType,
			poster,
			src,
			children,
			autoPlay,
			controls,
			preload,
			crossOrigin,
			className,
		} = this.props;

		const props: Partial<MediaHTMLAttributes<HTMLVideoElement & HTMLAudioElement>> = {
			src,
			preload,
			controls,
			autoPlay,
			className,
			onLoadedData: this.onLoadedData,
			onPlay: this.onPlay,
			onPause: this.onPause,
			onVolumeChange: this.onVolumeChange,
			onTimeUpdate: this.onTimeUpdate,
			onCanPlay: this.onCanPlay,
			onDurationChange: this.onDurationChange,
			onError: this.onError,
			onWaiting: this.onWaiting,
			crossOrigin,
		};

		if (sourceType === 'video') {
			return children(
				<video
					playsInline
					onClick={actions.togglePlay}
					ref={this.videoRef}
					poster={poster}
					{...props}
				>
					{this.renderTracks('subtitles')}
					{this.renderTracks('captions')}
					{this.renderTracks('descriptions')}
					{this.renderTracks('chapters')}
					{this.renderTracks('metadata')}
				</video>,
				videoState,
				actions,
				this.videoRef
			);
		} else {
			return children(
				<audio ref={this.audioRef} {...props} />,
				videoState,
				actions,
				this.audioRef
			);
		}
	}
}
