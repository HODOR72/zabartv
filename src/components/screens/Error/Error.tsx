import { Button } from '@/UI/Button/Button';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ErrorImg from '../../Icons/Error.png';
import styles from './Error.module.scss';

export const Error = () => {
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>
				<div className={styles.formContainer}>
					<h2 className={styles.formTitle}>Оплата прошла безуспешно!</h2>
					<div>
						<Image src={ErrorImg} width={96} height={96} />
					</div>
					<Link href="/">
						<Button variant="gradient" className={styles.btn}>
							Повторить
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
