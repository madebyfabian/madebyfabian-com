<template>
	<div class="RichtextCoreHeading" :class="classes">
		<h1 v-if="props.attributes?.level === 1" v-html="props.attributes?.content" :id="id" />
		<h2 v-else-if="props.attributes?.level === 2" v-html="props.attributes?.content" :id="id" />
		<h3 v-else-if="props.attributes?.level === 3" v-html="props.attributes?.content" :id="id" />
		<h4 v-else-if="props.attributes?.level === 4" v-html="props.attributes?.content" :id="id" />
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreHeadingBlock } from '@/types'
	export type RichtextCoreHeadingProps = RichtextPropsBase<CoreHeadingBlock>

	const props = defineProps<{
		attributes: RichtextCoreHeadingProps['attributes']
		innerBlocks?: RichtextCoreHeadingProps['innerBlocks']
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
