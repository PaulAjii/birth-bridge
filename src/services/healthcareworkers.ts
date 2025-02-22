import axios from 'axios';
import type { Workers } from '../types/healthcareworkers';
import { useHealthCareWorkers } from '../store/healthcareworkers';
import { useHospitalStore } from '../store/hospital';
import { API_BASE_URL } from '../config/api';
import type { Hospital } from '../types/hospital';

const baseURL = API_BASE_URL;

const store = useHealthCareWorkers();
const hospitalStore = useHospitalStore();

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
		const response = await axios.get<Workers[]>(
			`${baseURL}/healthcare-workers`
		);

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

export const getHospital = async (id: string): Promise<void> => {
	try {
		const hcwResponse = await axios.get<Workers>(
			`${baseURL}/healthcare-workers/${id}`
		);

		const { hospitalID } = hcwResponse.data;

		const allHospitals: Hospital[] = hospitalStore.getAllHospitals;

		const hospitalResponse = allHospitals.find(
			(h: Hospital) => h.id === hospitalID
		);

		if (!hospitalResponse) {
			throw new Error('Hospital not found');
		}

		store.setHospital(hospitalResponse);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || 'Failed to register hospital'
			);
		}
		throw error;
	}
};
