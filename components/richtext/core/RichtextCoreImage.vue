<template>
	<figure class="RichtextCoreImage" :id="id">
		<component :is="props.attributes?.href ? 'a' : 'div'" v-bind="containerProps">
			<WPImage
				v-if="props.attributes?.url"
				:src="props.attributes.url"
				:alt="alt"
				:intrinsic="size"
				:ratio="size"
				:path="'/wordpress-madebyfabian/'"
				class="rounded-box safari-overflow-fix shadow-inner select-none" />
		</component>

		<figcaption v-if="caption" class="text-center mt-2" v-html="caption" />
	</figure>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreImageBlock } from '@/types'
	export type RichtextCoreImageProps = RichtextPropsBase<CoreImageBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreImageProps['attributes']
		innerBlocks?: RichtextCoreImageProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreImageProps['mediaItemsStorageKey']
	}>()

	const mediaData = useMediaItemData({ key: props.mediaItemsStorageKey, id: props.attributes?.id })

	const caption = computed(() => {
		if (props.attributes?.caption) return `<p>${props.attributes?.caption}</p>`
		return mediaData.value?.caption || mediaData.value?.description || undefined
	})

	const size = computed(() => {
		return mediaData.value?.mediaDetails
			? { width: mediaData.value.mediaDetails.width, height: mediaData.value.mediaDetails.height }
			: undefined
	})

	const id = computed(() => props.attributes?.anchor || undefined)

	const isLink = computed(() => !!props.attributes?.href)
	const alt = computed(() => {
		return props.attributes?.alt || props.attributes?.title || ''
	})
	const containerProps = computed(() => ({
		href: props.attributes?.href || undefined,
		target: props.attributes?.linkTarget || undefined,
		title: alt.value,
		rel: props.attributes?.rel || undefined,
		class: isLink.value ? 'block' : undefined,
	}))
</script>
