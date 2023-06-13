import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from 'react-tabs';

import classNames from 'classnames';

import styles from './Tabs.module.scss';
import axios from '@/utils/axios';
import React from 'react';

export type TabItem = {
	txt: string;
	id?: string;
	condition?: unknown;
	content: ReactNode;
};

interface TabsProps {
	tabs: TabItem[];
	className?: string;
	setNewFilms?: any;
}

export const Tabs: FC<TabsProps> = ({ className, tabs, setNewFilms }) => {
	const [totalPages, setTotalPages] = useState<any>({});
	const [currentPage, setCurrentPage] = useState<any>({});
	const [paginationLink, setPaginationLink] = useState<any>({});

	const handleShowMore = async (id: any) => {
		const pagLink = paginationLink[id] ? paginationLink[id] : null;
		try {
			let { data } = await axios({
				url: pagLink ? pagLink : `/items/selectforcat?id=${id}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'get',
			});
			const link = data?._links?.next?.href
				.split('/')
				.slice(5, data._links.next.href.length)
				.join('/');
			let { data: newData } = await axios({
				url: link,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'get',
			});
			setTotalPages((prevTotalPages: any) => ({
				...prevTotalPages,
				[id]: data._meta.pageCount,
			}));
			setCurrentPage((prevCurrentPage: any) => ({
				...prevCurrentPage,
				[id]: (prevCurrentPage[id] || 0) + 1,
			}));
			setNewFilms((prevNewFilms: any) => ({
				...prevNewFilms,
				[id]: newData.items,
			}));
			setPaginationLink((prevPaginationLink: any) => ({
				...prevPaginationLink,
				[id]: link,
			}));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<ReactTabs selectedTabClassName={styles.selected} className={classNames(styles.tabs, className)}>
			<div className={styles.wrapper}>
				<TabList className={styles.list}>
					{tabs &&
						tabs.map((el: TabItem) => {
							const { txt, condition = true } = el;
							return (
								<Fragment key={txt}>
									{condition ? <Tab className={styles.tab}>{txt}</Tab> : null}
								</Fragment>
							);
						})}
				</TabList>
			</div>
			{tabs &&
				tabs?.length > 0 &&
				tabs?.map((el: TabItem) => {
					let { txt, content, id, condition = true } = el;
					const currPage = id && currentPage[id] ? currentPage[id] : 1;
					return (
						<Fragment key={txt}>
							{condition ? (
								<TabPanel>
									{content}
									{React.isValidElement(content) &&
										//@ts-ignore
										content.props?.items?.length > 11 &&
										(id && totalPages[id]
											? totalPages[id] > currPage
											: 2 > currPage) && (
											<button
												className={styles.btn}
												onClick={() => handleShowMore(id)}
											>
												<svg
													width="10"
													height="13"
													viewBox="0 0 10 13"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M5.65 1C5.65 0.641015 5.35899 0.35 5 0.35C4.64101 0.35 4.35 0.641015 4.35 1L5.65 1ZM4.54038 12.4596C4.79422 12.7135 5.20578 12.7135 5.45962 12.4596L9.59619 8.32304C9.85004 8.0692 9.85004 7.65765 9.59619 7.40381C9.34235 7.14997 8.9308 7.14997 8.67696 7.40381L5 11.0808L1.32305 7.40381C1.0692 7.14997 0.657647 7.14997 0.403806 7.40381C0.149966 7.65765 0.149966 8.0692 0.403807 8.32304L4.54038 12.4596ZM4.35 1L4.35 12L5.65 12L5.65 1L4.35 1Z"
														fill="white"
													/>
												</svg>
												Показать еще
											</button>
										)}
								</TabPanel>
							) : null}
						</Fragment>
					);
				})}
		</ReactTabs>
	);
};
