<template>
	<div class="RichtextCoreSpacer -mt-6 first:-mt-0" :id="id" />
</template>

<script setup lang="ts">
	import type { CoreSpacerBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreSpacerBlock['attributes']
		innerBlocks?: InnerBlocksExtended
	}>()

	const heightRem = computed(() => {
		try {
			const heightPx = props.attributes?.height
			if (!heightPx) throw new Error()
			const matcher = new RegExp(/\d+/i)
			const match = Number(heightPx.match(matcher)?.[0])
			if (!match) throw new Error()
			return `${match / 16}rem`
		} catch (error) {
			return '0rem'
		}
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>

<style lang="postcss" scoped>
	.RichtextCoreSpacer {
		height: v-bind(heightRem);
	}
</style>
