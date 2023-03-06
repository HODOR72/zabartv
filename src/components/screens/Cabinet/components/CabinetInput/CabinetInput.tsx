import { ChangeEvent, FC, InputHTMLAttributes, useRef, useState } from 'react';
import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { EditIcon, CloseIcon } from '@/icons';
import { Link } from '@/UI/Link/Link';
import { IMaskInput } from 'react-imask';
import classNames from 'classnames';
import styles from './CabinetInput.module.scss';
import { useTranslation } from 'next-i18next';

export interface CabinetInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	mask?: string;
	date?: boolean;
	value: string;
	applyChanges: (value: string) => void;
}

export const CabinetInput: FC<CabinetInputProps> = ({
	applyChanges,
	placeholder,
	mask,
	value,
	label,
	...props
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isEdited, setIsEdited] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const closeField = () => {
		inputRef.current?.blur();
		setIsEdited(false);
	};

	const handleEditInput = () => {
		if (!isEdited) {
			setIsEdited(true);
			inputRef.current?.focus();
		} else {
			setInputValue('');
			closeField();
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleApplyChanges = () => {
		applyChanges(inputValue);
		closeField();
		setInputValue('');
	};
	const { t } = useTranslation();
	return (
		<div data-testid="cabinet-input-item" className={styles.item}>
			<span className={styles.label}>{label}</span>
			{!isEdited && (
				<span onClick={handleEditInput} className={styles.placeholder}>
					{placeholder}
				</span>
			)}
			{mask ? (
				<IMaskInput
					data-testid="cabinet-input-mask"
					mask={mask}
					unmask={true}
					inputRef={inputRef}
					className={classNames(styles.input, !isEdited && styles.value)}
					onAccept={(_, mask) => setInputValue(mask.value)}
					{...props}
				/>
			) : (
				<input
					data-testid="cabinet-input"
					ref={inputRef}
					className={classNames(styles.input, !isEdited && styles.value)}
					value={inputValue}
					onChange={handleChange}
					{...props}
				/>
			)}
			{isEdited && (
				<Link
					disabled={inputValue.length === 0}
					as="button"
					onClick={handleApplyChanges}
					className={styles.apply}
				>
					{t('Save Changes')}
				</Link>
			)}
			<ButtonBase
				data-testid="cabinet-input-button"
				type="button"
				onClick={handleEditInput}
				className={styles.btn}
			>
				{!isEdited ? <EditIcon /> : <CloseIcon />}
			</ButtonBase>
		</div>
	);
};
