<template>
	<blockquote class="RichtextCoreQuote italic py-2 pl-6 border-l-4" :cite="props.attributes?.citation" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
		<p v-if="hasCitiation" class="PLike mt-4">&mdash; {{ props.attributes?.citation }}</p>
	</blockquote>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreQuoteBlock } from '@/types'
	export type RichtextCoreQuoteProps = RichtextPropsBase<CoreQuoteBlock>

	const props = defineProps<{
		attributes: RichtextCoreQuoteProps['attributes']
		innerBlocks?: RichtextCoreQuoteProps['innerBlocks']
	}>()

	const hasCitiation = computed(() => !!props.attributes?.citation?.length)

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
