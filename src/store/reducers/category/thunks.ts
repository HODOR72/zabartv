import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getCategory = createAsyncThunk('category/getMovieBySlug', async (slug: string) => {
	const { data } = await axios.get('/items/selectfullsectiondata', {
		params: {
			slug,
		},
	});

	return data;
});
