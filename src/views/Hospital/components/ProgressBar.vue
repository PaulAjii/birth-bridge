<template>
	<div class="w-full pb-4">
		<div class="w-full flex justify-between gap-4">
			<div
				v-for="(_, index) in steps"
				:key="index"
				class="w-full"
			>
				<div
					class="w-full h-[4px]"
					:class="[
						currentStep >= index ? 'bg-primary' : 'bg-primary-200',
					]"
				></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		steps: string[];
		currentStep: number;
	}>();
</script>
