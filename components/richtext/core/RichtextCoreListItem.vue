<template>
	<li class="RichtextCoreListItem">
		<p v-html="props.attributes?.content" />

		<RichtextResolver
			v-for="item of props.innerBlocks"
			:key="item.id"
			v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
	</li>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreListItemBlock } from '@/types'
	export type RichtextCoreListItemProps = RichtextPropsBase<CoreListItemBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreListItemProps['attributes']
		innerBlocks?: RichtextCoreListItemProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreListItemProps['mediaItemsStorageKey']
	}>()
</script>
