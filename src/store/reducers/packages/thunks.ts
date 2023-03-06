import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export const getPackages = createAsyncThunk('packages/getPackages', async () => {
	const { data } = await axios.get('/packages/list');

	return data;
});
