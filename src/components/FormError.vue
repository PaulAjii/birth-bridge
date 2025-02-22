<template>
	<span class="text-primary text-sm font-semibold font-manrope">
		{{ error }}
	</span>
</template>

<script setup lang="ts">
	defineProps<{
		error: string;
	}>();
</script>
