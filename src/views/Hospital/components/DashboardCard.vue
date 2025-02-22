<template>
	<div
		class="py-8 px-6 w-1/3"
		:class="bg_color"
	>
		<div class="flex flex-col gap-2 w-full">
			<p class="text-neutral-500 text-sm font-semibold w-full">
				{{ text.toUpperCase() }}
			</p>
			<span class="text-h6 text-neutral-0 font-semibold w-full">
				{{ number }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		text: string;
		number: number;
		bg_color: string;
	}>();
</script>
