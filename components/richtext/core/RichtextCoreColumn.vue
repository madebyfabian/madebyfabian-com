<template>
	<div class="RichtextCoreColumn" :id="id">
		<RichtextResolver
			v-for="item of props.innerBlocks"
			:key="item.id"
			v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
	</div>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreColumnBlock } from '@/types'
	export type RichtextCoreColumnProps = RichtextPropsBase<CoreColumnBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreColumnProps['attributes']
		innerBlocks?: RichtextCoreColumnProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreColumnProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
