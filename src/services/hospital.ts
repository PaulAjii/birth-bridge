import axios from 'axios';
import type { Hospital } from '../types/hospital';
import { useHospitalStore } from '../store/hospital';

import { API_BASE_URL } from '../config/api';

const baseURL = API_BASE_URL;

const store = useHospitalStore();

export const registerHospital = async (data: Hospital): Promise<boolean> => {
	try {
		const response = await axios.post<Hospital>(
			`${baseURL}/hospitals`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		store.addHospital(response.data);
		return true;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || 'Failed to register hospital'
			);
		}
		throw error;
	}
};
