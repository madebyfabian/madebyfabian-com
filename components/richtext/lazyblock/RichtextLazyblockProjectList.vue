<template>
	<div class="RichtextLazyblockProjectList" :id="id">
		<LayoutTeaserList v-if="props.innerBlocks?.length">
			<RichtextResolver
				v-for="(item, key) of props.innerBlocks"
				:key="key"
				v-bind="{
					item: {
						name: item.block?.lazyblock.slug,
						block: item.block,
					} as any,
					name: item.block?.lazyblock.slug,
				}" />
		</LayoutTeaserList>
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, LazyblockProjectListBlock, LazyblockProjectItemBlock } from '@/types'
	export type RichtextLazyblockProjectListProps = RichtextPropsBase<
		LazyblockProjectListBlock,
		{
			name: LazyblockProjectItemBlock['name']
			block: LazyblockProjectItemBlock['attributes']
		}[]
	>

	const props = defineProps<{
		attributes: RichtextLazyblockProjectListProps['attributes']
		innerBlocks?: RichtextLazyblockProjectListProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
