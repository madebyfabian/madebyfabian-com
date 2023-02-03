<template>
	<ol class="RichtextCoreList" v-if="props.attributes?.ordered" :id="id">
		<RichtextResolver
			v-for="item of props.innerBlocks"
			:key="item.id"
			v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
	</ol>
	<ul class="RichtextCoreList" v-else-if="!props.attributes?.ordered" :id="id">
		<RichtextResolver
			v-for="item of props.innerBlocks"
			:key="item.id"
			v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
	</ul>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreListBlock } from '@/types'
	export type RichtextCoreListProps = RichtextPropsBase<CoreListBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreListProps['attributes']
		innerBlocks?: RichtextCoreListProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreListProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
