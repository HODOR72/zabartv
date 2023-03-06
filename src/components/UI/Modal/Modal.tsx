import { ButtonHTMLAttributes, forwardRef, PropsWithChildren, useEffect } from 'react';
import { Title, TitleProps } from '@/UI/Title/Title';
import { TextField, TextFieldProps } from '@/UI/TextField/TextField';
import { Button, ButtonProps } from '@/UI/Button/Button';
import { Link, LinkProps } from '@/UI/Link/Link';
import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { CloseIcon } from '@/icons';
import { Portal } from '@/components/Portal/Portal';
import { CSSTransition } from 'react-transition-group';
import { useLockedBody } from 'usehooks-ts';
import styles from './Modal.module.scss';
import classNames from 'classnames';

interface ModalProps {
	open: boolean;
	className?: string;
	variant?: 'grade' | 'gradient';
	fullscreen?: boolean;
	gradient?: boolean;
	onClose: () => void;
}

interface ModalTitleProps extends TitleProps {
	activeClassName?: boolean;
	className?: string;
}

function Modal({
	children,
	className,
	variant,
	open,
	fullscreen,
	onClose,
}: PropsWithChildren<ModalProps>) {
	const { ModalClose } = Modal;

	useLockedBody(open);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => event.code === 'Escape' && onClose();

		document.addEventListener('keydown', handleEscapeKey);

		return () => document.removeEventListener('keydown', handleEscapeKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CSSTransition in={open} timeout={300} classNames="modal">
			<Portal rootId="#modal">
				{open && (
					<div
						onClick={onClose}
						className={classNames(styles.modal, fullscreen && styles.fullscreen)}
					>
						<div
							className={classNames(
								styles.content,
								variant === 'gradient' && styles.gradient,
								variant === 'grade' && styles.grade,
								className
							)}
							onClick={(e) => e.stopPropagation()}
						>
							{children}
							<ModalClose onClick={onClose} />
						</div>
					</div>
				)}
			</Portal>
		</CSSTransition>
	);
}

module Modal {
	export const ModalTitle = ({
		children,
		activeClassName,
		size = 'medium',
		className,
		...props
	}: PropsWithChildren<ModalTitleProps>) => {
		return (
			<Title
				className={classNames(styles.title, activeClassName && styles.titleActive, className)}
				level="h2"
				size={size}
				{...props}
			>
				{children}
			</Title>
		);
	};

	export const ModalTabs = ({ children }: PropsWithChildren<{}>) => {
		return <div className={styles.tabs}>{children}</div>;
	};

	export const ModalDesc = ({ children }: PropsWithChildren<{}>) => {
		return <p className={styles.desc}>{children}</p>;
	};

	export const ModalInputs = ({ children }: PropsWithChildren<{}>) => {
		return <div className={styles.inputs}>{children}</div>;
	};

	export const ModalInput = forwardRef(({ ...props }: TextFieldProps, ref) => {
		return <TextField className={styles.input} {...props} />;
	});

	export const ModalErrorMessage = ({ children }: PropsWithChildren<{}>) => {
		return <span className={styles.errorMessage}>{children}</span>;
	};

	export const ModalButton = forwardRef(
		({ children, ...props }: PropsWithChildren<ButtonProps>, ref) => {
			return (
				<Button className={styles.btn} {...props}>
					{children}
				</Button>
			);
		}
	);

	export const ModalLink = forwardRef(({ children, ...props }: PropsWithChildren<LinkProps>, ref) => {
		return (
			<Link className={styles.link} {...props}>
				{children}
			</Link>
		);
	});

	export const ModalClose = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
		return (
			<ButtonBase className={styles.close} {...props}>
				<CloseIcon />
			</ButtonBase>
		);
	};

	ModalButton.displayName = 'ModalButton.tsx';
	ModalLink.displayName = 'ModalLink.tsx';
	ModalInput.displayName = 'ModalInput.tsx';
}

export { Modal };
