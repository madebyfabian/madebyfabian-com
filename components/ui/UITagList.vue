<template>
	<ul v-if="props.tags?.length" class="UITagList gap-x-2.5 gap-y-1.5 flex flex-wrap">
		<li v-for="tag of props.tags" :key="tag.node.id" class="text-gray-500 underline"># {{ tag.node.name }}</li>
	</ul>
</template>

<script setup lang="ts">
	const props = defineProps<{
		tags: { node: { id: string; name?: string } }[] | undefined
	}>()
</script>
