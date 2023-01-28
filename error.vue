<template>
	<Page>
		<LayoutError :error="props.error" />
	</Page>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error?: Record<string, any>
	}>()

	useSeoMeta({
		title: 'Error',
	})
</script>
