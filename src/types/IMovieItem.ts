import { IOption } from './IOption';

export interface IMovieItem {
	badge?: null;
	content: {
		mini_description?: null;
		slogan?: string;
		text?: string;
		theme?: string;
		title?: string;
	};
	hours?: number;
	id?: number;
	img_base_url?: string;
	img_path?: string;
	preview_base_url: string;
	preview_path: string;
	link?: null;
	main_catalog?: null;
	minutes?: number;
	options?: IOption[];
	other_data_1?: null;
	other_data_2?: null;
	other_data_3?: null;
	other_data_4?: null;
	other_data_5?: null;
	rating?: string;
	slug?: string;
	sort?: number;
	type?: number;
	customer_group?: number
	visible?: number;
}
