<template>
	<h1
		class="RichtextCoreHeading"
		:class="alignClass"
		v-if="props.attributes?.level === 1"
		v-html="props.attributes?.content"
		:id="id" />
	<h2
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.attributes?.level === 2"
		v-html="props.attributes?.content"
		:id="id" />
	<h3
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.attributes?.level === 3"
		v-html="props.attributes?.content"
		:id="id" />
	<h4
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.attributes?.level === 4"
		v-html="props.attributes?.content"
		:id="id" />
</template>

<script setup lang="ts">
	import type { CoreHeadingBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreHeadingBlock['attributes']
		innerBlocks: InnerBlocksExtended
	}>()

	const alignClass = computed(() => {
		switch (props.attributes?.textAlign) {
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
