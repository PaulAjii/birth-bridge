<template>
	<div class="font-manrope h-full">
		<HeaderBar />

		<div class="flex h-full pt-[64px]">
			<SideBar />

			<div class="w-full px-[40px] pt-[30px] bg-neutral-100">
				<div class="flex gap-6 items-center w-full mb-6">
					<DashboardCard
						text="healthcare workers (hcw)"
						:number="getRegisteredHCW()"
						bg_color="bg-neutral"
					/>
					<DashboardCard
						text="patients"
						:number="32"
						bg_color="bg-neutral"
					/>
					<DashboardCard
						text="high-risk patients"
						:number="8"
						bg_color="bg-primary-100"
					/>
				</div>

				<button
					type="button"
					class="flex gap-2 items-center bg-primary px-4 py-3 rounded-xl text-neutral font-medium text-sm mb-10 cursor-pointer"
					@click="handleClick"
				>
					<ClAddPlus class="text-base" />
					<span>Add Healthcare Worker</span>
				</button>

				<div
					class="bg-neutral border border-solid border-neutral-200 p-6"
				>
					<span class="text-base text-black font-bold mb-6 block">
						Activity log
					</span>

					<table class="w-full">
						<thead class="bg-neutral-100">
							<tr class="px-6 py-10">
								<th class="py-3 px-4 text-left w-1/7">
									LOGIN TIME
								</th>
								<th class="py-3 px-4 text-left w-1/7">HCW</th>
								<th class="py-3 px-4 text-left w-3/7">NAME</th>
								<th class="py-3 px-4 text-left w-2/7">
									ACTIONS
								</th>
							</tr>
						</thead>

						<span
							class="py-1 px-3 rounded-2xl bg-neutral-400 text-[10px] font-semibold text-neutral mb-3 inline-block"
							>TODAY</span
						>

						<tbody>
							<tr>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									02:00
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									Dr
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									John Doe
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									3
								</td>
							</tr>
							<tr>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									03:00
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									Nurse
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									Jane Burk
								</td>
								<td
									class="py-3 px-4 text-left w-1/7 border-b border-solid border-neutral-200 text-xs font-medium"
								>
									2
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import HeaderBar from './components/HeaderBar.vue';
	import SideBar from './components/SideBar.vue';
	import DashboardCard from './components/DashboardCard.vue';
	import { ClAddPlus } from '@kalimahapps/vue-icons';
	import router from '../../router';
	import { useHealthCareWorkers } from '../../store/healthcareworkers';
	import { useHospitalStore } from '../../store/hospital';
	const hcwStore = useHealthCareWorkers();
	const hospitalStore = useHospitalStore();

	const getRegisteredHCW = (): number => {
		const currentHospital = hospitalStore.getCurrentHospital;

		if (currentHospital?._id) {
			const hcws = hcwStore.getHCWS;
			const registeredHCW = hcws.filter(
				(h) => h.hospitalID === currentHospital._id
			);

			return registeredHCW.length;
		}

		return 0;
	};

	const handleClick = () => {
		router.push('/hcw-registration');
	};
</script>
