<template>
	<form class="w-full h-full flex flex-col justify-between">
		<div class="w-full h-full font-manrope">
			<FormHead text="Create Password" />

			<div class="w-full flex flex-col gap-8">
				<div class="w-full flex flex-col gap-2">
					<label
						for="password"
						class="text-base font-medium text-neutral-700"
					>
						Create a password to secure and access your hospital
						account
					</label>

					<input
						type="password"
						name="password"
						id="password"
						class="w-full flex flex-col gap-4 p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						:class="{
							'border-primary border-2 border-solid':
								passwordError,
						}"
						placeholder="Enter password"
						v-model="securityData.password"
						@blur="handlePasswordBlur"
					/>
					<FormError :error="passwordError" />
				</div>

				<div class="w-full flex flex-col gap-2">
					<label
						for="address"
						class="text-base font-medium text-neutral-700"
					>
						Confirm Password
					</label>

					<input
						type="password"
						name="confirm_password"
						id="cpassword"
						class="w-full flex flex-col gap-4 p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						placeholder="Re-enter password"
						:class="{
							'border-primary border-2 border-solid':
								cPasswordError,
						}"
						v-model="securityData.confirm_password"
						@blur="handleCPasswordBlur"
					/>

					<FormError :error="cPasswordError" />
				</div>
			</div>
		</div>

		<button
			class="w-full bg-primary py-4 px-6 rounded-xl text-neutral"
			:class="{
				hidden: !isFormValid,
			}"
			type="button"
			@click="handleNext"
		>
			Continue
		</button>
	</form>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from 'vue';
	import FormHead from '../components/FormHead.vue';
	import FormError from '../../../components/FormError.vue';
	import { HCWSecurityData } from '../../../types/healthcareworkers';

	const props = defineProps<{
		modelValue: HCWSecurityData;
	}>();

	const touchedFields = ref({
		password: false,
		confirm_password: false,
	});

	const passwordMatch = computed(() => {
		return (
			securityData.value.password === securityData.value.confirm_password
		);
	});

	const passwordError = computed((): string => {
		if (!touchedFields.value.password) return '';
		if (!securityData.value.password) return 'Enter your password';
		if (securityData.value.password === '') return 'Password is required';
		if (securityData.value.password.length < 8)
			return 'Password must be at least 8 characters';
		return '';
	});

	const cPasswordError = computed((): string => {
		if (!touchedFields.value.confirm_password) return '';
		if (!securityData.value.confirm_password)
			return 'Confirm your password';
		if (securityData.value.confirm_password === '')
			return 'Password is required';
		if (!passwordMatch.value) return "Pasword don't match";
		return '';
	});

	const handlePasswordBlur = () => {
		touchedFields.value.password = true;
	};

	const handleCPasswordBlur = () => {
		touchedFields.value.confirm_password = true;
	};

	const emit = defineEmits<{
		(e: 'update:modelValue', value: HCWSecurityData): void;
		(e: 'next'): void;
	}>();

	const securityData = ref<HCWSecurityData>(props.modelValue);

	watch(
		securityData,
		(newValue) => {
			emit('update:modelValue', newValue);
		},
		{ deep: true }
	);

	const isFormValid = computed(() => {
		return (
			securityData.value.password &&
			securityData.value.confirm_password &&
			!passwordError.value &&
			!cPasswordError.value &&
			passwordMatch.value
		);
	});

	const handleNext = () => {
		touchedFields.value.password = true;
		touchedFields.value.confirm_password = true;

		if (isFormValid) emit('next');
	};
</script>
