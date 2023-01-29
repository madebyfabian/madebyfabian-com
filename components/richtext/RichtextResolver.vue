<template>
	<RichtextCoreImage
		v-if="dynamicComponent && isImage"
		v-bind="({ attributes, innerBlocks } as any)"
		:mediaItemsStorageKey="props.mediaItemsStorageKey">
		<slot />
	</RichtextCoreImage>

	<component v-else-if="dynamicComponent" :is="dynamicComponent" v-bind="{ attributes, innerBlocks }">
		<slot />
	</component>

	<div v-else-if="displayNotFoundError" class="p-4 bg-red-100 my-6 first:mt-0 last:mb-0 rounded-box text-red-600">
		<p>Component "{{ props.item.name }}" not found</p>
		<pre>{{ props }}</pre>
	</div>
</template>

<script lang="ts">
	export type RichtextItem = {
		id?: ItemBase['id']
		name: ItemBase['name']
		block?: BlockDefault
		innerBlocks?: InnerBlocksDefault<RichtextItem>
	}

	//
</script>

<script lang="ts" setup>
	import type { InnerBlocksDefault, BlockDefault, ItemBase } from '@/types'

	import {
		RichtextCoreButton,
		RichtextCoreButtons,
		RichtextCoreCode,
		RichtextCoreColumn,
		RichtextCoreColumns,
		RichtextCoreHeading,
		LazyRichtextCoreImage,
		RichtextCoreList,
		RichtextCoreListItem,
		RichtextCoreParagraph,
		RichtextCoreSeperator,
		RichtextCoreSpacer,

		// lazyblock
		RichtextLazyblockTeaser,
		RichtextLazyblockFaqGroup,
		RichtextLazyblockFaqItem,

		// matomo
		RichtextMatamoOptOut,
	} from '#components'

	const components = {
		'core/button': RichtextCoreButton,
		'core/buttons': RichtextCoreButtons,
		'core/code': RichtextCoreCode,
		'core/column': RichtextCoreColumn,
		'core/columns': RichtextCoreColumns,
		'core/heading': RichtextCoreHeading,
		'core/image': LazyRichtextCoreImage,
		'core/list': RichtextCoreList,
		'core/list-item': RichtextCoreListItem,
		'core/paragraph': RichtextCoreParagraph,
		'core/separator': RichtextCoreSeperator,
		'core/spacer': RichtextCoreSpacer,

		// lazyblock
		'lazyblock/richtext-teaser': RichtextLazyblockTeaser,
		'lazyblock/faq-group': RichtextLazyblockFaqGroup,
		'lazyblock/faq-item': RichtextLazyblockFaqItem,

		// matomo
		'matomo/matomo-opt-out': RichtextMatamoOptOut,
	}

	const props = defineProps<{
		item: RichtextItem
		mediaItemsStorageKey?: string
	}>()

	const dynamicComponent = components?.[props.item.name as keyof typeof components]
	const isImage = computed(() => props.item.name === ('core/image' as keyof typeof components))
	const attributes = computed(() => props.item?.block)
	const innerBlocks = computed(() => props.item?.innerBlocks)

	const displayNotFoundError = computed(() => {
		return !isProduction().value
	})
</script>
