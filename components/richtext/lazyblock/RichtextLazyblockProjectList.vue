<template>
	<div v-if="props.innerBlocks?.length" class="RichtextLazyblockProjectList" :id="id">
		<LayoutTeaserList>
			<RichtextResolver
				v-for="(item, key) of props.innerBlocks"
				:key="key"
				v-bind="{ item: {
					name: item.block?.lazyblock.slug,
					block: item.block,
				} as any, name: item.block?.lazyblock.slug, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
		</LayoutTeaserList>
	</div>
</template>

<script lang="ts">
	import type { RichtextPropsBase, LazyblockProjectListBlock, LazyblockProjectItemBlock } from '@/types'
	export type RichtextLazyblockProjectListProps = RichtextPropsBase<
		LazyblockProjectListBlock,
		{
			name: LazyblockProjectItemBlock['name']
			block: LazyblockProjectItemBlock['attributes']
		}[]
	>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextLazyblockProjectListProps['attributes']
		innerBlocks?: RichtextLazyblockProjectListProps['innerBlocks']
		mediaItemsStorageKey: RichtextLazyblockProjectListProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
