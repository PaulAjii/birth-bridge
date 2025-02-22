<template>
	<form class="w-full h-full flex flex-col justify-between">
		<div class="w-full h-full font-manrope">
			<FormHead text="Add Healthcare Worker" />

			<div class="w-full flex flex-col gap-4">
				<div class="w-full flex flex-col gap-1">
					<label
						for="name"
						class="text-base font-medium text-neutral-700"
					>
						Name
					</label>

					<input
						type="text"
						name="name"
						id="name"
						class="w-full p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						:class="{
							'border-2 border-solid border-primary':
								getFieldError('name'),
						}"
						@blur="handleBlur('name')"
						v-model="hcwData.name"
						placeholder="Enter name"
					/>
					<FormError :error="getFieldError('name')" />
				</div>

				<div class="flex gap-6 justify-between">
					<div class="w-1/2 flex flex-col gap-2">
						<label
							for="category"
							class="text-base font-medium text-neutral-700"
						>
							Category
						</label>

						<select
							name="category"
							id="category"
							class="w-full p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							:class="{
								'border-primary border-solid border':
									getFieldError('category'),
							}"
							v-model="hcwData.category"
							@blur="handleBlur('category')"
						>
							<option
								v-for="(category, index) in categories"
								:value="category.value"
								:key="index"
								class="text-neutral-600"
							>
								{{ category.label }}
							</option>
						</select>
						<FormError :error="getFieldError('category')" />
					</div>

					<div class="w-1/2 flex flex-col gap-2">
						<label
							for="license_number"
							class="text-base font-medium text-neutral-700"
						>
							License Number
						</label>

						<input
							type="text"
							name="license_number"
							id="license_number"
							class="w-full p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							placeholder="Enter License Number"
							v-model="hcwData.license_number"
							:class="{
								'border-primary border-solid border':
									getFieldError('license_number'),
							}"
							@blur="handleBlur('license_number')"
						/>
						<FormError :error="getFieldError('license_number')" />
					</div>
				</div>

				<div class="flex gap-6 justify-between">
					<div class="w-1/2 flex flex-col gap-2">
						<label
							for="phone"
							class="text-base font-medium text-neutral-700"
						>
							Phone Number
						</label>

						<input
							type="text"
							name="phone_number"
							id="phone"
							class="w-full p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							placeholder="Enter phone number"
							v-model="hcwData.phone_number"
							:class="{
								'border-primary border-solid border':
									getFieldError('phone_number'),
							}"
							@blur="handleBlur('phone_number')"
						/>
						<FormError :error="getFieldError('phone_number')" />
					</div>

					<div class="w-1/2 flex flex-col gap-2">
						<label
							for="email"
							class="text-base font-medium text-neutral-700"
						>
							Email Address
						</label>

						<input
							type="email"
							name="email_address"
							id="email"
							class="w-full p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							placeholder="Enter email address"
							v-model="hcwData.email_address"
							:class="{
								'border-primary border-solid border':
									getFieldError('email_address'),
							}"
							@blur="handleBlur('email_address')"
						/>
						<FormError :error="getFieldError('email_address')" />
					</div>
				</div>
			</div>
		</div>

		<button
			class="w-full bg-primary py-4 px-6 rounded-xl text-neutral"
			type="button"
			:class="{
				hidden: !isFormValid,
			}"
			@click="handleNext"
		>
			Continue
		</button>
	</form>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from 'vue';
	import FormHead from '../components/FormHead.vue';
	import { HealthCareWorkers } from '../../../types/healthcareworkers';
	import FormError from '../../../components/FormError.vue';

	const props = defineProps<{
		modelValue: HealthCareWorkers;
	}>();

	type ValidationFunction = (value: string) => string;
	type Validations = {
		[K in keyof HealthCareWorkers]: ValidationFunction;
	};

	const emit = defineEmits<{
		(e: 'update:modelValue', value: HealthCareWorkers): void;
		(e: 'next'): void;
	}>();

	const touchedFields = ref<Record<keyof HealthCareWorkers, boolean>>({
		name: false,
		category: false,
		license_number: false,
		phone_number: false,
		email_address: false,
	});

	const validations: Validations = {
		name: (value: string) => (value.length > 0 ? '' : 'Name is required'),

		category: (value: string) => (value ? '' : 'Please, select a category'),

		license_number: (value: string) =>
			value.length > 0 ? '' : 'License Number is required',

		phone_number: (value: string) => {
			if (!value) return 'Phone number is required';
			if (!/^\d{11}$/.test(value)) return 'Invalid phone number format';
			return '';
		},

		email_address: (value: string) => {
			if (!value) return 'Email is required';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				return 'Invalid email format';
			return '';
		},
	};

	const getFieldError = (field: keyof HealthCareWorkers) => {
		if (!touchedFields.value[field]) return '';
		return validations[field](hcwData.value[field]);
	};

	const handleBlur = (field: keyof HealthCareWorkers) => {
		touchedFields.value[field] = true;
	};

	const isFormValid = computed(() => {
		return Object.keys(validations).every(
			(field) =>
				!validations[field as keyof HealthCareWorkers](
					hcwData.value[field]
				)
		);
	});

	const hcwData = ref<HealthCareWorkers>(props.modelValue);

	watch(
		() => props.modelValue,
		(newValue) => {
			hcwData.value = newValue;
		}
	);

	watch(
		hcwData,
		(newValue) => {
			emit('update:modelValue', newValue);
		},
		{ deep: true }
	);

	const categories = [
		{ label: 'Select category', value: '' },
		{ label: 'Doctor', value: 'dr' },
		{ label: 'Nurse', value: 'nur' },
		{ label: 'Midwife', value: 'mw' },
	];

	const handleNext = () => {
		Object.keys(touchedFields.value).forEach((field) => {
			touchedFields.value[field as keyof HealthCareWorkers] = true;
		});

		if (isFormValid.value) emit('next');
	};
</script>
