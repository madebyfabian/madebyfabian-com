<template>
	<pre class="RichtextCoreCode" :id="id"><code
		ref="element"
		v-html="props.attributes?.content"
		:class="[
			`language-${props.attributes?.language}`,
			{
				'line-numbers': props.attributes?.lineNumbers,
			},
		]"
	/></pre>
</template>

<script setup lang="ts">
	import Prism from 'prismjs'

	// Languages
	import 'prismjs/components/prism-bash'
	import 'prismjs/components/prism-typescript'
	import 'prismjs/components/prism-graphql'

	// Styles
	import 'prismjs/themes/prism-twilight.css'

	import type { RichtextPropsBase, CoreCodeBlock } from '@/types'
	export type RichtextCoreCodeProps = RichtextPropsBase<CoreCodeBlock>

	const props = defineProps<{
		attributes: RichtextCoreCodeProps['attributes']
		innerBlocks?: RichtextCoreCodeProps['innerBlocks']
	}>()

	const element = ref<HTMLElement | null>(null)

	onMounted(() => {
		Prism.highlightAll()
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
