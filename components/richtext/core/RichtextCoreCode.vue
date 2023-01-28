<template>
	<pre class="RichtextCoreCode" v-html="props.attributes?.content" :id="id" />
</template>

<script setup lang="ts">
	import type { CoreCodeBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	const props = defineProps<{
		attributes: CoreCodeBlock['attributes']
		innerBlocks?: InnerBlocksExtended
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
