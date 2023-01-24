<template>
	<h1
		class="RichtextCoreHeading"
		:class="alignClass"
		v-if="props.block.level === 1"
		v-html="props.block.content"
		:id="id" />
	<h2
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.block.level === 2"
		v-html="props.block.content"
		:id="id" />
	<h3
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.block.level === 3"
		v-html="props.block.content"
		:id="id" />
	<h4
		class="RichtextCoreHeading"
		:class="alignClass"
		v-else-if="props.block.level === 4"
		v-html="props.block.content"
		:id="id" />
</template>

<script setup lang="ts">
	const props = defineProps<{
		block: {
			content: string
			level: number
			anchor?: string
			textAlign?: string
		}
		innerBlocks: any[]
	}>()

	const alignClass = computed(() => {
		switch (props.block.textAlign) {
			case 'left':
				return 'text-left'
			case 'center':
				return 'text-center'
			case 'right':
				return 'text-right'
			default:
				return ''
		}
	})

	const id = computed(() => props.block.anchor || undefined)
</script>
