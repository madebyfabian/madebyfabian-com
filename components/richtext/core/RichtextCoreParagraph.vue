<template>
	<p class="RichtextCoreParagraph" :class="alignClass" v-html="props.attributes?.content" :id="id" />
</template>

<script setup lang="ts">
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
				return 'text-center'
			case 'right':
				return 'text-right'
			default:
				return ''
		}
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
