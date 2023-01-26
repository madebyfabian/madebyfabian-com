<template>
	<figure class="UIImage">
		<a
			class="RichtextCoreImage block"
			v-if="props.attributes?.href"
			:href="props.attributes?.href"
			:target="props.attributes?.linkTarget || undefined"
			:title="props.attributes?.title || 'Decorative Image'"
			:rel="props.attributes?.rel || undefined"
			:id="id">
			<UIImage v-bind="(imageProps as any)" />
		</a>

		<UIImage v-else v-bind="(imageProps as any)" />

		<figcaption v-if="props.attributes?.caption" class="text-center mt-2">
			<RichtextCoreParagraph :attributes="{ content: props.attributes?.caption, dropCap: false }" />
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
	import type { CoreImageBlock } from '@/types/gen/graphql/graphql'
	import { InnerBlocksExtended } from '@/types'
	import type { UIImageProps } from '@/components/ui/UIImage.vue'

	const props = defineProps<{
		attributes: CoreImageBlock['attributes']
		innerBlocks: InnerBlocksExtended
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)

	const imageProps = computed(() => {
		const obj: UIImageProps = {
			alt: props.attributes?.alt || '',
			height: props.attributes?.height || undefined,
			title: props.attributes?.title || undefined,
			url: props.attributes?.url || undefined,
			width: props.attributes?.width || undefined,
		}
		return obj
	})
</script>
