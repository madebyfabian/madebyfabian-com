<template>
	<div class="RichtextCoreColumn" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
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
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
