import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getHomeCategories = createAsyncThunk('home/getHomeCategories', async () => {
	const { data } = await axios.get('/items/selectdataonhome');

	return data;
});

export const getHeroMovies = createAsyncThunk('home/getHeroMovies', async () => {
	const { data } = await axios.get('/pages/incat', {
		params: {
			cat_id: 1,
		},
	});

	return data;
});
