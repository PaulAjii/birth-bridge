import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Hospital } from '../types/hospital';
import type {ResponseData} from "../types/userAuth.types"

export const useHospitalStore = defineStore('hospital', () => {
	const hospitals = ref<Hospital[]>([]);
	const currentHospital = ref<ResponseData | null>(
		JSON.parse(localStorage.getItem('currentHospital') || 'null')
	);
	// const isAuthenticated = ref(false)

	// Getters
	const getAllHospitals = computed(() => hospitals.value);
	const getCurrentHospital = computed(() => currentHospital.value);

	const setAllHospitals = (data: Hospital[]) => {
		hospitals.value = data;
	};

	// Actions
	const addHospital = (hospital: Hospital) => {
		hospitals.value.push(hospital);
	};

	const login = (data: ResponseData) => {
		currentHospital.value = data;
		localStorage.setItem('currentHospital', JSON.stringify(data));
	};

	return {
		hospitals,
		getAllHospitals,
		addHospital,
		getCurrentHospital,
		setAllHospitals,
		login,
	};
});
