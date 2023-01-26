<template>
	<section class="RichtextCustomTeaser p-6 my-6 rounded-xl flex flex-col md:flex-row gap-4 border" :id="id">
		<div v-if="props.attributes?.icon" class="text-xl mt-0.5">
			<span v-if="props.attributes?.icon === 'info'">&#8505;&#65039;</span>
			<span v-if="props.attributes?.icon === 'warning'">&#9888;&#65039;</span>
		</div>
		<div class="flex-1">
			<h3 v-if="props.attributes?.title">{{ props.attributes?.title }}</h3>
			<template v-if="props.innerBlocks?.length">
				<RichtextResolver v-for="(item, key) of props.innerBlocks" :key="key" :item="item" />
			</template>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { LazyblockRichtextTeaserBlock } from '@/types/gen/graphql/graphql'

	const props = defineProps<{
		attributes: LazyblockRichtextTeaserBlock['attributes']
		innerBlocks?: LazyblockRichtextTeaserBlock['innerBlocks']
	}>()

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
