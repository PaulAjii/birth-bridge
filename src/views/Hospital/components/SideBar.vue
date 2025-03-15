<template>
	<div
		class="w-[450px] h-full flex flex-col gap-4 bg-neutral pb-4 border-r border-r-solid border-r-neutral-200"
	>
		<div
			v-if="currentHospital"
			class="flex items-center gap-4 py-5 px-[35px] border-b border-b-solid border-b-neutral-200"
		>
			<PhBoldBuildingApartment class="text-primary text-3xl" />

			<div class="flex flex-col gap">
				<p class="text-base font-semibold">
					{{
						currentHospital?.hospital
							? currentHospital?.hospital?.name
							: 'BirthBridge'
					}}
				</p>
				<p class="text-xs font-medium leading-[20px]">
					{{
						currentHospital?.hospital
							? currentHospital?.hospital?.address
							: 'BirthBridge Address'
					}}
				</p>
			</div>
		</div>

		<!-- <div v-else>
			<div
				class="flex items-center gap-2.5 text-black px-[35px] py-4 border-neutral-200 border-solid border-b"
			>
				<div
					class="w-8 h-8 rounded-[50%] bg-primary text-neutral flex items-center justify-center"
				>
					<span class="text-[10px] font-bold">
						{{ nameInitials }}
					</span>
				</div>
				<p class="text-base font-bold text-lack">
					{{ nameDesignated }}
				</p>
			</div>

			<div
				class="flex items-center gap-4 py-4 px-[35px] border-neutral-200 border-solid border-b"
			>
				<PhBoldBuildingApartment class="text-primary text-3xl" />
				<div class="flex flex-col gap">
					<p class="text-base font-semibold">
						{{ hospital ? hospital?.name : 'BirthBridge' }}
					</p>
					<p class="text-xs font-medium leading-[20px]">
						{{
							hospital ? hospital?.address : 'BirthBridge Address'
						}}
					</p>
				</div>
			</div>
		</div> -->

		<div class="px-[35px] flex flex-col gap-2 h-[450px]">
			<button
				type="button"
				class="flex items-center gap-3 py-3 px-4 bg-primary text-neutral w-full cursor-pointer"
			>
				<AnFilledHome class="text-base" />
				<span class="text-base font-medium">Home</span>
			</button>

			<button
				type="button"
				class="flex items-center gap-3 py-3 px-4 text-neutral-400 w-full cursor-pointer"
			>
				<LiApartment class="text-base" />
				<span class="text-md font-semibold">Hospital</span>
			</button>
		</div>

		<div class="px-[35px] h-[300px]">
			<div
				class="border border-solid border-neutral-200 py-3 px-4 h-full"
			>
				<header
					class="border-b border-b-solid border-b-neutral-200 flex gap-2 py-1 items-center mb-1"
				>
					<MdNotifications class="text-sm" />
					<span class="text-neutral-600 text-sm font-semibold">
						Referral notifications</span
					>
				</header>

				<div class="flex items-center justify-center h-[250px]">
					<p class="text-xs text-neutral-400 font-regular">
						You’ll get notified of any incoming referral here
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		PhBoldBuildingApartment,
		AnFilledHome,
		LiApartment,
		MdNotifications,
	} from '@kalimahapps/vue-icons';
	import { useHospitalStore } from '../../../store/hospital';
	import { computed, onMounted } from 'vue';
	import { capitalize } from '../../../utils';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const hospitalStore = useHospitalStore();
	const currentHospital = hospitalStore.getCurrentHospital;

	onMounted(() => {
		if (!currentHospital) {
			router.push('/login');
		}
	});
</script>
