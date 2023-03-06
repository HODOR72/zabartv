import { API_KEY, API_URL } from '@/constants/api';
import { getSessionId } from './getSessionId';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: API_URL,
	params: {
		token: API_KEY,
	}
});

axiosInstance.interceptors.request.use((config: any) => {
    config.params = {...config.params, ...{
		session_id: getSessionId(),
	}};
    return config;
})

export default axiosInstance;
