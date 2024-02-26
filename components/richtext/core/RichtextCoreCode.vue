<template>
	<div class="RichtextCoreCode" :id="id">
		<div v-html="html" />
	</div>
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

	const language = computed(() => {
		const options = {
			'markup': 'html',
			'typescript': 'ts',
			'bash': 'bash',
			'php': 'php',
			'graphql': 'graphql',
		}

		return options[(props.attributes?.language || 'typescript') as unknown as keyof typeof options] || 'ts'
	})

	const html = computed(() => {
		return shiki.codeToHtml(transformedContent.value, {
			...shiki.$defaults,
			lang: language.value,
		})
	})
</script>
