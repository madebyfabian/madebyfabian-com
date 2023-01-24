<template>
	<h1 class="RichtextCoreHeading" v-if="props.block.level === 1" v-html="props.block.content" :id="id" />
	<h2 class="RichtextCoreHeading" v-else-if="props.block.level === 2" v-html="props.block.content" :id="id" />
	<h3 class="RichtextCoreHeading" v-else-if="props.block.level === 3" v-html="props.block.content" :id="id" />
	<h4 class="RichtextCoreHeading" v-else-if="props.block.level === 4" v-html="props.block.content" :id="id" />
</template>

<script setup lang="ts">
	const props = defineProps<{
		block: {
			content: string
			level: number
			anchor?: string
		}
		innerBlocks: any[]
	}>()

	const id = computed(() => props.block.anchor || undefined)
</script>
