import { Tabs as UITabs, TabItem } from '@/UI/Tabs/Tabs';
import { Title as UITitle } from '@/UI/Title/Title';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './Category.module.scss';

export const Category = ({ children }: PropsWithChildren) => {
	return (
		<section className={styles.section}>
			<div className={classNames('container', styles.container)}>{children}</div>
		</section>
	);
};

const Title = ({ children }: PropsWithChildren) => {
	return <UITitle className={styles.title}>{children}</UITitle>;
};

const Tabs = ({ tabs, setNewFilms }: { tabs: TabItem[]; setNewFilms?: any }) => {
	return <UITabs className={styles.tabs} tabs={tabs} setNewFilms={setNewFilms} />;
};

Category.Title = Title;
Category.Tabs = Tabs;
