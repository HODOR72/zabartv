import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IUser } from '@/types/IUser';
import { updateUser, getMe } from '@/reducers/user/thunks';
import { Checkbox } from '@/UI/Checkbox/Checkbox';
import { FC, useState } from 'react';
import { CabinetInput } from '../index';
import styles from './Settings.module.scss';

interface SettingsProps {
	data: IUser;
}

export const Settings: FC<SettingsProps> = ({ data }) => {

	const dispatch = useAppDispatch();

	const { email, date_of_birth } = data;

	const [password] = useState('');

	const [isSubscribedEmail, setIsSubscribedEmail] = useState<boolean>(false);

	const handleSubscribeEmail = () => setIsSubscribedEmail(!isSubscribedEmail);

	const applyEmail = async (email: string) => {
		await dispatch(updateUser({ email, date_of_birth, password }));

		await dispatch(getMe());
	};

	const applyDate = async (date_of_birth: string) => {
		await dispatch(updateUser({ email, date_of_birth, password }));

		await dispatch(getMe());
	};

	const applyPassword = async (password: string) => {
		await dispatch(updateUser({ email, date_of_birth, password }));

		await dispatch(getMe());
	};

	return (
		<div className={styles.settings}>
			<div className={styles.row}>
				<CabinetInput
					label="Электронная почта"
					type="email"
					value={email}
					placeholder={email}
					applyChanges={applyEmail}
				/>
				<CabinetInput
					label="Пароль"
					type="password"
					value={password}
					placeholder="Введите пароль"
					applyChanges={applyPassword}
				/>
				<CabinetInput
					mask='00.00.0000'
					label="Дата рождения"
					type="text"
					placeholder={date_of_birth !== null ? date_of_birth : 'Введите дату рождения'}
					value={date_of_birth}
					applyChanges={applyDate}
				/>
			</div>
			<Checkbox
				checked={isSubscribedEmail}
				onChange={handleSubscribeEmail}
				label="Получать новости и спецпредложния на эл.почту"
			/>
		</div>
	);
};
