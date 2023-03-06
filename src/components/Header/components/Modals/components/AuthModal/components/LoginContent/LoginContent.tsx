import { Modal } from '@/UI/Modal/Modal';
import { useTypedActions } from '@/hooks/useTypedActions';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	requiredFieldMessage,
	incorrectlyFieldMessage,
	requiredPasswordMessage,
	shortPasswordMessage,
} from '@/constants/validation';
import { useRouter } from 'next/router';
import { ILoginResponse } from '@/types/IUser';
import { RoutesEnum } from '@/constants/routes';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';

export const LoginContent = ({ authState }: { authState: string }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { ModalInputs, ModalInput, ModalButton, ModalErrorMessage } = Modal;

	const { showAuthModal } = useTypedActions((state) => state.modal);

	const { push } = useRouter();

	const schema = Yup.object().shape({
		email: Yup.string().email(incorrectlyFieldMessage).required(requiredFieldMessage),
		password: Yup.string().min(6, shortPasswordMessage).required(requiredPasswordMessage),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		clearErrors,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	useEffect(clearErrors, [authState]);

	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const { ip } = useTypedSelector((state) => state.auth);
	const { setUser } = useTypedActions((state) => state.auth);

	const login = async ({ identity, password, rememberMe, ip }: ILoginResponse) => {
		try {
			setIsLoading(true);

			const { data } = await axios({
				url: `/session/sign-in`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'post',
				// 37.59.115.136:3128 for test
				data: `identity=${identity}&password=${password}&rememberMe=${rememberMe}&ip=${ip}`,
			}).finally(() => setIsLoading(false));

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = handleSubmit(async (form) => {
		const { email, password } = form;

		try {
			const data = await login({ identity: email, password, rememberMe: 1, ip });

			/* Такой костыль из-за того что бекендер просто возвращает массив со строками, а не обьект */
			if (!data?.hasOwnProperty('id')) {
				setErrorMessages(data);
			} else {
				setUser(data);
				if (typeof window !== 'undefined') {
					window.localStorage.setItem('zabar_session_id', data?.session_id);
				}

				if (localStorage.getItem('isSubscribed')) {
					push(RoutesEnum.Subscribe);
					localStorage.removeItem('isSubscribed');
				} else {
					push(RoutesEnum.Cabinet);
				}

				showAuthModal(false);
			}
		} catch (error) {
			console.error(error);
		}
	});
	const { t } = useTranslation();
	return (
		<form action="#" noValidate onSubmit={handleLogin}>
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
					name="password"
					control={control}
					render={({ field: { value, onChange } }) => {
						return (
							<ModalInput
								type="password"
								placeholder={t('enter password')}
								value={value}
								name="password"
								onChange={onChange}
								errorMessage={errors.password?.message}
								error={errors?.hasOwnProperty('password')}
							/>
						);
					}}
				/>
			</ModalInputs>
			<ModalButton spinner={isLoading} onClick={handleLogin}>
				{t('Sign in')}
			</ModalButton>
		</form>
	);
};
