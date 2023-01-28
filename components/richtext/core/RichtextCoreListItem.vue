<template>
	<li class="RichtextCoreListItem" :id="id">
		<p v-html="props.attributes?.content" />

		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</li>
</template>

<script lang="ts">
	import type { CoreHeadingBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	export type RichtextCoreListItemProps = {
		attributes: CoreHeadingBlock['attributes']
		innerBlocks: InnerBlocksExtended
	}

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreListItemProps['attributes']
		innerBlocks: RichtextCoreListItemProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
