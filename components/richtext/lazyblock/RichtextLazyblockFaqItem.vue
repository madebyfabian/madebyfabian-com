<template>
	<div class="RichtextLazyblockFaqItem">
		<details v-if="props.attributes?.content" class="appearance-none group/details" :id="id">
			<summary class="font-bold cursor-pointer p-6 PLike flex items-center justify-between">
				<span>{{ props.attributes?.title }}</span>
				<span class="group-open/details:rotate-180 select-none">⬇️</span>
			</summary>
			<div class="-mt-2 px-6 pb-6">
				<RichtextCoreParagraph :attributes="{ content: props.attributes?.content, dropCap: false }" />
			</div>
		</details>
	</div>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, LazyblockFaqItemBlock } from '@/types'
	export type RichtextLazyblockFaqItemProps = RichtextPropsBase<LazyblockFaqItemBlock>

	const props = defineProps<{
		attributes: RichtextLazyblockFaqItemProps['attributes']
		innerBlocks?: RichtextLazyblockFaqItemProps['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
