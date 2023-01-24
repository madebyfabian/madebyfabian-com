<template>
	<p class="RichtextCoreParagraph" :class="alignClass" v-html="props.block.content" :id="id" />
</template>

<script setup lang="ts">
	const props = defineProps<{
		block: {
			content: string
			anchor?: string
			align?: string
		}
	}>()

	const alignClass = computed(() => {
		switch (props.block.align) {
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
