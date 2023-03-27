import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Title } from '@/UI/Title/Title';
import classNames from 'classnames';
import Head from 'next/head';
import styles from './About.module.scss';

export const About = () => {
	const { data } = useTypedSelector((state) => state.page);

	const { content, child_items } = { ...data[0] };

	const { content: block } = { ...child_items?.blocks[0] };

	return (
		<section className={styles.section}>
			<Head>
				<title>{content?.title_in_nav}</title>
				<meta name="description" content={content?.seo_description} />
				<meta name="keywords" content={content?.seo_keywords} />
				<meta property="og:description" content={content?.seo_description} />
			</Head>
			<div className={classNames('container', styles.container)}>
				<Title className={styles.title}>{block?.title}</Title>
				<div
					className={styles.desc}
					dangerouslySetInnerHTML={{ __html: block?.text! }}
				/>
			</div>
		</section>
	);
};
