<template>
	<ol class="RichtextCoreList" v-if="props.attributes?.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ol>
	<ul class="RichtextCoreList" v-else-if="!props.attributes?.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ul>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreListBlock } from '@/types'
	export type RichtextCoreListProps = RichtextPropsBase<CoreListBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreListProps['attributes']
		innerBlocks?: RichtextCoreListProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
