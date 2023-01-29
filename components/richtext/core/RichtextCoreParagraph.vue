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
		const classes = ['']

		if (props.attributes?.align) {
			switch (props.attributes?.align) {
				case 'left':
					classes.push('text-left')
				case 'center':
					classes.push('text-center mx-auto')
				case 'right':
					classes.push('text-right ml-auto')
			}
		}

		if (props.attributes?.fontSize) {
			switch (props.attributes?.fontSize) {
				case 'large':
					classes.push('RichtextCoreParagraph-large')
					break
				case 'medium':
				default:
					break
			}
		}

		return classes
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
