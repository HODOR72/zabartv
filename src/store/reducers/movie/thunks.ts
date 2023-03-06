import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getMovieBySlug = createAsyncThunk('movie/getMovieBySlug', async (slug: string) => {
	const { data } = await axios.get('/items/selectdataforslug', {
		params: {
			slug,
		},
	});

	return data;
});

export const getPageBySlug = createAsyncThunk('movie/getMovieBySlug', async (slug: string) => {
	const { data } = await axios.get('/items/selectdataforslug', {
		params: {
			slug,
		},
	});

	return data;
});
