<template>
	<img
		class="UIImage rounded-xl shadow-inner"
		:src="props.url"
		:alt="props.alt"
		:width="props.width"
		:height="props.height" />
</template>

<script setup lang="ts">
	const props = defineProps<{
		alt: string
		height?: number
		title?: string
		url?: string
		width?: number
	}>()
</script>
