import { RegisterModal } from './components/RegisterModal/RegisterModal';
import { AuthModal } from './components/AuthModal/AuthModal';
import { ForgotPasswordModal } from './components/ForgotPasswordModal/ForgotPasswordModal';
import { SubscribeEmpty } from './components/SubscribeEmpty/SubscribeEmpty';
import { SubscribeModal } from './components/SubscribeModal/SubscribeModal';

export const Modals = () => {
	return (
		<>
			<SubscribeModal />
			<SubscribeEmpty />
			<RegisterModal />
			<ForgotPasswordModal />
			<AuthModal />
		</>
	);
};
