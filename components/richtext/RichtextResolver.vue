<template>
	<component
		v-if="dynamicComponent"
		:is="dynamicComponent"
		v-bind="{ attributes, innerBlocks, mediaItemsStorageKey }">
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
	import type { InnerBlocksDefault, BlockDefault, ItemBase, RichtextPropsMinimum } from '@/types'

	const components = {
		'core/button': resolveComponent('RichtextCoreButton'),
		'core/buttons': resolveComponent('RichtextCoreButtons'),
		'core/code': resolveComponent('RichtextCoreCode'),
		'core/column': resolveComponent('RichtextCoreColumn'),
		'core/columns': resolveComponent('RichtextCoreColumns'),
		'core/heading': resolveComponent('RichtextCoreHeading'),
		'core/image': resolveComponent('LazyRichtextCoreImage'),
		'core/list': resolveComponent('RichtextCoreList'),
		'core/list-item': resolveComponent('RichtextCoreListItem'),
		'core/paragraph': resolveComponent('RichtextCoreParagraph'),
		'core/quote': resolveComponent('RichtextCoreQuote'),
		'core/separator': resolveComponent('RichtextCoreSeperator'),
		'core/spacer': resolveComponent('RichtextCoreSpacer'),

		// lazyblock
		'lazyblock/faq-group': resolveComponent('RichtextLazyblockFaqGroup'),
		'lazyblock/faq-item': resolveComponent('RichtextLazyblockFaqItem'),
		'lazyblock/project-item': resolveComponent('RichtextLazyblockProjectItem'),
		'lazyblock/project-list': resolveComponent('RichtextLazyblockProjectList'),
		'lazyblock/richtext-teaser': resolveComponent('RichtextLazyblockTeaser'),

		// matomo
		'matomo/matomo-opt-out': resolveComponent('RichtextMatamoOptOut'),
	}

	const props = defineProps<{
		name?: string
		item: RichtextItem
		mediaItemsStorageKey: RichtextPropsMinimum['mediaItemsStorageKey']
	}>()

	const dynamicComponent = components?.[props.item.name as keyof typeof components]
	const attributes = computed(() => props.item?.block)
	const innerBlocks = computed(() => props.item?.innerBlocks)

	const displayNotFoundError = computed(() => {
		return !isProduction().value
	})
</script>
