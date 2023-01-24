<template>
	<img
		class="UIImage rounded-xl shadow-inner h-auto w-full select-none object-cover object-center"
		:src="props.url"
		:alt="props.alt"
		:width="720"
		:height="405" />
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
