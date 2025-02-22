import axios from 'axios';
import type { Workers } from '../types/healthcareworkers';
import { useHealthCareWorkers } from '../store/healthcareworkers';
import { API_BASE_URL } from '../config/api';

const baseURL = API_BASE_URL;

const store = useHealthCareWorkers();

export const registerHCW = async (data: Workers): Promise<boolean> => {
	try {
		const response = await axios.post<Workers>(
			`${baseURL}/healthcare-workers`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		store.addHCW(response.data);
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

export const getAllHCWS = async () => {
	try {
		const response = await axios.get(`${baseURL}/healthcare-workers`);

		store.setHCWS(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || 'Failed to register hospital'
			);
		}
		throw error;
	}
};
