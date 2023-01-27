<template>
	<details v-if="props.attributes?.content" class="RichtextCustomFaqItem appearance-none group/details" :id="id">
		<summary class="font-bold cursor-pointer p-6 text-lg flex items-center justify-between">
			<span>{{ props.attributes?.title }}</span>
			<span class="group-open/details:rotate-180 select-none">⬇️</span>
		</summary>
		<div class="-mt-2 px-6 pb-6">
			<RichtextCoreParagraph :attributes="{ content: props.attributes?.content, dropCap: false }" />
		</div>
	</details>
</template>

<script setup lang="ts">
	import type { LazyblockFaqItemBlock } from '@/types/gen/graphql/graphql'

	const props = defineProps<{
		attributes: LazyblockFaqItemBlock['attributes']
		innerBlocks: LazyblockFaqItemBlock['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>

<style lang="postcss" scoped>
	details > summary {
		list-style: none;
	}

	details summary::-webkit-details-marker {
		display: none;
	}
</style>
