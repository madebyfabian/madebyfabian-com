<template>
	<div class="RichtextCoreCode" :id="id">
		<Shiki :lang="language" :code="transformedCode" />
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

	const transformedCode = computed(() => {
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
		} as const

		return options[(props.attributes?.language || 'typescript') as unknown as keyof typeof options] || 'ts'
	})
</script>
