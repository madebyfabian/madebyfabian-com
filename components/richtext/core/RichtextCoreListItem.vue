<template>
	<li class="RichtextCoreListItem">
		<p v-html="props.attributes?.content" />

		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</li>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreListItemBlock } from '@/types'
	export type RichtextCoreListItemProps = RichtextPropsBase<CoreListItemBlock>

	const props = defineProps<{
		attributes: RichtextCoreListItemProps['attributes']
		innerBlocks?: RichtextCoreListItemProps['innerBlocks']
	}>()
</script>
