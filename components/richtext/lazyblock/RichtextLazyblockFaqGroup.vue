<template>
	<section
		v-if="props.innerBlocks?.length"
		class="RichtextLazyblockFaqGroup my-6 first:mt-0 last:mb-0 rounded-box bg-frost shadow-border divide-y"
		:id="id">
		<RichtextResolver
			v-for="(item, key) of props.innerBlocks"
			:key="key"
			v-bind="{ item: item.block as any, name: item.name, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
	</section>
</template>

<script lang="ts">
	import type { RichtextPropsBase, LazyblockFaqGroupBlock, LazyblockFaqItemBlock } from '@/types'
	export type RichtextLazyblockFaqGroupProps = RichtextPropsBase<
		LazyblockFaqGroupBlock,
		{
			name: LazyblockFaqItemBlock['name']
			block: LazyblockFaqItemBlock['attributes']
		}[]
	>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextLazyblockFaqGroupProps['attributes']
		innerBlocks?: RichtextLazyblockFaqGroupProps['innerBlocks']
		mediaItemsStorageKey: RichtextLazyblockFaqGroupProps['mediaItemsStorageKey']
	}>()

	useSchemaOrg([
		defineWebPage({
			'@type': 'FAQPage',
		}),
		...(props.innerBlocks || [])?.map(item => {
			return defineQuestion({
				name: item.block?.title,
				acceptedAnswer: item.block?.content,
			})
		}),
	])

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
