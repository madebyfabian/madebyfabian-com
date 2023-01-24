<template>
	<ol class="RichtextCoreList" v-if="props.block.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ol>
	<ul class="RichtextCoreList" v-else-if="!props.block.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ul>
</template>

<script setup lang="ts">
	import type { RichtextCoreListItemProps } from '@/components/richtext/RichtextCoreListItem.vue'

	const props = defineProps<{
		block: {
			ordered: boolean
			anchor?: string
		}
		innerBlocks: RichtextCoreListItemProps[]
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
