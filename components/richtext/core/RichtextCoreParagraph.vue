<template>
	<Balancer as="div" class="RichtextCoreParagraph !block" :class="classes">
		<p v-html="props.attributes?.content" :id="id" />
	</Balancer>
</template>

<script setup lang="ts">
	import Balancer from 'vue-wrap-balancer'
	import type { CoreParagraphBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreParagraphBlock['attributes']
		innerBlocks?: InnerBlocksExtended
	}>()

	const classes = computed(() => {
		const classList = ['']

		if (props.attributes?.align) {
			switch (props.attributes?.align) {
				case 'left':
					classList.push('text-left')
					break
				case 'center':
					classList.push('text-center mx-auto')
					break
				case 'right':
					classList.push('text-right ml-auto')
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
