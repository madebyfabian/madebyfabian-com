<template>
	<div class="RichtextCoreColumn" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreColumnBlock } from '@/types'
	export type RichtextCoreColumnProps = RichtextPropsBase<CoreColumnBlock>

	const props = defineProps<{
		attributes: RichtextCoreColumnProps['attributes']
		innerBlocks?: RichtextCoreColumnProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
