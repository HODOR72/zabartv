import { IContent } from './IContent';

interface IHeroMovie {
	id: number;
	block_id: number;
	img_path: string;
	img_base_url: string;
	item_type: null;
	visible: number;
	sort: number;
	content: {
		title: string;
		slogan: string;
		link: string;
		mini_description: string;
		text: string;
	};
}

export interface IPage {
	child_items: {
		blocks: [{ slides: IHeroMovie[] }];
	};
	content: IContent;
}
