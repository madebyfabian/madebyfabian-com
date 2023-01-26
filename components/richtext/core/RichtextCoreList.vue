<template>
	<ol class="RichtextCoreList" v-if="props.attributes?.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ol>
	<ul class="RichtextCoreList" v-else-if="!props.attributes?.ordered" :id="id">
		<RichtextResolver v-for="item of props.innerBlocks" :key="item.id" :item="item" />
	</ul>
</template>

<script setup lang="ts">
	import type { CoreListBlock } from '@/types/gen/graphql/graphql'
	import type { RichtextCoreListItemProps } from '@/components/richtext/core/RichtextCoreListItem.vue'

	const props = defineProps<{
		attributes: CoreListBlock['attributes']
		innerBlocks: RichtextCoreListItemProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
