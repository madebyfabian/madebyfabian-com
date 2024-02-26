<template>
	<div class="RichtextCoreCode" :id="id" v-html="html" />
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreCodeBlock } from '@/types'
	export type RichtextCoreCodeProps = RichtextPropsBase<CoreCodeBlock>

	const props = defineProps<{
		attributes: RichtextCoreCodeProps['attributes']
		innerBlocks?: RichtextCoreCodeProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)

	// Init shiki
	const shiki = await loadShiki()

	const transformedContent = computed(() => {
		const content = props.attributes?.content || ''
		return content.replaceAll('&gt;', '>').replaceAll('&lt;', '<')
	})

	console.log(props.attributes?.language)
	const html = computed(() => {
		const languages = {
			'markup': 'html',
			'typescript': 'ts',
			'bash': 'bash',
			'php': 'php',
			'graphql': 'graphql',
		}

		return shiki.codeToHtml(transformedContent.value, {
			...shiki.$defaults,
			lang: languages[(props.attributes?.language || 'typescript') as unknown as keyof typeof languages] || 'ts',
		})
	})
</script>
