<template>
	<WrapBalancer :ratio="balancerRatio" as="div" class="RichtextCoreParagraph !block" :class="classes">
		<p v-html="props.attributes?.content" :id="id" />
	</WrapBalancer>
</template>

<script setup lang="ts">
	import Balancer from 'vue-wrap-balancer'
	import type { CoreParagraphBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreParagraphBlock['attributes']
		innerBlocks?: InnerBlocksExtended
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
