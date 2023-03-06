export interface IPartData {
	description: string;
	mini_description: string;
	film_base_url: string;
	film_path: string;
	number: number;
	preview_base_url: string;
	preview_path: string;
	season_id: number;
	sort: number;
	stat_frame: string;
	stat_url: string;
	stream_film_link: string;
	visible: number;
}

export interface IPart {
	season_data: IPartData[];
	season_film_id: number;
	season_number: number;
	season_sort: number;
	season_visible: number;
}
