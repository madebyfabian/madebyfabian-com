<template>
	<figure class="UIImage">
		<a
			class="RichtextCoreImage block"
			v-if="props.block.href"
			:href="props.block.href"
			:target="props.block.linkTarget"
			:title="props.block.title || 'Decorative Image'"
			:rel="props.block.rel"
			:id="id">
			<UIImage v-bind="imageProps" />
		</a>

		<UIImage v-else v-bind="imageProps" />

		<figcaption v-if="props.block.caption" class="text-center mt-2">
			<RichtextCoreParagraph :block="{ content: props.block.caption }" />
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
	const props = defineProps<{
		block: {
			alt: string
			anchor?: string
			caption?: string
			height?: number
			href?: string
			linkTarget?: string
			rel?: string
			title?: string
			url?: string
			width?: number
		}
		innerBlocks: any[]
	}>()

	const id = computed(() => props.block.anchor || undefined)

	const imageProps = computed(() => ({
		alt: props.block.alt,
		height: props.block.height,
		title: props.block.title,
		url: props.block.url,
		width: props.block.width,
	}))
</script>
