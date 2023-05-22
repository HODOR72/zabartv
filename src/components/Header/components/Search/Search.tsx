import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTypedActions } from '@/hooks/useTypedActions';
import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { useOnClickOutside } from 'usehooks-ts';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CloseIcon, SearchIcon } from '@/icons';
import { useDebounce } from '@/hooks/useDebounce';
import { TextField } from '@/UI/TextField/TextField';
import styles from './Search.module.scss';
import classNames from 'classnames';
import { SearchList } from './components/SearchList/SearchList';
import { useTranslation } from 'next-i18next';

interface SearchProps {
	className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => {
	const { isSearchVisible } = useTypedSelector((state) => state.search);
	const { setVisibleSearch } = useTypedActions((state) => state.search);
	const [value, setValue] = useState<string>('');
	const { debouncedValue, setDebouncedValue } = useDebounce(value.trim(), 400);
	const searchRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		setVisibleSearch(false);
		setValue('');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	useOnClickOutside(searchRef, () => setVisibleSearch(false));

	useEffect(() => {
		if (isSearchVisible) {
			inputRef?.current?.focus();
		}
	}, [isSearchVisible]);

	const handleClose = () => {
		inputRef?.current?.blur();
		setVisibleSearch(false);
	};

	const isActive = debouncedValue && isSearchVisible;
	const { t } = useTranslation();

	return (
		<div
			ref={searchRef}
			className={classNames(styles.form, isSearchVisible && styles.visible, className)}
		>
			<TextField
				variant="dark"
				className={styles.search}
				ref={inputRef}
				type="search"
				value={value}
				onChange={handleChange}
				placeholder={t ? t('Search') : ''}
			/>
			<ButtonBase type="button" className={styles.close} onClick={handleClose}>
				<CloseIcon />
			</ButtonBase>
			<span className={styles.icon}>
				<SearchIcon />
			</span>
			{isActive && <SearchList value={debouncedValue} />}
		</div>
	);
};