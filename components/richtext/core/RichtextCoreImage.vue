<template>
	<figure class="RichtextCoreImage" :id="id">
		<component :is="props.attributes?.href ? 'a' : 'div'" v-bind="containerProps">
			<NuxtImg
				class="rounded-xl shadow-inner h-auto w-full select-none"
				:height="mediaData.mediaDetails.height"
				:width="mediaData.mediaDetails.width"
				:alt="props.attributes?.alt || ''"
				:src="props.attributes?.url || undefined"
				sizes="lg:720px" />
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

	const id = computed(() => props.attributes?.anchor || undefined)

	const isLink = computed(() => !!props.attributes?.href)
	const containerProps = computed(() => ({
		href: props.attributes?.href || undefined,
		target: props.attributes?.linkTarget || undefined,
		title: props.attributes?.title || 'Decorative Image',
		rel: props.attributes?.rel || undefined,
		class: isLink.value ? 'block' : undefined,
	}))
</script>
