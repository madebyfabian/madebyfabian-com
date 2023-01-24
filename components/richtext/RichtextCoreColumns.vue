<template>
	<section
		class="RichtextCoreColumns flex md:gap-12"
		:class="{ 'flex-col md:flex-row': props.block.isStackedOnMobile }"
		:id="id">
		<div v-for="item of props.innerBlocks" :key="item.id" class="flex-1">
			<RichtextResolver :item="item" />
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { RichtextCoreColumnProps } from '@/components/richtext/RichtextCoreColumn.vue'

	const props = defineProps<{
		block: {
			isStackedOnMobile: boolean
			anchor?: string
		}
		innerBlocks: RichtextCoreColumnProps[]
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
