<template>
	<pre class="RichtextCoreCode" :id="id"><code
		v-html="props.attributes?.content"
		:class="[
			`language-${props.attributes?.language}`,
			{
				'line-numbers': props.attributes?.lineNumbers,
			},
		]"
	/></pre>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreCodeBlock } from '@/types'
	export type RichtextCoreCodeProps = RichtextPropsBase<CoreCodeBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreCodeProps['attributes']
		innerBlocks?: RichtextCoreCodeProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreCodeProps['mediaItemsStorageKey']
	}>()

	onMounted(() => {
		// @ts-expect-error - Prism is not a module
		Prism.highlightAll()
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
