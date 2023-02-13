import { Button } from '@/UI/Button/Button';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import OkImg from '../../Icons/Ok.png';
import styles from './Success.module.scss';

export const Success = () => {
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.formContainer}>
					<h2 className={styles.formTitle}>Спасибо! Оплата прошла успешно</h2>
					<div>
						<Image src={OkImg} width={96} height={96} />
					</div>
					<Link href="/">
						<Button variant="gradient" className={styles.btn}>
							На главную
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
