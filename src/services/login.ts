import axios from 'axios';
import { useHospitalStore } from '../store/hospital';
import type { AuthData, APIResponse } from '../types/userAuth.types';

import { API_BASE_URL } from '../config/api';

const baseURL = API_BASE_URL;
const hospitalStore = useHospitalStore();

export const login = async (body: AuthData): Promise<APIResponse> => {
	try {
		const response = await axios.post(`${baseURL}/hospital/sign-in`, body, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		const jsonData: APIResponse = await response.data;
		if (!jsonData.data) {
			return {
				status: 'error',
				message: 'No data received',
			};
		}

		hospitalStore.login(jsonData.data);

		return jsonData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || 'Login failed');
		}
		throw error;
	}
};
