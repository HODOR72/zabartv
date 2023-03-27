export interface IPackage {
	id?: number;
	key?: string;
	price: string;
	period: number;
	visible: number;
	sort?: number;
	content: {
		title: string;
		description?: string;
		badge_1?: string;
		badge_2?: string;
		badge_3?: string;
	};
}
