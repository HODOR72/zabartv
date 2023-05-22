import { Social } from '@/components/Footer/components/Social/Social';
import { Support } from './components/Support/Support';
import NextLink from 'next/link';
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Footer.module.scss';
import { useTranslation } from 'next-i18next';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import axios from '@/utils/axios';

interface FooterProps {
	sticky?: boolean;
}

export const Footer: FC<FooterProps> = ({ sticky }) => {
	const { footerMenu, navMenu } = useTypedSelector((state) => state?.menu);
	const [footerKey, setFooterKey] = useState<string | undefined>();

	useEffect(() => {
		handleKey();
	}, []);

	const menu = [
		{
			title: 'About us',
			items: footerMenu,
		},
		{
			title: 'Sections',
			items: navMenu,
		},
	];

	const { t } = useTranslation();

	const handleKey = async () => {
		try {
			const { data } = await axios.get('/key-storage/list', {
				params: {
					key: 'footer-copy',
				},
			});
			if (data.value) {
				setFooterKey(data?.value);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<footer className={classNames(styles.footer, sticky && styles.sticky)}>
			<div className={styles.top}>
				<div className={classNames('container', styles.topContainer)}>
					<div className={styles.left}>
						{menu &&
							menu?.length > 1 &&
							menu?.map((item) => {
								return (
									<div key={item?.title} className={styles.col}>
										<h2 className={styles.title}>{t(item?.title)}</h2>
										<ul className={classNames('list-reset', styles.list)}>
											{item?.items &&
												item?.items?.length >= 1 &&
												item?.items?.map((el) => {
													const link =
														el?.full_link?.split('/')?.[
															el?.full_link?.split('/')?.length - 1
														];

													return (
														<li key={el?.id} className={styles.item}>
															<NextLink href={link}>
																<a className={styles.link}>
																	{t(el?.slug)}
																</a>
															</NextLink>
														</li>
													);
												})}
										</ul>
									</div>
								);
							})}
					</div>
					<Support />
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={classNames('container', styles.bottomContainer)}>
					<span className={styles.copy}>{footerKey}</span>
					<Social />
					{/* <p className={styles.desc}>
						{t('Design and development')} -&nbsp;
						<a
							target={'_blank'}
							rel={'noreferrer'}
							href="https://rusodot.ru/"
							className={styles.descLink}
						>
							RUSO
						</a>
					</p> */}
				</div>
			</div>
		</footer>
	);
};
