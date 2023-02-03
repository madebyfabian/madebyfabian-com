<template>
	<div class="RichtextCoreSpacer -mt-6 first:-mt-0" :id="id" />
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreSpacerBlock } from '@/types'
	export type RichtextCoreSpacerProps = RichtextPropsBase<CoreSpacerBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextCoreSpacerProps['attributes']
		innerBlocks?: RichtextCoreSpacerProps['innerBlocks']
		mediaItemsStorageKey: RichtextCoreSpacerProps['mediaItemsStorageKey']
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
