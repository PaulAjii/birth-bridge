import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'authLogin',
		component: () => import('../views/Hospital/Login.vue'),
		meta: {
			title: 'Login Page',
		},
	},
	{
		path: '/hospital-registration',
		name: 'hospitalRegistration',
		component: () => import('../views/Hospital/HospitalRegistration.vue'),
		meta: {
			title: 'Hospital Registration Page',
		},
	},

	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../views/Hospital/Dashboard.vue'),
		meta: {
			title: 'DashBoard',
		},
	},

	{
		path: '/hcw-registration',
		name: 'hcwRegistration',
		component: () => import('../views/Hospital/HCWAuth.vue'),
		meta: {
			title: 'Healthcare Workers Registration',
		},
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
