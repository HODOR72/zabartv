import { IMovieItem } from './IMovieItem';
import { IDataInfo } from './IDataInfo';
import { IUserData } from './IUserData';

export interface ISubCategory extends IDataInfo {
	badge: string;
	class: string;
	content: {
		mini_description?: null;
		seo_description?: string;
		seo_keywords?: string;
		seo_title?: string;
		slogan?: string;
		text?: string;
		title: string;
		title_in_nav: string;
	};
	films: {
		items: [IMovieItem[]];
	};
	customer_group: number;
}

export interface ICategory extends IDataInfo {
	badge: string;
	child_items: ISubCategory[];
	class: string;
	content: {
		title_in_nav: string;
	};
	customer_group: number;
	full_link: string;
	icon: string;
	id: number;
	link: string;
	old_slug: string;
	user_data: IUserData;
}
