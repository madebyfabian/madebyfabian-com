<template>
	<p class="RichtextCoreParagraph" v-html="props.block.content" :id="id" />
</template>

<script setup lang="ts">
	const props = defineProps<{
		block: {
			content: string
			anchor?: string
		}
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
