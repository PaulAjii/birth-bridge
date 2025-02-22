<template>
	<form class="w-full h-full flex flex-col justify-between">
		<div class="w-full h-full font-manrope">
			<FormHead text="Let's get started" />

			<div class="w-full flex flex-col gap-4">
				<div class="w-full flex flex-col gap-1">
					<label
						for="hospitalName"
						class="text-base font-medium text-neutral-700"
					>
						Hospital Name
					</label>

					<input
						type="text"
						name="hospitalName"
						id="hospitalName"
						class="w-full outline-none p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						:class="{
							'border-primary border-2 border-solid':
								getFieldError('hospitalName'),
						}"
						placeholder="Enter the name of your Hospital"
						v-model="hospitalData.hospitalName"
						@blur="handleBlur('hospitalName')"
					/>
					<FormError :error="getFieldError('hospitalName')" />
				</div>

				<div class="w-full flex flex-col gap-2">
					<label for="tier"
						>What tier of HealthCare center is it?</label
					>
					<select
						class="w-full outline-none p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						:class="{
							'border-primary border-2 border-solid':
								getFieldError('tier'),
						}"
						name="tier"
						id="tier"
						v-model="hospitalData.tier"
						@blur="handleBlur('tier')"
					>
						<option
							v-for="(data, index) in hospitalTiers"
							:key="index"
							:value="data.value"
							class="text-neutral-600"
						>
							{{ data.label }}
						</option>
					</select>
					<FormError :error="getFieldError('tier')" />
				</div>

				<div class="w-full flex flex-col gap-2">
					<label
						for="address"
						class="text-base font-medium text-neutral-700"
					>
						Full Address
					</label>

					<input
						type="text"
						name="address"
						id="address"
						class="w-full outline-none p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
						:class="{
							'border-primary border-2 border-solid':
								getFieldError('address'),
						}"
						placeholder="Enter Hospital's full address"
						v-model="hospitalData.address"
						@blur="handleBlur('address')"
					/>
					<FormError :error="getFieldError('address')" />
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
							class="w-full outline-none p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							:class="{
								'border-primary border-2 border-solid':
									getFieldError('phone_number'),
							}"
							placeholder="Enter Hospital's phone number"
							v-model="hospitalData.phone_number"
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
							class="w-full outline-none p-4 bg-neutral-200 outline-none text-neutral-500 border border-solid border-neutral-400 rounded-lg overflow-hidden"
							:class="{
								'border-primary border-2 border-solid':
									getFieldError('email_address'),
							}"
							placeholder="Enter Hospital's email address"
							v-model="hospitalData.email_address"
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
	import { ref, watch, computed } from 'vue';
	import FormHead from '../components/FormHead.vue';
	import { HospitalFormData } from '../../../types/hospital';
	import FormError from '../../../components/FormError.vue';

	const props = defineProps<{
		modelValue: HospitalFormData;
	}>();

	type ValidationFunction = (value: string) => string;
	type Validations = {
		[K in keyof HospitalFormData]: ValidationFunction;
	};

	const emit = defineEmits<{
		(e: 'update:modelValue', value: HospitalFormData): void;
		(e: 'next'): void;
	}>();

	const touchedFields = ref<Record<keyof HospitalFormData, boolean>>({
		hospitalName: false,
		tier: false,
		address: false,
		phone_number: false,
		email_address: false,
	});

	const validations: Validations = {
		hospitalName: (value: string) =>
			value.length > 0 ? '' : 'Hospital Name is required',

		tier: (value: string) => (value ? '' : 'Please, select a tier'),

		address: (value: string) =>
			value.length > 0 ? '' : 'Address is required',

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

	const getFieldError = (field: keyof HospitalFormData) => {
		if (!touchedFields.value[field]) return '';
		return validations[field](hospitalData.value[field]);
	};

	const handleBlur = (field: keyof HospitalFormData) => {
		touchedFields.value[field] = true;
	};

	const isFormValid = computed(() => {
		return Object.keys(validations).every(
			(field) =>
				!validations[field as keyof HospitalFormData](
					hospitalData.value[field]
				)
		);
	});

	const hospitalData = ref<HospitalFormData>(props.modelValue);

	watch(
		() => props.modelValue,
		(newValue) => {
			hospitalData.value = newValue;
		}
	);

	watch(
		hospitalData,
		(newValue) => {
			emit('update:modelValue', newValue);
		},
		{ deep: true }
	);

	const hospitalTiers = [
		{ label: 'Select tier', value: '' },
		{ label: 'Primary', value: 'primary' },
		{ label: 'Secondary', value: 'secondary' },
		{ label: 'Tertiary', value: 'tertiary' },
	];

	const handleNext = () => {
		Object.keys(touchedFields.value).forEach((field) => {
			touchedFields.value[field as keyof HospitalFormData] = true;
		});

		if (isFormValid.value) emit('next');
	};
</script>
