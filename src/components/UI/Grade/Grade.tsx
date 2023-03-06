import { FC, useState } from 'react';
import classNames from 'classnames';
import styles from './Grade.module.scss';
import { useTranslation } from 'next-i18next';

interface GradeProps {
	value: number;
	setValue: (idx: number) => void;
}

export const Grade: FC<GradeProps> = ({ value, setValue }) => {
	const [hover, setHover] = useState<number | null>(null);
	const { t } = useTranslation();
	return (
		<div className={styles.container}>
			<div className={styles.grades}>
				{[...Array(10)].map((_, idx) => {
					const ratingValue = idx + 1;

					const isActive = ratingValue <= (hover || value);

					return (
						<label
							key={idx}
							className={classNames(styles.label, isActive && styles.active)}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						>
							<input
								className={styles.radio}
								type="radio"
								value={ratingValue}
								onClick={() => setValue(ratingValue)}
							/>
							{ratingValue}
						</label>
					);
				})}
			</div>
			<div className={styles.row}>
				<span className={styles.caption}>{t('Very bad')}</span>
				<span className={styles.caption}>{t('Great')}</span>
			</div>
		</div>
	);
};
