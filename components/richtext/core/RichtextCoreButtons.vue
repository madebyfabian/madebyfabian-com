<template>
	<div class="RichtextCoreButtons UIButtonGroup flex-wrap my-6 first:mt-0 last:mb-0" :style="styles" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</div>
</template>

<script lang="ts">
	import type { RichtextPropsBase, CoreButtonsBlock } from '@/types'
	export type RichtextCoreButtonsProps = RichtextPropsBase<CoreButtonsBlock>

	//
</script>

<script setup lang="ts">
	import type { StyleValue } from 'vue'

	const props = defineProps<{
		attributes: RichtextCoreButtonsProps['attributes']
		innerBlocks?: RichtextCoreButtonsProps['innerBlocks']
	}>()

	const styles = computed(() => {
		const styles: StyleValue = {}

		if (props.attributes?.layout?.type === 'flex') {
			styles.display = 'flex'

			if (props.attributes?.layout?.justifyContent)
				styles.justifyContent = props.attributes?.layout?.justifyContent

			if (props.attributes?.layout?.alignItems) styles.alignItems = props.attributes?.layout?.alignItems
		}

		return styles
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
