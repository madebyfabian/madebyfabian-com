<template>
	<figure class="RichtextCoreImage" :id="id">
		<component :is="props.attributes?.href ? 'a' : 'div'" v-bind="containerProps">
			<UIImage
				v-if="props.attributes?.url"
				:src="props.attributes.url"
				:alt="alt"
				:intrinsic="size"
				:ratio="size"
				:path="'wordpress-madebyfabian'"
				class="rounded-box safari-overflow-fix shadow-inner select-none" />
		</component>

		<figcaption v-if="caption" class="text-center mt-2" v-html="caption" />
	</figure>
</template>

<script setup lang="ts">
	import type { GenerateBlocksDataReturnType } from '@/server/utils/generateBlocksData'
	import type { CoreImageBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreImageBlock['attributes']
		innerBlocks: InnerBlocksExtended
		mediaItemsStorageKey?: string
	}>()

	const mediaItems = useState<GenerateBlocksDataReturnType['mediaItems']>(props.mediaItemsStorageKey)
	const mediaData = computed(() => {
		const item = mediaItems.value?.edges.find(edge => {
			return edge.node.databaseId == props.attributes?.id
		})?.node

		return {
			...item,
			mediaDetails: {
				...item?.mediaDetails,
				width: Number(item?.mediaDetails?.width || 0),
				height: Number(item?.mediaDetails?.height || 0),
			},
		}
	})

	const caption = computed(() => {
		if (props.attributes?.caption) return `<p>${props.attributes?.caption}</p>`
		return mediaData.value.caption || mediaData.value.description || undefined
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
