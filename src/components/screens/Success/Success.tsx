import { Button } from '@/UI/Button/Button';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import OkImg from '../../Icons/Ok.png';
import styles from './Success.module.scss';

export const Success = () => {
	const { t } = useTranslation();
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.formContainer}>
					<h2 className={styles.formTitle}>{t('Thank you! Payment was successful')}</h2>
					<div>
						<Image src={OkImg} width={96} height={96} />
					</div>
					<Link href="/">
						<Button variant="gradient" className={styles.btn}>
							{t('To main')}
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
