<template>
	<Balancer as="div" class="RichtextCoreParagraph !block" :class="alignClass">
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

	const alignClass = computed(() => {
		switch (props.attributes?.align) {
			case 'left':
				return 'text-left'
			case 'center':
				return 'text-center mx-auto'
			case 'right':
				return 'text-right ml-auto'
			default:
				return ''
		}
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
