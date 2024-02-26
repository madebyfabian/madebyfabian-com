<template>
	<div>
		<!-- Should remain empty, we are displaying the table of contents elsewhere. -->
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, HtBlockTocBlock } from '@/types'
	export type RichtextHtTableOfContentsProps = RichtextPropsBase<HtBlockTocBlock>

	defineProps<{
		attributes: RichtextHtTableOfContentsProps['attributes']
		innerBlocks?: RichtextHtTableOfContentsProps['innerBlocks']
	}>()
</script>
