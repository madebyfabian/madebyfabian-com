<template>
	<Balancer as="div" class="RichtextCoreHeading !block" :class="alignClass">
		<h1 v-if="props.attributes?.level === 1" v-html="props.attributes?.content" :id="id" />
		<h2 v-else-if="props.attributes?.level === 2" v-html="props.attributes?.content" :id="id" />
		<h3 v-else-if="props.attributes?.level === 3" v-html="props.attributes?.content" :id="id" />
		<h4 v-else-if="props.attributes?.level === 4" v-html="props.attributes?.content" :id="id" />
	</Balancer>
</template>

<script setup lang="ts">
	import Balancer from 'vue-wrap-balancer'
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
				return 'text-center mx-auto'
			case 'right':
				return 'text-right ml-auto'
			default:
				return ''
		}
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
