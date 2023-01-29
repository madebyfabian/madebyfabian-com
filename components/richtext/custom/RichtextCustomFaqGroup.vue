<template>
	<section
		v-if="props.innerBlocks?.length"
		class="RichtextCustomFaqGroup my-6 first:mt-0 last:mb-0 rounded-xl bg-frost outline-border divide-y"
		:id="id">
		<RichtextResolver
			v-for="(item, key) of props.innerBlocks"
			:key="key"
			:item="{ block: item.block as any, name: item.name }" />
	</section>
</template>

<script setup lang="ts">
	import type { LazyblockFaqGroupBlock, LazyblockFaqItemBlock } from '@/types/gen/graphql/graphql'

	const props = defineProps<{
		attributes: LazyblockFaqGroupBlock['attributes']
		innerBlocks: {
			name: 'lazyblock/faq-item'
			block: LazyblockFaqItemBlock['attributes']
		}[]
	}>()

	useSchemaOrg([
		defineWebPage({
			'@type': 'FAQPage',
		}),
		...props.innerBlocks?.map(item => {
			return defineQuestion({
				name: item.block?.title,
				acceptedAnswer: item.block?.content,
			})
		}),
	])

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
