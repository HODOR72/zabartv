import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './ForgotPasswordModal.module.scss';
import { requiredFieldMessage, incorrectlyFieldMessage } from '@/constants/validation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from '@/utils/axios';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export const ForgotPasswordModal = () => {
	const [success, setSuccess] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const { isVisibleForgotPasswordModal } = useTypedSelector((state) => state.modal);
	const { showForgotPasswordModal } = useTypedActions((state) => state.modal);
	const { ModalTitle, ModalDesc, ModalInputs, ModalInput, ModalButton, ModalErrorMessage } = Modal;
	const handleClose = () => showForgotPasswordModal(false);
	const { t } = useTranslation();
	const schema = Yup.object().shape({
		email: Yup.string().email(t(incorrectlyFieldMessage)).required(t(requiredFieldMessage)),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(schema),
	});

	const request = async (email: string) => {
		try {
			setIsLoading(true);

			const { data } = await axios({
				url: `/session/password-reset-request`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'post',
				data: `email=${email}`,
			}).finally(() => setIsLoading(false));

			return data;
		} catch (e) {
			console.error(e);
		}
	};


	const handleSubmitForm = handleSubmit(async (form) => {
		const { email } = form;

		const data = await request(email);

		if (!data?.hasOwnProperty('status')) {
			setErrorMessages(data);
		} else {
			if (data.status === 'success') {
				setSuccess(t('The letter has been sent to your email!'));
			}
		}
	});

	return (
		<Modal fullscreen open={isVisibleForgotPasswordModal} onClose={handleClose}>
			<ModalTitle className={styles.title}>{t('Forgot your password?')}</ModalTitle>
			<ModalDesc>{t('We will send you an email with a link to change your password')}</ModalDesc>
			<form action="#" noValidate onSubmit={handleSubmitForm}>
				<ModalInputs>
					<Controller
						name="email"
						control={control}
						render={({ field: { value, onChange } }) => {
							return (
								<ModalInput
									errorMessage={errors?.email?.message}
									error={errors?.hasOwnProperty('email')}
									value={value}
									onChange={onChange}
									name="email"
									type="email"
									placeholder={t('Email')}
								/>
							);
						}}
					/>
					{errorMessages.length > 0
						? errorMessages?.map((error) => (
								<ModalErrorMessage key={error}>{error}</ModalErrorMessage>
						  ))
						: null}
				</ModalInputs>
				<ModalButton spinner={isLoading} onClick={handleSubmitForm}>
					{t('Get a letter')}
				</ModalButton>
				{success ? <span className={styles.success}>{success}</span> : null}
			</form>
		</Modal>
	);
};
