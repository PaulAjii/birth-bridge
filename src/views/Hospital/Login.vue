<template>
	<OnboardingBg
		bgGradientPosition="bg-gradient-to-b"
		bgGradientFrom="from-primary-300"
		bgGradientTo="to-neutral"
	>
		<div class="bg-neutral w-[700px] h-[700px] absolute p-8">
			<form class="w-full h-full flex flex-col justify-between">
				<div class="w-full h-full font-manrope">
					<FormHead text="Login into your account" />

					<div class="w-full flex flex-col gap-8">
						<div class="w-full flex flex-col gap-2">
							<label
								for="email"
								class="text-base font-medium text-neutral-700"
							>
								Email
							</label>

							<input
								type="email"
								name="email"
								id="email"
								class="w-full flex flex-col gap-4 outline-none p-4 bg-neutral-200 text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
								:class="{
									'border-primary border-2 border-solid':
										emailError,
								}"
								placeholder="Enter password"
								v-model="userData.email"
								@blur="handleEmailBlur"
							/>
							<FormError :error="emailError" />
						</div>

						<div class="w-full flex flex-col gap-2">
							<label
								for="password"
								class="text-base font-medium text-neutral-700"
							>
								Password
							</label>

							<input
								type="password"
								name="password"
								id="password"
								class="w-full flex flex-col gap-4 outline-none p-4 bg-neutral-200 text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
								placeholder="Enter your password"
								:class="{
									'border-primary border-2 border-solid':
										passwordError,
								}"
								v-model="userData.password"
								@blur="handlePasswordBlur"
							/>

							<FormError :error="passwordError" />
						</div>
					</div>
				</div>

				<button
					class="w-full bg-primary py-4 px-6 rounded-xl text-neutral"
					:class="{
						hidden: !isFormValid,
					}"
					type="button"
					@click="handleLogin"
				>
					Continue
				</button>
			</form>
		</div>
	</OnboardingBg>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import OnboardingBg from './components/OnboardingBg.vue';
	import FormHead from '../Hospital/components/FormHead.vue';
	import FormError from '../../components/FormError.vue';
	import type { UserAuth } from '../../types/userAuth.types';
	import { login } from '../../services/login';
	import router from '../../router/index';
	import { useHospitalStore } from '../../store/hospital';
	import { useHealthCareWorkers } from '../../store/healthcareworkers';

	const userData = ref<UserAuth>({
		email: '',
		password: '',
	});

	const touchedFields = ref({
		email: false,
		password: false,
	});

	const checkEmail = (value: string): boolean => {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;

		return true;
	};

	const emailError = computed((): string => {
		if (!touchedFields.value.email) return '';
		if (!userData.value.email) return 'Enter your Email';
		if (userData.value.email === '') return 'Email is required';
		if (checkEmail(userData.value.email) === false)
			return 'Invalid Email format';
		return '';
	});

	const passwordError = computed((): string => {
		if (!touchedFields.value.password) return '';
		if (!userData.value.password) return 'Enter your password';
		if (userData.value.password === '') return 'Password is required';
		if (userData.value.password.length < 8)
			return 'Password must be at least 8 characters';
		return '';
	});

	const handlePasswordBlur = () => {
		touchedFields.value.password = true;
	};

	const handleEmailBlur = () => {
		touchedFields.value.email = true;
	};

	const isFormValid = computed(() => {
		return (
			userData.value.email &&
			userData.value.password &&
			!emailError.value &&
			!passwordError.value
		);
	});

	const handleLogin = async () => {
		try {
			touchedFields.value.email = true;
			touchedFields.value.password = true;

			const success = await login(
				userData.value.email,
				userData.value.password
			);

			if (success) {
				const hospitalStore = useHospitalStore();
				const hcwStore = useHealthCareWorkers();

				if (hospitalStore.getCurrentHospital) {
					router.push('/dashboard');
				} else if (hcwStore.getCurrentHCW) {
					router.push('/dashboard');
				} else console.error('Invalid credentials');
			}
		} catch (error) {
			throw error;
		}
	};
</script>
