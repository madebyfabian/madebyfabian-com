<template>
	<section class="RichtextCoreColumns my-6 first:mt-0 last:mb-0" :id="id">
		<div
			class="flex -my-6 md:-my-0 -mx-0 md:-mx-6 divide-y md:divide-y-0 md:divide-x"
			:class="{ 'flex-col md:flex-row': props.attributes?.isStackedOnMobile }">
			<div v-for="item of props.innerBlocks" :key="item.id" class="flex-1 px-0 md:px-6 py-6 md:py-0">
				<RichtextResolver :item="item" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { CoreColumnsBlock } from '@/types/gen/graphql/graphql'
	import type { RichtextCoreColumnProps } from '@/components/richtext/core/RichtextCoreColumn.vue'

	const props = defineProps<{
		attributes: CoreColumnsBlock['attributes']
		innerBlocks: RichtextCoreColumnProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
