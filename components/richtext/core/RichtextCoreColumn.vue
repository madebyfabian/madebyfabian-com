<template>
	<div class="RichtextCoreColumn" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</div>
</template>

<script lang="ts">
	import type { CoreColumnBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	export type RichtextCoreColumnProps = {
		attributes: CoreColumnBlock['attributes']
		innerBlocks?: InnerBlocksExtended
	}

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreColumnProps['attributes']
		innerBlocks: RichtextCoreColumnProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
