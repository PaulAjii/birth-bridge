<template>
	<div
		class="w-full h-[64px] bg-neutral flex justify-between items-center border-b border-b-solid border-b-neutral-200 py-6 px-[35px] font-manrope fixed z-10"
	>
		<div class="flex gap-2 items-center">
			<img
				:src="Logo"
				alt="BirthBridge Logo"
				class="w-[32px] h-[32px]"
			/>

			<span class="text-neutral-700 font-bold text-lg">
				BirthBridge
			</span>
		</div>

		<!-- DateTime and Notification Bell -->
		<div class="flex gap-4 items-center">
			<div
				class="px-8 py-2 bg-neutral-100 rounded-2xl border border-neutral-200"
			>
				<p
					class="font-semibold text-xs text-neutral-500 flex items-center gap-1"
				>
					{{ currentTime }}
					<span
						class="bg-neutral-500 w-[5px] h-[5px] rounded-[50%] block"
					></span>
					{{ currentDate }}
				</p>
			</div>

			<MdNotifications class="text-2xl cursor-pointer" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Logo from '../../../assets/images/logo.png';
	import { ref, onMounted, onUnmounted } from 'vue';
	import { MdNotifications } from '@kalimahapps/vue-icons';

	const currentTime = ref('');
	const currentDate = ref('');

	const updateDateTime = () => {
		const now = new Date();

		currentTime.value = now.toLocaleString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});

		currentDate.value = now.toLocaleString('en-US', {
			day: 'numeric',
			weekday: 'long',
			month: 'long',
			year: 'numeric',
		});
	};
	let timer: ReturnType<typeof setInterval>;

	onMounted(() => {
		updateDateTime();
		timer = setInterval(updateDateTime, 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});
</script>
