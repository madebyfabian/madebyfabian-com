<template>
	<LayoutPage hasH1 :uri="uri" />
</template>

<script setup lang="ts">
	const route = useRoute()

	const uri = computed(() => {
		const base = Array.isArray(route.params.uri) ? route.params.uri.join('/') : route.params.uri
		return `/${base}/`
	})
</script>
