import { useState } from 'react';
import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RegisterContent } from './components/RegisterContent/RegisterContent';
import { LoginContent } from './components/LoginContent/LoginContent';
import styles from './AuthModal.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

export const AuthModal = () => {
	const { isVisibleAuthModal } = useTypedSelector((state) => state.modal);

	const { showAuthModal, showForgotPasswordModal } = useTypedActions((state) => state.modal);

	const [authState, setAuthState] = useState<'login' | 'register'>('login');

	const { ModalTabs, ModalTitle, ModalLink } = Modal;

	const handleClose = () => showAuthModal(false);

	const handleShowForgotPasswordModal = () => {
		handleClose();
		showForgotPasswordModal(true);
	};
	const { t } = useTranslation();

	return (
		<Modal fullscreen open={isVisibleAuthModal} onClose={handleClose}>
			<ModalTabs>
				<ModalTitle
					onClick={() => setAuthState('login')}
					activeClassName={authState === 'login'}
				>
					{t('Login')}
				</ModalTitle>
				<ModalTitle
					onClick={() => setAuthState('register')}
					activeClassName={authState === 'register'}
				>
					{t('Registration')}
				</ModalTitle>
			</ModalTabs>
			<div className={classNames(styles.content, authState === 'login' && styles.active)}>
				<LoginContent authState={authState} />
			</div>
			<div className={classNames(styles.content, authState === 'register' && styles.active)}>
				<RegisterContent authState={authState} />
			</div>
			<ModalLink onClick={handleShowForgotPasswordModal} as="button">
				{t('Forgot your password?')}
			</ModalLink>
		</Modal>
	);
};
