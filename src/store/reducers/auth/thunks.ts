import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getIP = createAsyncThunk('auth/ip', async () => {
	const {
		data: { ip },
	} = await axios.get('https://api.ipify.org/?format=json');

	return ip;
});
