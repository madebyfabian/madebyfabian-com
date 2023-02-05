<template>
	<section class="RichtextCoreColumns my-6 first:mt-0 last:mb-0" :id="id">
		<div
			class="flex -my-6 md:-my-0 -mx-0 md:-mx-6 divide-y md:divide-y-0 md:divide-x"
			:class="{ 'flex-col md:flex-row': props.attributes?.isStackedOnMobile }">
			<div
				v-for="item of props.innerBlocks"
				:key="item.id"
				class="px-0 md:px-6 py-6 md:py-0"
				:style="{ width: (item as any).block?.width || '50%' }">
				<RichtextResolver v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreColumnsBlock } from '@/types'
	export type RichtextCoreColumnsProps = RichtextPropsBase<CoreColumnsBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreColumnsProps['attributes']
		innerBlocks?: RichtextCoreColumnsProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreColumnsProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
