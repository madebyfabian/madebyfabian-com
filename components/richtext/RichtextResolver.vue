<template>
	<component
		v-if="dynamicComponent"
		:is="dynamicComponent"
		:block="props.item.block"
		:innerBlocks="props.item.innerBlocks">
		<slot />
	</component>

	<div v-else class="p-4 bg-red-100 my-6 rounded-xl text-red-600">
		<p>Component "{{ props.item.name }}" not found</p>
		<pre>{{ props }}</pre>
	</div>
</template>

<script lang="ts" setup>
	import type { ItemBase } from '@/types'

	import {
		RichtextCoreCode,
		RichtextCoreColumn,
		RichtextCoreColumns,
		RichtextCoreHeading,
		LazyRichtextCoreImage,
		RichtextCoreList,
		RichtextCoreListItem,
		RichtextCoreParagraph,
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
	}

	type Item = ItemBase & {
		block: any
		innerBlocks?: Item[]
	}

	const props = defineProps<{
		item: Item
	}>()

	const dynamicComponent = components?.[props.item.name as keyof typeof components]
</script>
