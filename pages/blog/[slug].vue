<template>
	<LayoutPost :slug="slug" />
</template>

<script setup lang="ts">
	const route = useRoute('blog-slug')
	const slug = computed(() => route.params.slug)
</script>
