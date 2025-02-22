<template>
	<div
		class="h-screen w-full relative flex items-center justify-center"
		:class="[bgGradientPosition, bgGradientFrom, bgGradientTo]"
	>
		<div class="absolute bottom-px w-full h-1/2">
			<img
				src="../../../assets/images/onboarding-image.png"
				alt="Backdrop"
				class="w-full h-full"
			/>
		</div>

		<slot />
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		bgGradientPosition: string;
		bgGradientFrom: string;
		bgGradientTo: string;
	}>();
</script>
