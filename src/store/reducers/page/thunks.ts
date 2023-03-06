import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getPage = createAsyncThunk('page/getMovieBySlug', async (slug: string) => {
	const { data } = await axios.get('/pages/selectdataforslug', {
		params: {
			slug,
		},
	});

	return data;
});
