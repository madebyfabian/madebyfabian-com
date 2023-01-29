<template>
	<hr :id="id" class="RichtextCoreSeperator my-12 first:mt-0 last:mb-0 border-1" />
</template>

<script setup lang="ts">
	import type { CoreSeparatorBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreSeparatorBlock['attributes']
		innerBlocks: InnerBlocksExtended
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
