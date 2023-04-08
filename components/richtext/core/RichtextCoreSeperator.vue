<template>
	<hr :id="id" class="RichtextCoreSeperator my-12 first:mt-0 last:mb-0 border-1" />
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreSeparatorBlock } from '@/types'
	export type RichtextCoreSeperatorProps = RichtextPropsBase<CoreSeparatorBlock>

	const props = defineProps<{
		attributes: RichtextCoreSeperatorProps['attributes']
		innerBlocks?: RichtextCoreSeperatorProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
