<template>
	<div class="RichtextCoreColumn" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</div>
</template>

<script lang="ts">
	import type { ItemBase } from '@/types'

	export type RichtextCoreColumnProps = ItemBase & {
		block: {
			anchor?: string
		}
		innerBlocks: any[]
	}

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		block: RichtextCoreColumnProps['block']
		innerBlocks: RichtextCoreColumnProps['innerBlocks']
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
