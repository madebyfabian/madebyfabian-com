<template>
	<pre class="RichtextCoreCode" v-html="props.attributes?.content" :id="id" />
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreCodeBlock } from '@/types'
	export type RichtextCoreCodeProps = RichtextPropsBase<CoreCodeBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreCodeProps['attributes']
		innerBlocks?: RichtextCoreCodeProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreCodeProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
