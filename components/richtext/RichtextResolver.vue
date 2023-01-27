<template>
	<component
		v-if="dynamicComponent"
		:is="dynamicComponent"
		:attributes="props.item?.block"
		:innerBlocks="props.item.innerBlocks">
		<slot />
	</component>

	<div v-else-if="displayNotFoundError" class="p-4 bg-red-100 my-6 first:mt-0 last:mb-0 rounded-xl text-red-600">
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
		RichtextCoreCode,
		RichtextCoreColumn,
		RichtextCoreColumns,
		RichtextCoreHeading,
		LazyRichtextCoreImage,
		RichtextCoreList,
		RichtextCoreListItem,
		RichtextCoreParagraph,

		// Custom blocks
		RichtextCustomTeaser,
		RichtextCustomFaqGroup,
		RichtextCustomFaqItem,
	} from '#components'

	const components = {
		'core/code': RichtextCoreCode,
		'core/column': RichtextCoreColumn,
		'core/columns': RichtextCoreColumns,
		'core/heading': RichtextCoreHeading,
		'core/image': LazyRichtextCoreImage,
		'core/list': RichtextCoreList,
		'core/list-item': RichtextCoreListItem,
		'core/paragraph': RichtextCoreParagraph,

		// Custom blocks
		'lazyblock/richtext-teaser': RichtextCustomTeaser,
		'lazyblock/faq-group': RichtextCustomFaqGroup,
		'lazyblock/faq-item': RichtextCustomFaqItem,
	}

	const props = defineProps<{
		item: RichtextItem
	}>()

	const dynamicComponent = components?.[props.item.name as keyof typeof components]

	const displayNotFoundError = computed(() => {
		return !isProduction().value
	})
</script>
