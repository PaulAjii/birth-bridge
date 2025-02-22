import axios from 'axios';
import type { Hospital } from '../types/hospital';
import type { Workers } from '../types/healthcareworkers';
import { useHospitalStore } from '../store/hospital';
import { useHealthCareWorkers } from '../store/healthcareworkers';

import { API_BASE_URL } from '../config/api';

const baseURL = API_BASE_URL;
const hospitalStore = useHospitalStore();
const hcwStore = useHealthCareWorkers();

export const login = async (
	email: string,
	password: string
): Promise<boolean> => {
	try {
		const hospitalResponse = await axios.get(`${baseURL}/hospitals`);

		const hospital = hospitalResponse.data.find(
			(h: Hospital) =>
				h.email_address === email && h.password === password
		);
		if (hospital) {
			hospitalStore.login(hospital);
			localStorage.removeItem('currentHCW');
			return true;
		}

		const hcwResponse = await axios.get(`${baseURL}/healthcare-workers`);
		const hcw = hcwResponse.data.find(
			(h: Workers) => h.email_address === email && h.password === password
		);

		if (hcw) {
			hcwStore.login(hcw);
			localStorage.removeItem('currentHospital');
			return true;
		}

		return false;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || 'Login failed');
		}
		throw error;
	}
};
