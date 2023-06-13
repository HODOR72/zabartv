import { RuIcon, CeIcon, ArrowIcon } from '@/icons';
import { FC, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './Lang.module.scss';

interface LangProps {
	className?: string;
}

export const Lang: FC<LangProps> = ({ className }) => {
	const { locale, asPath } = useRouter();
	const [active, setActive] = useState<boolean>(false);
	const langRef = useRef<HTMLDivElement>(null);

	const toggleActive = () => {
		setActive(!active);
	};

	useOnClickOutside(langRef, () => setActive(false));

	const items = [
		{ icon: <RuIcon />, txt: 'Русский язык', locale: 'ru' },
		{ icon: <CeIcon />, txt: 'Чеченский язык', locale: 'che' },
	];

	return (
		<div
			ref={langRef}
			onClick={toggleActive}
			className={classNames(styles.lang, active && styles.active, className)}
		>
			<ul className={classNames('list-reset', styles.list)}>
				{items && items?.length && items?.map((el) => (
					<li
						key={el.locale}
						className={classNames(styles.item, locale === el?.locale && styles.selected)}
					>
						<NextLink href={asPath} locale={el.locale}>
							<a className={styles.link}>
								{el?.icon}
								<span className={styles.txt}>{el?.txt}</span>
							</a>
						</NextLink>
					</li>
				))}
			</ul>
			<span className={styles.arrow}>
				<ArrowIcon />
			</span>
		</div>
	);
};
