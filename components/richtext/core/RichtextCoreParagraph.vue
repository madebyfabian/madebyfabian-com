<template>
	<WrapBalancer :ratio="balancerRatio" as="div" class="RichtextCoreParagraph !block" :class="classes">
		<p v-html="props.attributes?.content" :id="id" />
	</WrapBalancer>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreParagraphBlock } from '@/types'
	export type RichtextCoreParagraphProps = RichtextPropsBase<CoreParagraphBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreParagraphProps['attributes']
		innerBlocks?: RichtextCoreParagraphProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreParagraphProps['mediaItemsStorageKey']
	}>()

	const balancerRatio = computed(() => {
		// For centered or large text, we want to have a high ratio to optimize.
		if (props.attributes?.align === 'center' || props.attributes?.fontSize === 'large') {
			return 1
		}

		// For regular text, we want to have a low ratio to optimize.
		return 0.5
	})

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
