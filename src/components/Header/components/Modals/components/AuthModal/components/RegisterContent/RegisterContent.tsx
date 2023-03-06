import { useTypedActions } from '@/hooks/useTypedActions';
import { Modal } from '@/UI/Modal/Modal';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requiredFieldMessage, incorrectlyFieldMessage } from '@/constants/validation';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export const RegisterContent = ({ authState }: { authState: string }) => {
	const { ModalInputs, ModalInput, ModalButton } = Modal;

	const { setEmail, setName } = useTypedActions((state) => state.auth);
	const { showAuthModal, showRegisterModal } = useTypedActions((state) => state.modal);

	const schema = Yup.object().shape({
		email: Yup.string().email(incorrectlyFieldMessage).required(requiredFieldMessage),
		name: Yup.string().required(requiredFieldMessage),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		clearErrors,
	} = useForm({
		defaultValues: {
			email: '',
			name: '',
		},
		resolver: yupResolver(schema),
	});

	const handleRegister = handleSubmit((data) => {
		const { email, name } = data;

		setEmail(email);
		setName(name);
		showAuthModal(false);
		showRegisterModal(true);
	});
	const { t } = useTranslation();
	useEffect(clearErrors, [authState]);

	return (
		<form action="#" noValidate onSubmit={handleRegister}>
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
				<Controller
					name="name"
					control={control}
					render={({ field: { value, onChange } }) => {
						return (
							<ModalInput
								errorMessage={errors.name?.message}
								error={errors?.hasOwnProperty('name')}
								value={value}
								onChange={onChange}
								name="name"
								type="text"
								placeholder={t('Your name')}
							/>
						);
					}}
				/>
			</ModalInputs>
			<ModalButton>{t('Confirm email')}</ModalButton>
		</form>
	);
};
