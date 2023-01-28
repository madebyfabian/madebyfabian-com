<template>
	<LayoutPost :uri="uri" />
</template>

<script setup lang="ts">
	const route = useRoute('blog-slug')
	const uri = computed(() => route.fullPath)
</script>
