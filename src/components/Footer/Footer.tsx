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
	const { footerMenu, navMenu } = useTypedSelector((state) => state.menu);
	const [footerKey, setFooterKey] = useState();

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
			setFooterKey(data.value);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<footer className={classNames(styles.footer, sticky && styles.sticky)}>
			<div className={styles.top}>
				<div className={classNames('container', styles.topContainer)}>
					<div className={styles.left}>
						{menu?.map((item) => {
							const { title, items } = item;
							console.log(items)
							return (
								<div key={title} className={styles.col}>
									<h2 className={styles.title}>{t(title)}</h2>
									<ul className={classNames('list-reset', styles.list)}>
										{items?.map((el) => (
											<li key={el.id} className={styles.item}>
												{/* @ts-ignore */}
												<NextLink href={el.full_link.split('/').at(-1)}>
													<a className={styles.link}>
														{/* @ts-ignore */}
														{t(el.slug)}
													</a>
												</NextLink>
											</li>
										))}
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
					<p className={styles.desc}>
						{t('Design and development')} -&nbsp;
						<a
							target={'_blank'}
							rel={'noreferrer'}
							href="https://rusodot.ru/"
							className={styles.descLink}
						>
							RUSO
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};
