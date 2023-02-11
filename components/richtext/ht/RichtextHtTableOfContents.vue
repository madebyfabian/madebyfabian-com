<template>
	<!-- don't render anything for now. later: <UITableOfContents class="RichtextHtTableOfContents md:w-1/2 my-12 first:mt-0 last:mb-0" :entries="headerEntries" />-->
</template>

<script lang="ts">
	import type { RichtextPropsBase, HtBlockTocBlock, UbTableOfContentsHeaderEntry } from '@/types'
	export type RichtextHtTableOfContentsProps = RichtextPropsBase<HtBlockTocBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextHtTableOfContentsProps['attributes']
		innerBlocks?: RichtextHtTableOfContentsProps['innerBlocks']
		mediaItemsStorageKey: RichtextHtTableOfContentsProps['mediaItemsStorageKey']
	}>()

	const headerEntries = computed(() => {
		return (props.attributes?.headerEntries as any as UbTableOfContentsHeaderEntry[]) || []
	})
</script>
