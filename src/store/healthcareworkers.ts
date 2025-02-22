import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Workers } from '../types/healthcareworkers';

export const useHealthCareWorkers = defineStore('hcw', () => {
	const hcws = ref<Workers[]>(
		JSON.parse(localStorage.getItem('hcws') || '[]')
	);
	const currentHCW = ref<Workers | null>(
		JSON.parse(localStorage.getItem('hcw') || 'null')
	);

	const addHCW = (hcw: Workers) => {
		hcws.value.push(hcw);
	};

	const getHCWS = computed(() => hcws.value);
	const getCurrentHCW = computed(() => currentHCW.value);

	const setHCWS = (data: Workers[]) => {
		hcws.value = data;
		localStorage.setItem('hcws', JSON.stringify(data));
	};

	watch(
		hcws,
		(newValue) => {
			localStorage.setItem('hcws', JSON.stringify(newValue));
		},
		{ deep: true }
	);

	const login = (data: Workers) => {
		currentHCW.value = data;
		localStorage.setItem('currentHCW', JSON.stringify(data));
	};

	const logout = () => {
		currentHCW.value = null;
		localStorage.removeItem('currentHCW');
	};

	return {
		addHCW,
		getHCWS,
		hcws,
		setHCWS,
		login,
		logout,
		getCurrentHCW,
	};
});
