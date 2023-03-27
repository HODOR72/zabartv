import { Button } from '@/UI/Button/Button';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import ErrorImg from '../../Icons/Error.png';
import styles from './Error.module.scss';

export const Error = () => {
	const { t } = useTranslation();
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.formContainer}>
					<h2 className={styles.formTitle}>{t('Payment failed!')}</h2>
					<div>
						<Image src={ErrorImg} width={96} height={96} />
					</div>
					<Link href="/">
						<Button variant="gradient" className={styles.btn}>
							{t('Repeat')}
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
