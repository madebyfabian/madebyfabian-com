<template>
	<NuxtImg
		class="UIImage rounded-xl shadow-inner h-auto w-full select-none"
		:src="props.url"
		:alt="props.alt"
		fit="cover"
		width="720"
		height="405" />
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
