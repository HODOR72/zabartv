import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getFooterMenu = createAsyncThunk('menu/getFooterMenu', async () => {
	const { data } = await axios.get('/navigations/select', {
		params: {
			id: 3,
		},
	});

	return data;
});

export const getNavMenu = createAsyncThunk('menu/getNavMenu', async () => {
	const { data } = await axios.get('/navigations/select', {
		params: {
			id: 4,
		},
	});

	return data;
});
