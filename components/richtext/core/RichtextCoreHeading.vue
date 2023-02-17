<template>
	<WrapBalancer as="div" class="RichtextCoreHeading !block" :class="classes">
		<h1 v-if="props.attributes?.level === 1" v-html="props.attributes?.content" :id="id" />
		<h2 v-else-if="props.attributes?.level === 2" v-html="props.attributes?.content" :id="id" />
		<h3 v-else-if="props.attributes?.level === 3" v-html="props.attributes?.content" :id="id" />
		<h4 v-else-if="props.attributes?.level === 4" v-html="props.attributes?.content" :id="id" />
	</WrapBalancer>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreHeadingBlock } from '@/types'
	export type RichtextCoreColumnsProps = RichtextPropsBase<CoreHeadingBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreColumnsProps['attributes']
		innerBlocks?: RichtextCoreColumnsProps['innerBlocks']
	}>()

	const classes = computed(() => {
		const classList = ['']

		if (props.attributes?.textAlign) {
			switch (props.attributes?.textAlign) {
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

		return classList
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
