<template>
	<section
		v-if="props.innerBlocks?.length"
		class="RichtextCustomFaqGroup my-6 first:mt-0 last:mb-0 rounded-xl border divide-y"
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

	/*useSchemaOrg([
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
	*/
	const data = [
		{
			name: 'How long is a piece of string?',
			acceptedAnswer: 'The length of a piece of string is the number of characters in the string.',
		},
		{
			name: 'How big is a giraffe?',
			acceptedAnswer: 'A giraffe is 12 feet tall',
		},
	]

	useSchemaOrg([
		defineWebPage({
			'@type': 'FAQPage',
		}),
		...data.map(entry => {
			return defineQuestion(entry)
		}),
	])

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
