<template>
	<section
		class="RichtextCustomTeaser p-6 my-6 first:mt-0 last:mb-0 rounded-box flex flex-col md:flex-row gap-4 bg-frost shadow-border"
		:id="id">
		<div v-if="props.attributes?.icon" class="text-2xl">
			<span v-if="props.attributes?.icon === 'info'">&#8505;&#65039;</span>
			<span v-if="props.attributes?.icon === 'warning'">&#9888;&#65039;</span>
			<span v-if="props.attributes?.icon === 'finger'">👉</span>
		</div>
		<div class="flex-1">
			<h3 v-if="props.attributes?.title">{{ props.attributes?.title }}</h3>
			<template v-if="props.innerBlocks?.length">
				<RichtextResolver
					v-for="(item, key) of props.innerBlocks"
					:key="key"
					v-bind="{ item, mediaItemsStorageKey: props.mediaItemsStorageKey }" />
			</template>
		</div>
	</section>
</template>

<script lang="ts">
	import type { RichtextPropsBase, LazyblockRichtextTeaserBlock } from '@/types'
	export type RichtextLazyblockTeaserProps = RichtextPropsBase<LazyblockRichtextTeaserBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextLazyblockTeaserProps['attributes']
		innerBlocks?: RichtextLazyblockTeaserProps['innerBlocks']
		mediaItemsStorageKey: RichtextLazyblockTeaserProps['mediaItemsStorageKey']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
