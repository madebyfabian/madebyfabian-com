<template>
	<img
		class="UIImage rounded-xl shadow-inner h-auto w-full select-none object-cover object-center"
		:src="props.url"
		:alt="props.alt"
		:width="720"
		:height="405" />
</template>

<script lang="ts">
	export type UIImageProps = {
		alt: string
		height?: number
		title?: string
		url?: string
		width?: number
	}

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		alt: UIImageProps['alt']
		height: UIImageProps['height']
		title: UIImageProps['title']
		url: UIImageProps['url']
		width: UIImageProps['width']
	}>()
</script>
