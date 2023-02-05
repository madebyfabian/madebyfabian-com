<template>
	<article class="LayoutProjectItem flex-1 flex flex-col relative rounded-2xl bg-frost-200 p-8 shadow-border">
		<div class="flex-1 max-w-[90%] md:max-w-full flex flex-col relative">
			<div class="flex-1">
				<h2 class="H3Like mb-1"><slot name="title" /></h2>
				<slot />
			</div>

			<div class="mt-6">
				<NuxtLink :to="{ name: 'contact' }" class="UILink">
					<slot name="linkLabel" />
				</NuxtLink>
			</div>
		</div>

		<div class="h-0 select-none pointer-events-none">
			<WPImage
				:src="props.imageSrc"
				:alt="props.imageAlt"
				:style="props.imageStyle"
				:path="'/wordpress-madebyfabian/'"
				class="absolute h-[200px] w-[200px] right-0 z-0" />
		</div>
	</article>
</template>

<script lang="ts" setup>
	import type { StyleValue } from 'vue'

	const props = defineProps<{
		imageSrc: string
		imageAlt: string
		imageStyle: StyleValue
	}>()
</script>

<style lang="postcss" scoped>
	.LayoutProjectItem :deep(p) {
		@apply mt-3;
	}
</style>
