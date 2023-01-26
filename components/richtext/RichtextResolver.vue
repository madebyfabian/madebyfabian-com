<template>
	<component
		v-if="dynamicComponent"
		:is="dynamicComponent"
		:attributes="props.item?.block"
		:innerBlocks="props.item.innerBlocks">
		<slot />
	</component>

	<div v-else-if="displayNotFoundError" class="p-4 bg-red-100 my-6 rounded-xl text-red-600">
		<p>Component "{{ props.item.name }}" not found</p>
		<pre>{{ props }}</pre>
	</div>
</template>

<script lang="ts" setup>
	import type { InnerBlocksDefault, ItemBase } from '@/types'
	import type { Block } from '@/types/gen/graphql/graphql'

	import {
		RichtextCoreCode,
		RichtextCoreColumn,
		RichtextCoreColumns,
		RichtextCoreHeading,
		LazyRichtextCoreImage,
		RichtextCoreList,
		RichtextCoreListItem,
		RichtextCoreParagraph,
		RichtextCustomTeaser,
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
	}

	type Item = {
		id?: ItemBase['id']
		name: ItemBase['name']
		block?: Block
		innerBlocks?: InnerBlocksDefault<Item>
	}

	const props = defineProps<{
		item: Item
	}>()

	const dynamicComponent = components?.[props.item.name as keyof typeof components]

	const displayNotFoundError = computed(() => {
		return !isProduction().value
	})
</script>
