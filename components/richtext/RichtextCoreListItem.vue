<template>
	<li class="RichtextCoreListItem" :id="id">
		<p v-html="props.block.content" />
	</li>
</template>

<script lang="ts">
	import type { ItemBase } from '@/types'

	export type RichtextCoreListItemProps = ItemBase & {
		block: {
			content: string
			anchor?: string
		}
		innerBlocks: any[]
	}

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		block: RichtextCoreListItemProps['block']
		innerBlocks: RichtextCoreListItemProps['innerBlocks']
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
