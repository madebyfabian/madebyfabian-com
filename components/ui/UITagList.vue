<template>
	<ul v-if="props.tags?.length" class="UITagList gap-x-2 gap-y-2 flex flex-wrap">
		<li
			v-for="tag of props.tags"
			:key="tag.node.id"
			class="text-gray-500 text-sm px-3 py-1 rounded-full shadow-border font-medium bg-frost-200">
			{{ tag.node.name }}
		</li>
	</ul>
</template>

<script setup lang="ts">
	const props = defineProps<{
		tags: { node: { id: string; name?: string } }[] | undefined
	}>()
</script>
