<template>
	<h4 class="font-bold mb-8">{{ text }}</h4>
</template>

<script setup lang="ts">
	defineProps<{
		text: String;
	}>();
</script>
