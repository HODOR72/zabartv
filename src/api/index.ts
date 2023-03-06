import { ICheckRating } from '@/types/ICheckRating';
import axios from '@/utils/axios';
import { getLocale } from '@/utils/getLocale';

class BaseApi {
	async setLang(locale: string) {
		const newLocale = getLocale(locale);

		await axios.get(`/languages/index?lang=${newLocale}`);
	}

	async getRating(id: number | undefined) {
		const { data } = await axios.get<ICheckRating>('/items/rating', {
			params: {
				film_id: id,
				type: 'check',
			},
		});

		return data;
	}
}

export const baseApi = new BaseApi();
