<template>
	<LayoutPost :slug="slug" />
</template>

<script setup lang="ts">
	const route = useRoute()

	const slug = computed(() => route.params.slug as string)
</script>
