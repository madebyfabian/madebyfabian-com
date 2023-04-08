<template>
	<div class="RichtextCoreParagraph" :class="classes">
		<p v-html="props.attributes?.content" :id="id" />
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreParagraphBlock } from '@/types'
	export type RichtextCoreParagraphProps = RichtextPropsBase<CoreParagraphBlock>

	const props = defineProps<{
		attributes: RichtextCoreParagraphProps['attributes']
		innerBlocks?: RichtextCoreParagraphProps['innerBlocks']
	}>()

	const classes = computed(() => {
		const classList = ['']

		if (props.attributes?.align) {
			switch (props.attributes?.align) {
				case 'left':
					classList.push('text-left')
					break
				case 'center':
					classList.push('text-center', 'mx-auto')
					break
				case 'right':
					classList.push('text-right', 'ml-auto')
					break
			}
		}

		if (props.attributes?.fontSize) {
			switch (props.attributes?.fontSize) {
				case 'large':
					classList.push('RichtextCoreParagraph-large')
					break
				case 'medium':
				default:
					break
			}
		}

		return classList
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
