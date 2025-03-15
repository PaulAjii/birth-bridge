import axios from 'axios';
import type { Hospital } from '../types/hospital';
import { useHospitalStore } from '../store/hospital';

import { API_BASE_URL } from '../config/api';

const baseURL = API_BASE_URL;

const store = useHospitalStore();

export const registerHospital = async (data: Hospital): Promise<boolean> => {
	try {
		const response = await axios.post<Hospital>(
			`${baseURL}/hospital/sign-up`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		if (!response.data) return false;
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

export const getAllHospitals = async (): Promise<void> => {
	try {
		const response = await axios.get<Hospital[]>(`${baseURL}/hospitals`);

		store.setAllHospitals(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || 'Failed to register hospital'
			);
		}
		throw error;
	}
};
